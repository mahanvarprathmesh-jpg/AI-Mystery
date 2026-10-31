import { createHash, randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import Mystery from '../models/Mystery.js';
import { generateMystery } from '../services/geminiService.js';

const categories = ['Murder Mystery', 'Theft', 'Missing Person', 'Suspicious Death', 'Cybercrime', 'General Mystery'];
const difficulties = ['Easy', 'Medium', 'Hard'];
const hashToken = (token) => createHash('sha256').update(token).digest('hex');

function publicMystery(mystery) {
  const result = {
    id: mystery._id,
    title: mystery.title,
    category: mystery.category,
    difficulty: mystery.difficulty,
    description: mystery.description,
    incident: mystery.incident,
    suspects: mystery.suspects,
    evidence: mystery.evidence,
    timeline: mystery.timeline,
    createdAt: mystery.createdAt,
  };
  if (mystery.completedAt && mystery.solution?.culpritId) {
    const culprit = mystery.suspects.find((person) => person.id === mystery.solution.culpritId);
    const selected = mystery.suspects.find((person) => person.id === mystery.accusedSuspectId);
    result.result = {
      correct: mystery.accusedSuspectId === mystery.solution.culpritId,
      selectedSuspect: selected ? { id: selected.id, name: selected.name } : null,
      culprit,
      motive: mystery.solution.motive,
      explanation: mystery.solution.explanation,
      evidence: mystery.evidence.filter((item) => mystery.solution.evidenceReferences.includes(item.id)),
      reason: mystery.accusationReason || '',
      completedAt: mystery.completedAt,
    };
  }
  return result;
}

async function findOwnedMystery(id, token, { includeSolution = false } = {}) {
  if (!mongoose.isValidObjectId(id)) return null;
  let query = Mystery.findById(id).select('+accessTokenHash');
  if (includeSolution) query = query.select('+solution.culpritId +solution.motive +solution.explanation +solution.evidenceReferences +accusationReason');
  const mystery = await query;
  if (!mystery || !token || token.length > 100 || mystery.accessTokenHash !== hashToken(token)) return null;
  return mystery;
}

export async function createMystery(request, response, next) {
  try {
    if (mongoose.connection.readyState !== 1) return response.status(503).json({ success: false, message: 'The case archive is unavailable. Please try again shortly.' });
    const { scenario, title = '', category = 'General Mystery', difficulty = 'Medium' } = request.body || {};
    const cleanScenario = typeof scenario === 'string' ? scenario.replace(/<[^>]*>/g, '').trim() : '';
    const cleanTitle = typeof title === 'string' ? title.replace(/<[^>]*>/g, '').trim() : '';
    if (!cleanScenario) return response.status(400).json({ success: false, message: 'Add a scenario before generating your mystery.' });
    if (cleanScenario.length > 2000 || cleanTitle.length > 100) return response.status(400).json({ success: false, message: 'The scenario or title is too long.' });
    if (!categories.includes(category) || !difficulties.includes(difficulty)) return response.status(400).json({ success: false, message: 'Choose a valid case type and difficulty.' });

    const generated = await generateMystery({ scenario: cleanScenario, title: cleanTitle, category, difficulty });
    const accessToken = randomBytes(32).toString('base64url');
    const mystery = await Mystery.create({ ...generated, scenario: cleanScenario, category, difficulty, accessTokenHash: hashToken(accessToken) });
    response.status(201).json({ success: true, mysteryId: mystery.id, accessToken, message: 'Mystery generated successfully.', mystery: publicMystery(mystery) });
  } catch (error) { next(error); }
}

export async function getMystery(request, response, next) {
  try {
    const token = request.get('x-case-token');
    let mystery = await findOwnedMystery(request.params.id, token);
    if (!mystery) return response.status(404).json({ success: false, message: 'This case file could not be found in this browser session.' });
    if (mystery.completedAt) {
      mystery = await Mystery.findById(mystery._id).select('+solution.culpritId +solution.motive +solution.explanation +solution.evidenceReferences');
    }
    return response.json({ success: true, mystery: publicMystery(mystery) });
  } catch (error) { return next(error); }
}

export async function submitAccusation(request, response, next) {
  try {
    const token = request.get('x-case-token');
    const mystery = await findOwnedMystery(request.params.id, token, { includeSolution: true });
    if (!mystery) return response.status(404).json({ success: false, message: 'This case file could not be found in this browser session.' });
    if (mystery.completedAt) return response.status(409).json({ success: false, message: 'An accusation has already been submitted for this case.' });

    const selectedSuspectId = request.body?.selectedSuspectId;
    const reason = typeof request.body?.reason === 'string' ? request.body.reason.trim().slice(0, 500) : '';
    const selectedSuspect = mystery.suspects.find((person) => person.id === selectedSuspectId);
    if (!selectedSuspect) return response.status(400).json({ success: false, message: 'Select one of the listed suspects before submitting.' });

    const completedAt = new Date();
    const updated = await Mystery.findOneAndUpdate(
      { _id: mystery._id, accessTokenHash: hashToken(token), completedAt: null },
      { $set: { accusedSuspectId: selectedSuspectId, accusationReason: reason, completedAt } },
      { new: true },
    ).select('+accessTokenHash +solution.culpritId +solution.motive +solution.explanation +solution.evidenceReferences +accusationReason');
    if (!updated) return response.status(409).json({ success: false, message: 'An accusation has already been submitted for this case.' });

    return response.json({ success: true, result: publicMystery(updated).result });
  } catch (error) { return next(error); }
}
