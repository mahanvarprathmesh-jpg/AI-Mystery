# AI MYSTERY ROOM
## Master Product & Technical Specification
### Single Source of Truth for Spec-Driven Development

**Project Name:** AI Mystery Room  
**Development Methodology:** Spec-Driven Development (SDD)  
**Document Version:** 1.0  
**Status:** Initial Development Specification  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Integration:** Google Gemini API  

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery investigation web application where users become detectives and solve fictional criminal cases generated dynamically using Artificial Intelligence.

The user starts by providing a short scenario, story idea, or mystery theme. Based on the user's input, the AI generates a complete fictional investigation containing:

- A mystery storyline.
- A crime or suspicious incident.
- Multiple suspects.
- One actual culprit.
- Motives and possible reasons.
- Evidence and investigation materials.
- Misleading clues (red herrings).
- A final solution.

The application presents the investigation through an interactive detective interface.

Users investigate the case by examining AI-generated evidence such as:

1. WhatsApp-style conversations.
2. Photographs and suspicious images.
3. CCTV recordings or fictional camera footage.
4. Witness statements.
5. Suspect profiles.
6. Timeline of events.
7. Other investigation documents.

After reviewing the available evidence, the user must identify the culprit from the list of suspects.

The AI evaluates the user's final selection and reveals whether the answer is correct, explaining the actual culprit, motive, and important evidence that proves the solution.

## 1.2 Main Objective

The main objective is to create an engaging AI-powered mystery-solving experience where every investigation is dynamically generated based on user input.

The application should make users think critically, analyze evidence, identify contradictions, and solve mysteries like real detectives.

## 1.3 Core Concept

User Story Input → AI Mystery Generation → Investigation Room → Evidence Analysis → Suspect Selection → AI Evaluation → Final Solution.

---

# 2. PROJECT GOALS

The system must:

1. Allow users to generate custom mystery cases.
2. Generate unique fictional investigations using Gemini AI.
3. Create believable suspects and investigation scenarios.
4. Generate different types of evidence.
5. Provide an interactive investigation room.
6. Allow users to examine evidence before making decisions.
7. Allow users to select one culprit.
8. Evaluate the selected culprit.
9. Reveal the correct solution with logical explanations.
10. Provide an engaging, responsive, and visually attractive interface.

---

# 3. TARGET USERS

The application is designed for:

- Mystery and detective story enthusiasts.
- Students and casual gamers.
- Users who enjoy logical reasoning and puzzle-solving.
- People interested in crime investigation games.
- Users who want AI-generated interactive entertainment.

---

# 4. USER ROLES

## 4.1 Guest User

A guest user should be able to:

- Access the landing page.
- Enter a mystery scenario.
- Generate a mystery case.
- Investigate the available evidence.
- Submit a culprit selection.
- View the final solution.

For MVP, user registration and login are not mandatory.

## 4.2 Registered User (Future Enhancement)

Future versions may support:

- User accounts.
- Investigation history.
- Saved mystery cases.
- User statistics.
- Achievements and leaderboards.

These features are not part of the initial MVP.

---

# 5. FUNCTIONAL REQUIREMENTS

## FR-01: Landing Page

The application must provide an attractive landing page.

Required elements:

- Project logo and name.
- Navigation bar.
- Hero section.
- Short project description.
- Start Investigation button.
- How It Works section.
- Features section.
- Footer.

Primary CTA: "Start Investigation"

Clicking the button should navigate to the mystery creation interface.

## FR-02: Mystery Scenario Input

The user must be able to provide a short story or scenario.

Input fields:

- Mystery title (optional).
- Scenario description (required).
- Mystery category (optional).
- Difficulty level (optional).

Supported categories:

- Murder Mystery.
- Theft.
- Missing Person.
- Suspicious Death.
- Cybercrime.
- General Mystery.

Difficulty levels:

- Easy.
- Medium.
- Hard.

Default difficulty: Medium.

Input validation:

- Scenario must not be empty.
- Scenario must have a configurable maximum length (default: 2,000 characters).
- Invalid or empty submissions must display a helpful error.
- Prevent repeated submissions while generation is running.

## FR-03: AI Mystery Generation

