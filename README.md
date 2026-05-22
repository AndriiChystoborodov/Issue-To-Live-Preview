# Issue to Live Preview Pipeline

A robust, context-aware Slack bot powered by Google's Gemini 2.5 Flash model and the Slack Bolt framework. This bot acts as a professional assistant directly within your Slack workspace, maintaining conversation history per thread and enforcing strict language and security policies.

## ✨ Features

- **Socket Mode Integration**: Connects to Slack securely using WebSockets (`@slack/bolt`) without needing public HTTP endpoints or configuring request URLs.
- **Google Gemini Powered**: Utilizes the fast and capable `gemini-2.5-flash` model (`@google/genai`) for highly intelligent and context-aware responses.
- **Language Gatekeeper**: Built-in language classification ensures the bot only responds to messages predominantly in **English** or **French**.
- **Thread-Aware Memory**: Maintains conversational context in an isolated, per-thread memory store. This allows for natural back-and-forth interactions without cross-thread contamination.
- **Security First**: Adheres to OWASP best practices via strict system instructions, preventing unauthorized commands, prompt leaking, and disclosure of sensitive information (PII, HR records, etc.).

## 🚀 Prerequisites

- Node.js (v18 or higher recommended)
- A Slack App configured with:
  - **Socket Mode** enabled.
  - **Event Subscriptions** enabled (subscribing to `message.channels` or `app_mention` events).
  - **Bot Token** (`xoxb-...`) with the necessary chat and history scopes.
  - **App-Level Token** (`xapp-...`) with the `connections:write` scope.
- A Google Gemini API Key

## 🧰 Tech Stack

- **Language**: TypeScript
- **Bot Framework**: `@slack/bolt`
- **AI SDK**: `@google/genai`
- **Environment Management**: `dotenv`

## 🏗️ Architecture Overview

1. **Event Reception**: The bot listens to incoming messages, inherently ignoring other bots and message edits to prevent infinite loops.
2. **Language Classification (Gatekeeper)**: Upon receiving a message, the bot first uses `eld` (Efficient Language Detector), a fast and lightweight local library, to classify the language. This is done offline without any API calls. If the text is neither English nor French, execution is halted with a bilingual decline message.
3. **State Management**: The bot records the `thread_ts` (or standard message timestamp) and channel ID to map an isolated conversation session in-memory.
4. **LLM Execution**: The accumulated message history for that specific thread is passed to Gemini, alongside stringent system instructions governing professional and secure behavior.
5. **Slack Output**: The generated response is returned and posted back into the original Slack thread seamlessly.

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Powercoders-Bootcamp/issue-to-live-preview-pipeline.git
   cd issue-to-live-preview-pipeline
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory of the project and provide your credentials. You can use the following format:

```env
# Slack Configuration
SLACK_APP_TOKEN=xapp-1-...
SLACK_BOT_TOKEN=xoxb-...

# Google Gemini Configuration
GEMINI_API_KEY=AIzaSy...
```

> **⚠️ Security Note:** Never commit your `.env` file to version control. The repository ignores it by default.

## 🏃‍♂️ Running the Bot

Since the project is written in TypeScript, you can use `ts-node` to spin up the application quickly in your development environment:

```bash
npx ts-node index.ts
```

You should see the following output in your console if the connection to Slack is successful:

```text
⚡️ Slack Bolt app is running in Socket Mode!
```
