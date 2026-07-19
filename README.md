# ज्ञानसेतु

ज्ञानसेतु एक integrated multilingual AI learning-platform frontend prototype है।

## Files included

```text
src/app/page.tsx      # Main interactive app: library, reader, learning, groups, studio
src/app/globals.css   # Responsive visual design for all screens
src/app/layout.tsx    # App metadata and root layout
package.json          # Next.js scripts and dependencies
```

## Run locally

```bash
cd /home/user/NEW-PROJECT
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available screens

- Home / private document library
- Document reader with AI Explain, audio controls and cited chat UI
- सीखें: revision plan, flashcards and source-based quiz
- Study Groups: comments, roles, cross-device sync and offline access UX
- Jnana Studio: author/publisher catalog, rights and production workflows

> This is an integrated frontend prototype. Production services such as authentication, encrypted upload storage, OCR, live RAG/AI, TTS, billing and real-time sync require backend implementation and provider configuration.