When the user submits a scenario, the backend must send the input to Gemini AI.

Gemini must generate a complete fictional investigation.

The generated case must contain:

1. Case ID.
2. Case title.
3. Case description.
4. Incident details.
5. Incident date and location (fictional).
6. Suspect list.
7. Suspect profiles.
8. Suspect motives.
9. Actual culprit.
10. Evidence collection.
11. Investigation timeline.
12. Red herrings.
13. Correct solution.
14. Explanation of the solution.

IMPORTANT:

The actual culprit and complete solution must be generated and stored on the backend. They must NEVER be included in the initial case response sent to the frontend.

The user must not be able to discover the culprit by inspecting frontend API responses or browser network requests.

The AI should create a logically consistent investigation.

Every mystery must have exactly one correct culprit.

## FR-04: Suspect Generation

Each mystery must contain 3–5 suspects.

Each suspect must have:

- Unique suspect ID.
- Full name.
- Age (fictional).
- Occupation.
- Profile description.
- Relationship with the victim or incident.
- Possible motive.
- Alibi.
- Suspicious details.

Suspects should have believable backgrounds.

All suspects should have some reason to be investigated, but only one must be the actual culprit.

The culprit must not be made obvious through the suspect's description alone.

## FR-05: Evidence Generation

The application must generate a collection of different investigation materials.

Every mystery should contain at least 5 evidence items, with a configurable target of 5–10 items.

Supported evidence types:

### A. WhatsApp-Style Messages

Generate fictional chat conversations between suspects, witnesses, and other relevant characters.

Required fields:

- Sender.
- Receiver or conversation participants.
- Message text.
- Timestamp.
- Conversation title.

The interface should display these messages in a familiar chat-style layout.

### B. Photographic Evidence

Generate fictional investigation photographs using an image-generation service.

Examples:

- Suspicious objects.
- Crime-scene environment.
- Damaged property.
- Objects found at the incident location.
- Relevant documents or visual clues.

The AI must provide a visual description and explain the relevance of the photograph.

Image generation must use a dedicated image-generation provider. Gemini text generation alone must not be assumed to produce actual image files.

### C. CCTV Evidence

CCTV evidence should represent fictional security-camera footage.

For the MVP, CCTV may be represented using:

- AI-generated still images.
- Multiple frames.
- Timestamped footage descriptions.
- A CCTV-style timeline.

Actual generated video is a future enhancement.

### D. Witness Statements

Each statement must contain:

- Witness name.
- Statement.
- Time of statement.
- Relevant information.
- Possible contradictions.

### E. Other Documents

Examples:

- Investigation reports.
- Call records.
- Letters.
- Notes.
- Receipts.
- Timeline documents.

## FR-06: Evidence Investigation Interface

The user must be able to explore the generated evidence.

The investigation room should contain:

- Case overview.
- Suspect list.
- Evidence board.
- Evidence categories.
- Investigation timeline.
- Evidence detail viewer.
- Final accusation button.

Evidence should be organized into separate categories:

- Messages.
- Images.
- CCTV.
- Witness Statements.
- Documents.

When the user clicks an evidence item, its complete details should appear in a dedicated viewer or modal.

The user should be able to navigate between evidence items without losing investigation progress.

## FR-07: Suspect Profile Viewer

Users must be able to click any suspect to view their complete profile.

The profile should display:

- Suspect photograph or avatar.
- Name.
- Age.
- Occupation.
- Relationship with the incident.
- Motive.
- Alibi.
- Relevant evidence references.

The actual culprit must not receive a special visual indicator before the solution is revealed.

## FR-08: Final Accusation

After investigating the case, the user must identify the culprit.

Requirements:

1. Display all suspects.
2. Allow selection of exactly one suspect.
3. Provide a Submit Accusation button.
4. Ask for confirmation before final submission.
5. Prevent multiple final submissions.
6. Validate the selected suspect on the backend.

Optional: Allow the user to provide a short explanation of why they selected that suspect.

## FR-09: AI Solution Evaluation

When the user submits an accusation, the backend must compare the selected suspect ID with the stored actual culprit ID.

The evaluation must determine:

