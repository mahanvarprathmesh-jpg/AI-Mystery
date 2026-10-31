import { env } from '../config/env.js';

const schema = {
  type: 'OBJECT', properties: {
    title: { type: 'STRING' }, description: { type: 'STRING' },
    incident: { type: 'OBJECT', properties: { type: { type: 'STRING' }, date: { type: 'STRING' }, location: { type: 'STRING' } }, required: ['type', 'date', 'location'] },
    suspects: { type: 'ARRAY', items: { type: 'OBJECT', properties: {
      id: { type: 'STRING' }, name: { type: 'STRING' }, age: { type: 'INTEGER' }, occupation: { type: 'STRING' }, description: { type: 'STRING' },
      relationship: { type: 'STRING' }, motive: { type: 'STRING' }, alibi: { type: 'STRING' }, suspiciousDetails: { type: 'STRING' },
    }, required: ['id', 'name', 'age', 'occupation', 'description', 'relationship', 'motive', 'alibi', 'suspiciousDetails'] } },
    evidence: { type: 'ARRAY', items: { type: 'OBJECT', properties: {
      id: { type: 'STRING' }, type: { type: 'STRING', enum: ['message', 'image', 'cctv', 'witness', 'document'] }, title: { type: 'STRING' }, description: { type: 'STRING' },
      content: { type: 'STRING' }, timestamp: { type: 'STRING' }, relatedSuspects: { type: 'ARRAY', items: { type: 'STRING' } },
    }, required: ['id', 'type', 'title', 'description', 'content', 'timestamp', 'relatedSuspects'] } },
    timeline: { type: 'ARRAY', items: { type: 'OBJECT', properties: { time: { type: 'STRING' }, event: { type: 'STRING' }, relatedSuspects: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ['time', 'event', 'relatedSuspects'] } },
    solution: { type: 'OBJECT', properties: { culpritId: { type: 'STRING' }, motive: { type: 'STRING' }, explanation: { type: 'STRING' }, evidenceReferences: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ['culpritId', 'motive', 'explanation', 'evidenceReferences'] },
  }, required: ['title', 'description', 'incident', 'suspects', 'evidence', 'timeline', 'solution'],
};

function validateCase(data) {
  if (!data?.incident || !data?.solution || !Array.isArray(data.suspects) || data.suspects.length < 3 || data.suspects.length > 5) throw new Error('Invalid generated case.');
  if (!Array.isArray(data.evidence) || data.evidence.length < 5 || data.evidence.length > 10 || !Array.isArray(data.timeline)) throw new Error('Invalid generated evidence.');
  const suspectIds = data.suspects.map((item) => item.id);
  const evidenceIds = data.evidence.map((item) => item.id);
  if (new Set(suspectIds).size !== suspectIds.length || !suspectIds.includes(data.solution.culpritId)) throw new Error('Invalid culprit reference.');
  if (new Set(evidenceIds).size !== evidenceIds.length || !data.solution.evidenceReferences?.length || data.solution.evidenceReferences.some((id) => !evidenceIds.includes(id))) throw new Error('Invalid evidence reference.');
  for (const suspect of data.suspects) if (!suspect.name || !suspect.occupation || !suspect.description || !suspect.alibi || !suspect.motive) throw new Error('Incomplete suspect profile.');
  return data;
}

export async function generateMystery({ scenario, title, category, difficulty }) {
  if (!env.geminiApiKey) {
    const error = new Error('Case generation is not configured yet. Add GEMINI_API_KEY to the server environment.');
    error.status = 503;
    throw error;
  }
  const prompt = `Create a complete, fictional, playable detective mystery as JSON. Exactly one culprit. Create 3-5 suspects and 5-10 evidence items. Give every suspect a believable motive and alibi. Do not make the culprit obvious from their profile. Evidence must let a careful player identify the culprit with fair red herrings. Keep chronology internally consistent and use fictional timestamps, names and places. Use unique IDs (SUSPECT_01, EVIDENCE_01). Evidence types: message, image, cctv, witness, document. Image items are text descriptions, not generated image files. Solution evidenceReferences must identify evidence that supports the explanation.\n\nScenario: ${scenario}\nTitle: ${title || 'Choose an apt title'}\nCategory: ${category}\nDifficulty: ${difficulty}\n\nThis is fictional entertainment. Do not include real crime advice.`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90000);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.geminiModel)}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.geminiApiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', responseSchema: schema, temperature: 0.8, maxOutputTokens: 8192 } }), signal: controller.signal,
    });
    if (!response.ok) {
      const providerBody = await response.json().catch(() => ({}));
      const providerMessage = providerBody.error?.message || 'No provider details available.';
      console.error(`Gemini request failed (${response.status}): ${providerMessage}`);
      let message = 'The case generator is temporarily unavailable. Please try again.';
      if (response.status === 400) message = 'Gemini rejected the generation request. Check that GEMINI_MODEL supports structured JSON output.';
      if (response.status === 401 || response.status === 403) message = 'Gemini could not authorize this request. Check GEMINI_API_KEY in server/.env.';
      if (response.status === 404) message = `The Gemini model "${env.geminiModel}" is unavailable. Set GEMINI_MODEL to a model enabled for your API key.`;
      if (response.status === 429) message = 'Gemini is rate-limiting case generation. Please wait a minute and try again.';
      const error = new Error(message);
      error.status = response.status === 429 ? 429 : 502;
      throw error;
    }
    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('');
    if (!text) {
      const finishReason = payload.candidates?.[0]?.finishReason;
      console.error(`Gemini returned no case text (finish reason: ${finishReason || 'unknown'}).`);
      throw new Error(finishReason === 'MAX_TOKENS' ? 'The generated case exceeded the output limit.' : 'Gemini returned an empty case.');
    }
    return validateCase(JSON.parse(text));
  } catch (error) {
    if (error.status) throw error;
    const wrapped = new Error(error.name === 'AbortError' ? 'Case generation took too long. Please try again.' : 'The case could not be generated. Please try a different premise.');
    wrapped.status = 502;
    throw wrapped;
  } finally { clearTimeout(timeout); }
}
