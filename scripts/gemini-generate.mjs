import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'fs';

const { GEMINI_API_KEY, ISSUE_TITLE, ISSUE_BODY } = process.env;

if (!GEMINI_API_KEY || !ISSUE_TITLE) {
  throw new Error('Missing required env vars: GEMINI_API_KEY, ISSUE_TITLE');
}

const APP_PATH = 'frontend/src/App.tsx';
const currentCode = readFileSync(APP_PATH, 'utf-8');

const prompt = `You are a React/TypeScript developer.
Update the component below based on the feature request.
Return ONLY the raw updated code — no markdown, no explanation, no code blocks.

Feature request:
Title: ${ISSUE_TITLE}
Description: ${ISSUE_BODY || 'No description provided'}

Current App.tsx:
${currentCode}`;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
});

let code = response.text
  .replace(/^```(?:tsx?|typescript)?\n?/i, '')
  .replace(/\n?```$/i, '')
  .trim();

writeFileSync(APP_PATH, code, 'utf-8');
console.log(`✅ App.tsx updated for: ${ISSUE_TITLE}`);