- Whether the answer is correct.
- The actual culprit.
- The motive.
- The important evidence.
- The logical explanation.
- The contradictions that expose the culprit.

The result should provide an engaging detective-style explanation.

Correctness must be determined using the stored answer, not by asking Gemini to independently guess whether the user's selection is correct.

Gemini may be used to generate a natural-language explanation, but the backend must control the correctness result.

## FR-10: Final Results Page

The result page must show:

- Correct or incorrect result.
- Selected suspect.
- Actual culprit.
- Culprit profile.
- Motive.
- Important evidence.
- Complete mystery explanation.
- Final investigation summary.
- Play Again button.
- Create New Mystery button.

For a correct answer, display a detective success message.

For an incorrect answer, explain what evidence the user missed.

---

# 6. NON-FUNCTIONAL REQUIREMENTS

## NFR-01: Performance

- The interface should remain responsive.
- Show loading indicators during AI generation.
- Avoid unnecessary database queries.
- Use pagination or lazy loading if evidence collections become large.
- Set appropriate API timeouts and generation limits.

## NFR-02: Security

- Store Gemini API keys only in backend environment variables.
- Never expose API keys in frontend code.
- Validate and sanitize user input.
- Apply rate limiting to AI generation endpoints.
- Prevent unauthorized access to answer keys.
- Use secure API error handling.
- Do not trust client-submitted culprit information.

## NFR-03: Reliability

- Handle Gemini API failures gracefully.
- Validate AI-generated JSON before storing it.
- Retry transient AI failures with a limited retry policy.
- Do not save incomplete investigations as playable cases.
- Provide a retry option when generation fails.

## NFR-04: Scalability

The system should support future additions such as:

- More evidence categories.
- User authentication.
- Multiplayer investigations.
- Leaderboards.
- AI-generated videos.
- Saved cases.

## NFR-05: Responsive Design

The application must work on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

---

# 7. TECHNICAL STACK

## 7.1 Frontend

Technology: React.js

Responsibilities:

- Landing page.
- Scenario input form.
- Loading and generation interface.
- Investigation dashboard.
- Evidence viewer.
- Suspect profiles.
- Accusation interface.
- Result page.

Recommended supporting libraries:

- React Router: Navigation.
- Axios: API communication.
- Tailwind CSS: Styling.
- Lucide React: Icons.

## 7.2 Backend

Technology: Node.js + Express.js

Responsibilities:

- API management.
- Gemini API integration.
- Mystery generation.
- Evidence generation orchestration.
- AI response validation.
- Database operations.
- Culprit verification.
- Security and validation.

## 7.3 Database

Technology: MongoDB

Recommended ODM: Mongoose.

MongoDB stores:

- Mystery cases.
- Suspects.
- Evidence.
- Investigation data.
- Actual culprit.
- Solution explanations.
- Case status.

## 7.4 Artificial Intelligence

Primary AI provider: Google Gemini API.

Gemini responsibilities:

1. Understand the user's scenario.
2. Generate a fictional investigation.
3. Create suspects and motives.
4. Generate evidence content.
5. Create logical contradictions.
6. Generate investigation timelines.
7. Generate the final explanation.

Use structured JSON output wherever supported.

The backend must validate the generated structure before saving it.

## 7.5 Image Generation

Photographic evidence requires an image-generation provider.

Use a separate image-generation integration or service compatible with the project.

The provider should be configurable so it can be replaced without redesigning the application.

For the initial implementation, if an image-generation provider is not configured, use clearly labeled fictional placeholder visuals or text-based evidence. Never pretend a placeholder is an AI-generated photograph.

---

# 8. SYSTEM ARCHITECTURE

The application must follow a modular MERN architecture.

### Frontend Layer

React application:
- Landing page.
- Scenario input.
- Investigation room.
- Evidence viewer.
- Suspect profiles.
- Results page.

### Backend Layer

Express API:
- Mystery Controller.
- Gemini AI Service.
- Evidence Service.
- Image Generation Service.
- Investigation Service.
- Accusation Service.
- Validation Middleware.

### Database Layer

MongoDB:
- Mystery collection.
- Investigation/session data.
- Evidence data.

### AI Layer

Gemini:
- Scenario understanding.
- Story generation.
- Suspect generation.
- Evidence generation.
- Solution generation.

### Overall Data Flow

User Input
→ React Frontend
→ Express Backend
→ Gemini API
→ JSON Validation
→ MongoDB
→ Investigation Response
→ React Investigation Room
→ User Accusation
→ Backend Verification
→ Result Page.

---

# 9. DATABASE DESIGN

## 9.1 Mystery Collection

Suggested schema:

{
  _id: ObjectId,
  title: String,
  category: String,
  difficulty: String,
  scenario: String,
  description: String,
  incident: {
    type: String,
    date: String,
    location: String
  },
  suspects: [Suspect],
  evidence: [Evidence],
  timeline: [TimelineEvent],
  solution: {
    culpritId: String,
    motive: String,
    explanation: String,
    evidenceReferences: [String]
  },
  status: String,
  createdAt: Date,
  updatedAt: Date
}

IMPORTANT:

The solution field must be protected from all public case retrieval endpoints.

Do not send the entire MongoDB document directly to the frontend.

## 9.2 Suspect Schema

{
  id: String,
  name: String,
  age: Number,
  occupation: String,
  description: String,
  relationship: String,
  motive: String,
  alibi: String,
  avatarUrl: String
}

## 9.3 Evidence Schema

{
  id: String,
  type: String,
  title: String,
  description: String,
  content: Mixed,
  mediaUrl: String,
  timestamp: String,
  relatedSuspects: [String],
  importance: String
}

The importance field is internal and must not be exposed if it reveals the correct answer.

## 9.4 Investigation Schema (Future-Ready)

{
  _id: ObjectId,
  mysteryId: ObjectId,
  userId: ObjectId,
  selectedEvidence: [String],
  selectedSuspectId: String,
  completed: Boolean,
  result: String,
  createdAt: Date
}

For MVP, persistent user accounts are not required. The backend may associate anonymous investigation sessions with a secure session identifier.

---

# 10. API SPECIFICATION

Base URL: /api

## POST /api/mysteries/generate

Purpose: Generate a new mystery.

Request:

{
  "scenario": "A businessman is found dead in his locked office.",
  "category": "Murder Mystery",
  "difficulty": "Medium"
}

Response:

{
  "success": true,
  "mysteryId": "CASE_ID",
  "message": "Mystery generated successfully",
  "mystery": {
    "title": "The Locked Office",
    "description": "A businessman is found dead...",
    "suspects": [],
    "evidence": [],
    "timeline": []
  }
}

The response must not include the actual culprit or solution.

## GET /api/mysteries/:id

Purpose: Retrieve the public mystery investigation.

Response:
- Case information.
- Suspect profiles.
- Evidence.
- Timeline.

Must exclude:
- Actual culprit.
- Secret motive details.
- Internal AI reasoning.
- Hidden answer key.

## GET /api/mysteries/:id/evidence/:evidenceId

Purpose: Retrieve a specific evidence item.

Must verify that the evidence belongs to the requested mystery.

## POST /api/mysteries/:id/accusation

Purpose: Submit the user's final accusation.

Request:

{
  "selectedSuspectId": "SUSPECT_02",
  "reason": "The messages contradict the suspect's alibi."
}

Response:

{
  "success": true,
  "result": {
    "correct": true,
    "selectedSuspect": "SUSPECT_02",
    "culprit": {},
    "motive": "Explanation...",
    "solution": "Complete explanation..."
  }
}

The culprit and solution are only returned after a valid final accusation.

## DELETE /api/mysteries/:id

Purpose: Delete an anonymous mystery session if required.

The endpoint must verify session ownership.

---

# 11. AI GENERATION LOGIC

The AI generation system is the most important part of this project.

The system must not simply create a random story with an arbitrary culprit.

It must create a logically connected investigation.

## 11.1 Mystery Generation Process

Step 1: Receive the user's scenario.

Step 2: Send the scenario, category, and difficulty to Gemini.

Step 3: Generate the complete fictional case.

Step 4: Generate 3–5 suspects.

Step 5: Secretly establish exactly one actual culprit.

Step 6: Create a consistent timeline.

Step 7: Generate evidence items.

Step 8: Ensure the evidence contains clues that help identify the culprit.

Step 9: Add believable red herrings.

Step 10: Validate that the final solution is supported by the evidence.

Step 11: Store the complete mystery in MongoDB.

Step 12: Return only the public investigation data.

## 11.2 AI Consistency Rules

Gemini must follow these rules:

- Exactly one culprit.
- Every suspect must have a consistent identity.
- All timestamps must make chronological sense.
- Suspect alibis must agree or conflict intentionally.
- Evidence must support the final explanation.
- Red herrings must not make the solution impossible.
- The culprit must be identifiable using available evidence.
- No critical clue may exist only in the hidden solution.
- No contradictions should appear accidentally.
- The final explanation must reference actual evidence IDs.

If the AI generates inconsistent output, the backend should request a controlled correction or reject and regenerate the case.

## 11.3 Recommended Gemini Prompt

"You are an expert mystery writer and detective game designer.

Create an original, fictional, logically consistent mystery investigation based on the scenario provided by the user.

Your task is to generate a complete playable mystery case.

Requirements:
1. Create 3–5 believable suspects.
2. Select exactly one actual culprit.
3. Give every suspect a believable background, motive, and alibi.
4. Create at least 5 evidence items.
5. Include WhatsApp-style conversations, witness statements, documents, and visual evidence descriptions where appropriate.
6. Create a chronological investigation timeline.
7. Include misleading clues that are believable but logically resolvable.
8. Ensure the actual culprit can be identified using the available evidence.
9. Ensure the final solution is supported by specific evidence IDs.
10. Maintain consistency across all characters, timestamps, events, and evidence.
11. Do not reveal the culprit in public descriptions.
12. Return valid JSON matching the defined schema.

User Scenario: {{SCENARIO}}
Category: {{CATEGORY}}
Difficulty: {{DIFFICULTY}}

Return the complete investigation as structured JSON."

The backend must keep the actual culprit and solution in protected fields.

---

# 12. USER INTERFACE DESIGN REQUIREMENTS

## 12.1 Overall Design Theme

The application should have a dark detective-investigation theme.

Visual direction:

- Dark charcoal background.
- Deep black and grey surfaces.
- Muted red accent for important investigation elements.
- Warm white text.
- Subtle shadows and borders.
- Professional typography.
- Cinematic atmosphere.

The interface should feel like a modern detective investigation workspace rather than a basic form-based website.

Avoid excessive animations and unnecessary visual clutter.

## 12.2 Landing Page

Sections:

1. Navigation.
2. Hero section.
3. Project introduction.
4. How It Works.
5. Features.
6. Call to Action.
7. Footer.

Hero headline suggestion:

"Every Mystery Has a Secret. Can You Find It?"

Subtitle:

"Create your own mystery, investigate the evidence, uncover hidden secrets, and identify the culprit. Your detective journey starts here."

CTA: "Start Investigating"

## 12.3 Mystery Creation Page

Display:
- Scenario input.
- Category selection.
- Difficulty selection.
- Generate Mystery button.

Use a clean, focused interface.

## 12.4 Investigation Room

This is the primary application screen.

Suggested layout:

LEFT SIDEBAR:
- Case overview.
- Suspects.
- Evidence categories.
- Investigation timeline.

MAIN AREA:
- Selected evidence.
- Evidence details.
- Image or media viewer.
- Investigation information.

TOP BAR:
- Case title.
- Case ID.
- Difficulty.
- Investigation status.

BOTTOM AREA:
- Identify the Culprit button.

The layout must adapt to smaller screens.

## 12.5 Results Page

Display the final accusation result using a visually engaging reveal animation.

Include:
- Investigation result.
- Actual culprit.
- Motive.
- Evidence breakdown.
- Final explanation.
- Replay options.

---

# 13. ERROR HANDLING

The application must handle:

1. Empty scenario input.
2. Invalid category or difficulty.
3. Gemini API unavailable.
4. Gemini rate limits.
5. Invalid AI-generated JSON.
6. Database connection failure.
7. Missing mystery ID.
8. Invalid evidence ID.
9. Invalid suspect selection.
10. Duplicate accusation submission.
11. Image-generation failure.
12. Network connection failure.

Errors must be displayed in understandable language.

Never expose:
- API keys.
- Stack traces.
- Database credentials.
- Internal AI prompts.
- Hidden solutions.

---

# 14. SECURITY REQUIREMENTS

1. Store secrets in backend environment variables.
2. Use server-side Gemini API calls.
3. Validate all incoming requests.
4. Rate-limit expensive generation endpoints.
5. Prevent access to hidden solution data.
6. Use non-guessable session identifiers for anonymous cases.
7. Verify case ownership before deletion or other session-specific actions.
8. Avoid trusting client-side correctness calculations.
9. Apply appropriate CORS restrictions.
10. Restrict AI-generated content to fictional entertainment.

All cases must be clearly presented as fictional. The interface must not imply that generated crime-scene materials are real evidence or real police records.

---

# 15. PROJECT FOLDER STRUCTURE

Recommended structure:

ai-mystery-room/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── SuspectCard.jsx
│       │   ├── EvidenceCard.jsx
│       │   ├── EvidenceViewer.jsx
│       │   └── LoadingScreen.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── CreateMystery.jsx
│       │   ├── InvestigationRoom.jsx
│       │   └── Results.jsx
│       ├── services/
│       │   └── api.js
│       ├── hooks/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── mysteryController.js
│   ├── models/
│   │   ├── Mystery.js
│   │   └── Investigation.js
│   ├── routes/
│   │   └── mysteryRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── mysteryService.js
│   │   ├── evidenceService.js
│   │   └── imageService.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── specs/
│   ├── MASTER_SPEC.md
│   ├── DATA_SCHEMA.md
│   ├── API_SPEC.md
│   ├── AI_GENERATION_SPEC.md
│   ├── UI_UX_SPEC.md
│   └── IMPLEMENTATION_PLAN.md
│
├── .gitignore
└── README.md

Codex may add files when technically necessary, but it must preserve the modular separation of responsibilities.

---

# 16. ENVIRONMENT VARIABLES

Backend .env example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

Optional image generation configuration:

IMAGE_PROVIDER=
IMAGE_API_KEY=

Never commit .env files to GitHub.

Provide a .env.example file containing variable names and placeholder values only.

---

# 17. DEVELOPMENT PHASES

## PHASE 1: Project Setup

- Initialize MERN application.
- Configure React frontend.
- Configure Express backend.
- Connect MongoDB.
- Configure environment variables.
- Set up frontend/backend communication.

Deliverable: Working MERN application.

## PHASE 2: Frontend Development

- Build landing page.
- Build scenario creation page.
- Build investigation room.
- Build suspect cards.
- Build evidence viewer.
- Build accusation page.
- Build results page.

Deliverable: Complete responsive frontend using mock data initially.

## PHASE 3: Gemini Integration

- Integrate Gemini API.
- Create generation prompts.
- Define JSON schema.
- Generate mysteries.
- Generate suspects.
- Generate evidence.
- Validate AI output.

Deliverable: Working AI mystery generation.

## PHASE 4: Database Integration

- Create MongoDB models.
- Store generated cases.
- Retrieve cases.
- Protect secret solution fields.
- Implement anonymous session management.

Deliverable: Persistent mystery investigations.

## PHASE 5: Evidence System

- Implement WhatsApp evidence viewer.
- Implement image evidence viewer.
- Implement CCTV-style viewer.
- Implement witness statements.
- Implement document viewer.

Deliverable: Interactive investigation room.

## PHASE 6: Accusation and Results

- Implement suspect selection.
- Implement accusation API.
- Verify culprit server-side.
- Generate final explanation.
- Build results page.

Deliverable: Complete playable mystery experience.

## PHASE 7: Testing and Optimization

- Test all API endpoints.
- Test AI generation consistency.
- Test secret answer protection.
- Test invalid user input.
- Test responsive design.
- Test error handling.
- Fix bugs.

Deliverable: Stable MVP.

---

# 18. ACCEPTANCE CRITERIA

The project is considered complete when all the following conditions are satisfied.

### Landing Page
- [ ] Landing page loads successfully.
- [ ] Navigation works.
- [ ] Start Investigation button works.
- [ ] Responsive design works.

### Mystery Creation
- [ ] User can enter a scenario.
- [ ] User can select category.
- [ ] User can select difficulty.
- [ ] Empty input is rejected.
- [ ] Gemini generates a mystery.

### Mystery Generation
- [ ] Every mystery contains 3–5 suspects.
- [ ] Every mystery has exactly one culprit.
- [ ] Every mystery has at least 5 evidence items.
- [ ] Evidence is logically connected.
- [ ] Timeline is consistent.
- [ ] Solution is supported by evidence.

### Investigation Room
- [ ] Case overview is visible.
- [ ] Suspects are displayed.
- [ ] Evidence categories work.
- [ ] Evidence details can be opened.
- [ ] Images and messages display correctly.
- [ ] User can navigate between evidence items.

### Accusation
- [ ] User can select one suspect.
- [ ] User can submit an accusation.
- [ ] Backend checks the selected suspect.
- [ ] Duplicate submissions are prevented.

### Results
- [ ] Correct answer is displayed.
- [ ] Incorrect answer is displayed.
- [ ] Actual culprit is revealed.
- [ ] Motive is explained.
- [ ] Supporting evidence is explained.
- [ ] User can start another investigation.

### Security
- [ ] Gemini API key is not exposed.
- [ ] Solution is not exposed before accusation.
- [ ] Backend validates all selections.
- [ ] API errors are handled safely.

---

# 19. OUT OF SCOPE FOR MVP

The following features are intentionally excluded from the initial version:

- Multiplayer investigations.
- Real-time collaborative detective rooms.
- Voice-based interrogation.
- Live AI video generation.
- User accounts and subscriptions.
- Payment gateway.
- Public mystery marketplace.
- Leaderboards.
- Social sharing.
- Real criminal database integration.

These can be added in future versions without changing the core architecture.

---

# 20. FUTURE ENHANCEMENTS

Possible future improvements:

1. AI-generated CCTV videos.
2. Interactive suspect interrogation.
3. AI-powered detective assistant.
4. Multiple endings.
5. Time-limited investigations.
6. Multiplayer detective mode.
7. User accounts and investigation history.
8. Mystery difficulty progression.
9. Achievement system.
10. Community-created mysteries.

---

# 21. CODEX DEVELOPMENT RULES

These rules are mandatory.

1. Treat this specification as the single source of truth.
2. Read the complete specification before writing code.
3. Do not start implementing the entire application in one step.
4. Follow the development phases in order.
5. Use the MERN stack specified in this document.
6. Use Gemini as the primary text-generation AI provider.
7. Keep all AI API calls on the backend.
8. Maintain clean and modular code.
9. Separate controllers, routes, models, services, and middleware.
10. Validate all AI-generated JSON before saving it.
11. Never expose the culprit or solution before final accusation.
12. Do not hardcode the mystery, suspects, or culprit.
13. Use mock data only for initial frontend development and clearly replace it with real API integration.
14. Do not silently substitute fake image-generation functionality for actual image generation.
15. Implement proper loading, error, and empty states.
16. Make the entire application responsive.
17. Follow the acceptance criteria before declaring any phase complete.
18. Do not add unrelated features without updating the specification.
19. Do not remove existing working features when implementing new ones.
20. Update relevant specifications whenever an approved requirement changes.

If any important requirement is ambiguous, document the assumption before implementation rather than silently inventing a major feature.

---

# 22. FINAL PROJECT DEFINITION

AI Mystery Room is a full-stack AI-powered mystery investigation platform built using the MERN stack and Google Gemini API.

The platform allows users to submit their own mystery scenarios and receive dynamically generated fictional investigations.

Users explore suspects, examine AI-generated evidence, analyze conversations, investigate photographs and CCTV-style materials, and ultimately identify the culprit.

The backend maintains the complete investigation and securely protects the correct answer until the user submits their final accusation.

The final experience should feel like an interactive detective game where every case presents a new challenge.

**Core Product Principle:**

"AI creates the mystery. Evidence tells the story. The user solves the crime."

**END OF MASTER SPECIFICATION**