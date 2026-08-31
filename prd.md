# PRD — NYAMBUNG

**Product:** nyambung
**Tagline:** _Biar ngobrol tetap nyambung._
**Platform:** Mobile-first Web App / PWA
**Primary language:** Bahasa Indonesia (`id-ID`)
**Frontend:** **React.js + JavaScript + Tailwind CSS**
**Build tool:** Vite
**Primary device:** Smartphone
**Secondary device:** Desktop browser

> **MANDATORY:** The frontend MUST use **JavaScript, NOT TypeScript**.

---

# 1. Executive Summary

**nyambung** is an AI-powered conversation game designed to help people start, maintain, and deepen conversations naturally.

The app generates contextual questions in natural Bahasa Indonesia rather than presenting a static list of question cards.

The core experience is:

> **Pertanyaan → Jawaban → Follow-up → Reaksi → Obrolan → Nyambung**

The application is designed **mobile-first** and should feel like a native smartphone app even though it is delivered as a web application/PWA.

On desktop, the application remains a centered mobile-oriented experience.

**No desktop sidebar.**

---

# 2. Product Vision

> **Membantu orang ngobrol lebih lama, lebih natural, dan lebih dekat tanpa kehabisan bahan obrolan.**

The user should feel:

> "Pertanyaannya kok pas banget?"

Not:

> "I'm using an AI question generator."

AI should operate mostly behind the scenes.

---

# 3. Core Product Principles

## 3.1 Conversation > Questions

The product is not a question database.

Questions are only the mechanism for creating better conversations.

Optimize for:

> meaningful conversations

rather than:

> number of questions displayed.

---

## 3.2 AI Should Feel Invisible

Avoid constantly displaying:

- AI Generated
- Powered by AI
- AI Assistant
- chatbot bubbles
- robot avatars

The AI should feel like an invisible conversation host.

---

## 3.3 Indonesian First

Bahasa Indonesia is the primary product language.

Questions must be generated natively in Indonesian.

Do NOT:

```text
English question
↓
Machine translation
↓
Indonesian question
```

Instead:

```text
Conversation context
↓
Indonesian generation
↓
Humanization
↓
Quality check
↓
Question
```

---

## 3.4 Mobile First

Smartphone is the source of truth.

Priority viewport:

```text
360px
375px
390px
412px
430px
```

Desktop is secondary.

---

## 3.5 No Sidebar

A persistent desktop sidebar is prohibited.

Do not create:

- dashboard layouts
- desktop navigation rails
- SaaS sidebars
- multi-column desktop application shells

Desktop should simply provide additional whitespace around the mobile-oriented experience.

---

# 4. Target Users

### Friends

Friends hanging out who need something to talk about.

### Couples

Partners looking for playful, personal, or deeper conversations.

### PDKT

People getting closer.

### New acquaintances

People who have just met.

### Groups

3–10 people during:

- hangouts
- trips
- parties
- gatherings
- campus activities

### Family

Safe, nostalgic conversation.

---

# 5. Primary User Journey

```text
Open nyambung
        ↓
Choose relationship
        ↓
Choose vibe
        ↓
Choose depth
        ↓
Start conversation
        ↓
AI generates question
        ↓
Question card
        ↓
User answers
        ↓
AI understands context
        ↓
Generate next question
        ↓
User uses gestures
        ↓
Conversation continues
        ↓
Session summary
```

The user should reach the first question quickly.

Target:

**< 5 seconds after pressing Start.**

---

# 6. Core Modes

## Teman

For friends.

Characteristics:

- casual
- funny
- curious
- occasionally deep

---

## Pasangan

For couples.

Characteristics:

- warm
- personal
- romantic
- playful
- reflective

---

## PDKT

Progressive conversation.

```text
Light
↓
Curious
↓
Personal
↓
Playful
↓
Flirty
```

---

## Baru Kenal

Specifically designed to prevent awkward introductions.

Avoid generic:

> "Apa hobimu?"

Prefer:

> "Kalau lagi nggak ada kerjaan, biasanya kamu malah ngapain?"

---

## Rame-rame

For 3–10 people.

Supports:

- voting
- guessing
- pointing
- ranking
- debate
- scenarios
- reveal mechanics

---

## Keluarga

Safe and nostalgic.

Examples:

> "Waktu kecil, kamu paling sering dimarahin karena apa?"

> "Makanan rumah yang paling kamu kangenin apa?"

---

# 7. Vibe System

Users can select one or more.

### 😂 Receh

Funny, silly, absurd.

### 👀 Penasaran

Interesting and revealing.

### 🧠 Dalam

Reflective.

### ❤️ Personal

Emotionally meaningful.

### 🔥 Berani

More daring.

### 🇮🇩 Nostalgia

Indonesian memories and experiences.

### 🌀 Random

Unexpected questions.

---

# 8. Conversation Depth

Use a simple mobile-friendly control.

```text
Santai ──────────── Dalam
  1    2    3    4    5
```

### 1 — Ringan

Easy icebreakers.

### 2 — Santai

Casual.

### 3 — Penasaran

More revealing.

### 4 — Personal

More intimate.

### 5 — Dalam

Reflective and vulnerable.

The AI can dynamically adjust this level based on user interaction.

---

# 9. Indonesian Language Guidelines

The AI must sound like a real Indonesian person.

## Good

> "Kalau besok kamu bebas seharian, mau ngapain?"

> "Apa hal kecil yang akhir-akhir ini bikin kamu senang?"

> "Sejak kejadian itu, cara kamu ngelihat sesuatu berubah nggak?"

## Bad

> "Apa aktivitas yang akan Anda lakukan apabila memperoleh waktu luang selama satu hari?"

> "Bagaimana pengalaman tersebut mengubah perspektif Anda?"

---

## Slang

Allowed:

- nggak
- gak
- kayak
- nih
- sih
- dong
- aja
- deh
- banget
- wkwk

But slang must NOT be forced into every question.

The AI should adapt its register naturally.

---

# 10. Question Engine

The AI question engine is the core feature.

The engine receives:

```text
relationship
player count
vibes
depth
previous questions
previous answers
skipped questions
topics
session duration
interaction patterns
```

and generates the next question.

---

# 11. Question Types

The engine should support diverse question structures.

### Open

> "Apa hal kecil yang akhir-akhir ini bikin kamu senang?"

### Would You Rather

> "Pilih mana: punya banyak waktu tapi sedikit uang, atau banyak uang tapi nggak punya waktu?"

### This or That

> "Nongkrong malam atau jalan pagi?"

### Scenario

> "Besok kamu tiba-tiba dapat tiket gratis ke mana aja. Mau ke mana?"

### Guess

> "Menurut kamu, siapa di sini yang paling mungkin pindah ke luar negeri?"

### Vote

> "Siapa di sini yang paling mungkin terkenal duluan?"

### Rank

> "Urutin: uang, waktu, kesehatan, kebebasan."

### Story

> "Ceritain kejadian paling absurd yang pernah kamu alami waktu sekolah."

### Confession

> "Hal kecil yang sebenarnya sering kamu lakukan tapi malu ngakuin apa?"

### Follow-up

Generated from an answer.

---

# 12. Adaptive Conversation

The AI must maintain contextual continuity.

Example:

Question:

> "Kalau bisa liburan gratis ke mana aja, mau ke mana?"

Answer:

> "Jepang."

Next question:

> "Kalau beneran sampai Jepang, hal pertama yang pengen kamu lakukan apa?"

Answer:

> "Keliling Tokyo."

Next:

> "Sendiri atau ngajak seseorang?"

The engine should avoid abruptly changing topics unless the user requests a lighter/random question.

---

# 13. Conversation State

Use JavaScript objects.

Example:

```javascript
const conversationState = {
  energy: 0.7,
  humor: 0.8,
  depth: 0.4,
  openness: 0.6,
  engagement: 0.8,

  topics: [],
  rejectedTopics: [],
  questionHistory: [],

  lastQuestionType: null,
};
```

The state should exist primarily for the current session in MVP.

---

# 14. Question Context

Example JavaScript object:

```javascript
const questionContext = {
  language: "id-ID",

  relationship: "friends",

  playerCount: 4,

  vibes: ["funny", "curious"],

  depth: 3,

  previousQuestions: [],

  previousAnswers: [],

  skippedQuestions: [],

  topics: [],

  sessionDuration: 420,

  preferredQuestionTypes: [],
};
```

---

# 15. AI Generation Pipeline

```text
Conversation Context
        ↓
Question Seed Selection
        ↓
AI Generation
        ↓
Indonesian Humanization
        ↓
Safety Filter
        ↓
Repetition Detection
        ↓
Quality Scoring
        ↓
Final Question
```

Do not depend entirely on unconstrained AI generation.

---

# 16. Curated Question Seeds

Maintain a curated seed library.

Initial target:

**1,000+ Indonesian question seeds.**

Suggested distribution:

| Category              | Target |
| --------------------- | -----: |
| Kenalan               |    150 |
| Receh                 |    150 |
| Penasaran             |    150 |
| Dalam                 |    150 |
| Personal              |    100 |
| Berani                |    100 |
| PDKT                  |     75 |
| Pasangan              |     75 |
| Rame-rame             |     75 |
| Indonesia / Nostalgia |    100 |

AI adapts these seeds to the current context.

---

# 17. Humanization Rules

Generated questions must avoid repetitive AI patterns.

Avoid repeatedly starting with:

> "Apa..."

> "Mengapa..."

> "Bagaimana..."

Instead vary structures:

> "Kalau..."

> "Pernah nggak..."

> "Jujur aja..."

> "Coba bayangin..."

> "Menurut kamu..."

> "Siapa di sini yang..."

> "Kapan terakhir kali..."

> "Hal paling..."

The AI should not make every question sound philosophical.

---

# 18. Question Quality Criteria

Every generated question should be evaluated for:

```text
Naturalness
Context relevance
Originality
Conversation potential
Clarity
Appropriateness
Depth consistency
Repetition
```

Questions with poor scores should be regenerated.

---

# 19. Signature Gesture System

Gestures are a core interaction model.

## Swipe Left

### Lewati

```text
← LEWATI
```

The current question is discarded.

Record the skip.

---

## Swipe Right

### Lanjut

```text
LANJUT →
```

Move to the next question.

---

## Swipe Up

### Lebih Dalam

```text
↑ LEBIH DALAM
```

Generate a deeper follow-up.

---

## Swipe Down

### Santai Dulu

```text
↓ SANTAI DULU
```

Reduce intensity.

---

## Long Press

### Tanya Lagi

Hold the question card to request another contextual follow-up.

---

## Tap

Potentially reveal additional interaction/content.

---

## Shake

Optional future feature:

**Chaos Mode**

Generate a highly unexpected question.

---

# 20. Gesture UX

During the first few interactions, show:

```text
← Lewati       Lanjut →

       ↑
  Lebih dalam

       ↓
 Santai dulu
```

After the user demonstrates understanding, hide the hints.

Do not permanently clutter the question screen.

---

# 21. Question Card

The question is the visual focus.

Example:

```text
┌──────────────────────────┐
│                          │
│       👀 PENASARAN       │
│                          │
│                          │
│   Kalau besok kamu       │
│   bebas seharian,        │
│   mau ngapain?           │
│                          │
│                          │
│                          │
│       ↑ lebih dalam      │
│       ↓ santai dulu      │
│                          │
└──────────────────────────┘
```

Avoid excessive UI.

The user should not feel like they're filling out a form.

---

# 22. Card Animation

Use:

**Framer Motion**

Swipe:

```javascript
x: 0 → ±500
rotation: 0 → ±15
opacity: 1 → 0
```

Next card:

```javascript
scale: 0.95 → 1
opacity: 0 → 1
```

Target:

**150–300ms**

Animations should feel physical and responsive.

---

# 23. Mobile Layout

Structure:

```text
Safe Area
    ↓
Minimal Header
    ↓
Question Card
    ↓
Gesture Interaction Area
    ↓
Safe Area
```

Use:

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

where appropriate.

---

# 24. Desktop Layout

Desktop should remain mobile-oriented.

Example:

```text
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│            ┌────────────────┐            │
│            │                │            │
│            │   QUESTION     │            │
│            │                │            │
│            └────────────────┘            │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

Recommended content constraint:

```css
max-width: 480px;
```

No sidebar.

No desktop dashboard.

No multi-column application shell.

---

# 25. Home Screen

The home screen should be extremely simple.

```text
              ✦ nyambung

      Biar ngobrol tetap nyambung.


       Mau ngobrol sama siapa?

          👯 Teman
          💕 Pasangan
          🎉 Rame-rame
          🆕 Baru kenal


             Vibenya?

       😂   👀   🧠   ❤️
       🔥   🇮🇩  🌀


            [ MULAI → ]
```

Do not show unnecessary analytics.

---

# 26. Setup Flow

### Screen 1

> **Siapa aja yang ikut?**

Options:

- 2 orang
- 3–4 orang
- 5–8 orang
- 9+

### Screen 2

> **Vibenya gimana?**

Select multiple.

### Screen 3

> **Mau sedalam apa?**

Depth control.

### CTA

> **Mulai ngobrol →**

---

# 27. AI Host

AI can occasionally provide very short reactions.

Examples:

> "Oke, ini menarik."

> "Nah, yang ini agak susah."

> "Kita bikin sedikit lebih dalam."

> "Udah terlalu serius 😂"

> "Oke... ini bisa jadi debat."

Use sparingly.

The host must never become the main character.

---

# 28. Session Summary

Do not say:

> Game Over.

Use:

> **Udah nyambung. ❤️**

Example:

```text
Udah nyambung. ❤️

18 pertanyaan
42 menit
6 topik

😂 45%
👀 30%
🧠 25%

"Ternyata masih banyak yang
belum kalian tahu satu sama lain."

[ MAIN LAGI ]
```

The summary should feel emotional and human rather than analytical.

---

# 29. Saved Questions

Users can save questions.

Primary interaction:

**Double tap → ❤️**

Saved questions are available for later.

Future:

> Buat jadi ronde sendiri.

---

# 30. Group Mechanics

Rame-rame should eventually include:

### Vote

Everyone votes.

### Guess

Guess another player's answer.

### Point

> "Tunjuk orang yang paling..."

### Reveal

Answers remain hidden until everyone responds.

### Ranking

Everyone ranks options.

These mechanics differentiate group mode from a simple question-card app.

---

# 31. PWA Requirements

nyambung must be installable as a PWA.

Required:

```text
manifest
service worker
offline fallback
app icons
maskable icons
splash support
standalone display
portrait orientation
```

Manifest example:

```javascript
{
  name: "nyambung",
  short_name: "nyambung",
  display: "standalone",
  orientation: "portrait"
}
```

Required assets:

```text
icon-192.png
icon-512.png
icon-192-maskable.png
icon-512-maskable.png
apple-touch-icon.png
favicon-16.png
favicon-32.png
favicon-192.png
favicon-512.png
```

---

# 32. Offline Strategy

Online:

```text
AI generation
+
curated fallback questions
```

Offline:

```text
curated Indonesian question pool
```

The user must still be able to play basic rounds without internet.

---

# 33. Brand

## Name

**nyambung**

## Tagline

**Biar ngobrol tetap nyambung.**

## Personality

```text
Warm
Playful
Human
Minimal
Friendly
Slightly cheeky
Modern Indonesian
```

---

# 34. Visual Direction

Minimalist pastel aesthetic.

Preferred:

- warm neutrals
- soft pastel accents
- rounded cards
- generous whitespace
- subtle shadows
- friendly typography
- simple icons
- restrained animation

Avoid:

- neon
- excessive gradients
- excessive glassmorphism
- generic AI aesthetics
- robot illustrations
- enterprise dashboard aesthetics
- overly childish UI

---

# 35. Typography

Primary:

**Plus Jakarta Sans**

Alternatives:

- Inter
- Geist

Question text:

**28–34px**, responsive.

Supporting text:

**14–16px**

Controls:

**14–16px**

---

# 36. Logo System

Required brand assets:

```text
nyambung-brand-logo.png
nyambung-navbar-logo.png
nyambung-wordmark.png

favicon-16.png
favicon-32.png
favicon-192.png
favicon-512.png

icon-192.png
icon-512.png
icon-192-maskable.png
icon-512-maskable.png

apple-touch-icon.png

nyambung-og-image.png
```

Primary logo:

**connected speech-bubble mark + lowercase nyambung wordmark**

Production should use vector/SVG assets wherever possible.

Do not:

- stretch
- skew
- rotate
- arbitrarily recolor
- add effects
- distort proportions

---

# 37. Technical Stack — MANDATORY

## Frontend

```text
React.js
JavaScript
Tailwind CSS
Vite
Framer Motion
@use-gesture/react
Zustand
```

### STRICT RULE

**DO NOT USE TYPESCRIPT.**

Do not create:

```text
.ts
.tsx
```

files.

Use:

```text
.js
.jsx
```

instead.

---

# 38. JavaScript Rules

Use modern JavaScript.

Preferred:

```javascript
const
let
async/await
modules
destructuring
optional chaining
array methods
object spread
```

React components:

```text
.jsx
```

Utilities/services:

```text
.js
```

Do not introduce TypeScript merely for type safety.

If runtime validation is needed, use JavaScript-compatible validation such as:

- Zod
- PropTypes
- custom validation

But avoid unnecessary dependencies.

---

# 39. React Architecture

Recommended:

```text
src/
│
├── app/
│   ├── router.jsx
│   └── providers.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Setup.jsx
│   ├── Game.jsx
│   ├── Saved.jsx
│   └── Settings.jsx
│
├── components/
│   ├── QuestionCard/
│   │   └── QuestionCard.jsx
│   │
│   ├── GestureLayer/
│   │   └── GestureLayer.jsx
│   │
│   ├── VibeSelector/
│   │   └── VibeSelector.jsx
│   │
│   ├── DepthSlider/
│   │   └── DepthSlider.jsx
│   │
│   └── SessionSummary/
│       └── SessionSummary.jsx
│
├── hooks/
│   ├── useSwipe.js
│   ├── useQuestion.js
│   ├── useSession.js
│   └── useHaptics.js
│
├── services/
│   ├── questionApi.js
│   └── analytics.js
│
├── store/
│   └── sessionStore.js
│
├── data/
│   └── fallbackQuestions.js
│
├── utils/
│   ├── questionUtils.js
│   └── gestureUtils.js
│
└── styles/
    └── globals.css
```

---

# 40. Zustand Store

Use Zustand for session state.

Example:

```javascript
const useSessionStore = create((set) => ({
  relationship: null,
  playerCount: 2,

  vibes: [],

  depth: 3,

  currentQuestion: null,

  questionHistory: [],

  skippedQuestions: [],

  savedQuestions: [],

  sessionStartedAt: null,

  setRelationship: (relationship) => set({ relationship }),

  setPlayerCount: (playerCount) => set({ playerCount }),

  setVibes: (vibes) => set({ vibes }),

  setDepth: (depth) => set({ depth }),

  skipQuestion: () =>
    set((state) => ({
      skippedQuestions: [...state.skippedQuestions, state.currentQuestion?.id],
    })),
}));
```

---

# 41. API Architecture

Suggested endpoints:

```text
POST /api/session

POST /api/question

POST /api/question/follow-up

POST /api/question/deeper

POST /api/question/lighter

POST /api/question/interaction

POST /api/session/end

GET /api/questions/fallback
```

Frontend must NEVER contain an LLM API key.

All AI requests must go through a backend/server-side API.

---

# 42. API Request Example

```javascript
const response = await fetch("/api/question", {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    language: "id-ID",
    relationship: "friends",
    playerCount: 4,
    vibes: ["funny", "curious"],
    depth: 3,
    previousQuestions,
    previousAnswers,
    skippedQuestions,
  }),
});

const data = await response.json();
```

---

# 43. Question Object

Use plain JavaScript objects.

```javascript
const question = {
  id: "q_82931",

  text: "Kalau cuma boleh makan satu makanan Indonesia seumur hidup, pilih apa?",

  language: "id-ID",

  type: "open",

  category: "curious",

  vibes: ["funny", "curious"],

  depth: 2,

  relationships: ["friends", "group"],

  minPlayers: 2,

  maxPlayers: 8,

  ageRating: "13+",

  humorLevel: 0.5,

  controversyLevel: 0.1,

  estimatedDuration: 30,

  seedId: "food_001",
};
```

---

# 44. Safety

AI-generated questions must be moderated.

Prevent:

- harassment
- hate
- targeted humiliation
- dangerous challenges
- coercive content
- inappropriate sexual content
- self-harm encouragement
- illegal activity

Initial product rating:

**13+**

More mature modes may be introduced later with appropriate controls.

---

# 45. Analytics

Track:

```text
session_started
setup_completed
question_generated
question_answered
question_skipped
question_saved

swipe_left
swipe_right
swipe_up
swipe_down

followup_requested

session_completed
```

Primary metrics:

### Activation

% of users starting a session.

### Engagement

Questions answered per session.

### Conversation Quality

Follow-up rate.

### AI Quality

Question skip rate.

### Retention

Returning sessions.

---

# 46. North Star Metric

## Meaningful Conversations Per Week

Definition:

> A session containing at least 5 answered questions and at least one contextual follow-up interaction.

The team should optimize for meaningful conversations, not raw question count.

---

# 47. MVP Scope

## P0 — MUST HAVE

### Product

- Indonesian-first UX
- Home
- Setup
- Relationship selection
- Vibe selection
- Depth selection
- Question experience
- AI question generation
- Context-aware follow-ups
- Question history
- Repetition prevention
- Session state
- Session summary

### Interaction

- Swipe left
- Swipe right
- Swipe up
- Swipe down
- Responsive touch interactions
- Mobile-safe areas
- Smooth card animation

### Technical

- React.js
- **JavaScript only**
- JSX
- Tailwind CSS
- Vite
- Framer Motion
- Zustand
- PWA
- Offline fallback

### Design

- Minimal
- Pastel
- Mobile-first
- No sidebar
- No dashboard
- No desktop application shell

---

# 48. P1 — SHOULD HAVE

- Long press follow-up
- Haptic feedback
- Saved questions
- Group voting
- Guess mechanics
- Reveal mechanics
- Ranking
- Question reactions
- Better session summary
- Install prompt

---

# 49. P2 — FUTURE

- Multiplayer synchronization
- Persistent user profiles
- AI memory across sessions
- User-created question packs
- Community packs
- Premium packs
- AI voice host
- Chaos Mode / shake interaction
- English localization
- Additional languages
- Shareable session results

---

# 50. Explicit Non-Goals

Do NOT build these into MVP:

- Desktop sidebar
- Complex dashboard
- Social feed
- Public user profiles
- ChatGPT-style chat interface
- AI character/avatar
- User accounts as a prerequisite
- Complex onboarding
- Excessive gamification
- Leaderboards
- Streaks
- XP systems
- Cryptocurrency
- Enterprise-style navigation

---

# 51. Performance Requirements

Target:

- Fast first render
- Minimal JavaScript bundle where possible
- Lazy-load secondary screens
- Optimize images
- Avoid unnecessary re-renders
- Keep gesture interactions at 60fps where device allows
- Cache fallback questions
- Prefetch the next question where appropriate

The next question should ideally already be available before the user finishes interacting with the current one.

---

# 52. Accessibility

Must support:

- readable contrast
- large touch targets
- keyboard navigation where applicable
- reduced-motion preference
- screen-reader-friendly controls
- gesture alternatives

Gestures should enhance the experience, not be the only way to perform an action.

For example:

```text
Swipe left
OR
Tap "Lewati"
```

when accessibility or device limitations require it.

---

# 53. Error Handling

AI generation can fail.

Never expose technical errors such as:

> "500 Internal Server Error"

Instead:

> "Hmm, pertanyaannya lagi nyangkut 😅"

Then:

> **Coba lagi**

If AI remains unavailable:

```text
AI unavailable
↓
Curated fallback question
```

The game should continue.

---

# 54. Empty / Loading State

Avoid generic:

> Loading...

Use subtle conversational feedback:

> "Lagi mikirin pertanyaan yang pas..."

or:

> "Bentar, cari yang menarik dulu..."

Keep loading short.

Do not over-animate.

---

# 55. Brand Voice

The product should sound:

**natural + warm + slightly playful**

Not:

**corporate + robotic + overly Gen-Z**

Good:

> "Oke, yang ini menarik."

> "Kita bikin agak lebih dalam."

> "Udah terlalu serius 😂"

Bad:

> "Amazing! Let's dive deeper into your emotional journey!"

Bad Indonesian equivalent:

> "Mari kita mengeksplorasi aspek emosional yang lebih mendalam."

---

# 56. Final Product Loop

The entire product should ultimately reduce to:

```text
             NYAMBUNG

                 ↓

          Pilih siapa
                 ↓
          Pilih vibe
                 ↓
          Pilih depth
                 ↓
               MULAI
                 ↓
          ┌─────────────┐
          │             │
          │  QUESTION   │
          │             │
          └─────────────┘
             ↙ ↓ ↘
          skip  next  deeper
                 ↓
              ANSWER
                 ↓
          AI understands
                 ↓
           FOLLOW-UP
                 ↓
            CONVERSATION
                 ↓
              NYAMBUNG
```

# 57. Definition of Done

The MVP is considered complete when:

1. A user can open nyambung on a smartphone.
2. They can select relationship, vibe, and depth.
3. They can start a session without creating an account.
4. An Indonesian question appears quickly.
5. Questions are generated/adapted by AI.
6. Questions sound naturally Indonesian.
7. The AI remembers relevant context within the session.
8. Users can swipe to control the conversation.
9. Swipe up creates deeper questions.
10. Swipe down creates lighter questions.
11. Swipe left skips questions.
12. The system prevents obvious repetition.
13. AI failures fall back to curated questions.
14. The interface works without a desktop sidebar.
15. The app is responsive from smartphone through desktop.
16. The app can be installed as a PWA.
17. Offline fallback questions remain playable.
18. All frontend code is **JavaScript/JSX only**.
19. **No `.ts` or `.tsx` files exist anywhere in the frontend.**
20. The visual language follows the nyambung brand guidelines.

---

# 58. Golden Rule for Implementation Agents

> **Build nyambung as a mobile conversation experience, not as a website dashboard.**

When choosing between two implementations, prefer the one that:

**feels more natural on a phone, requires less UI, uses gestures meaningfully, and keeps the user focused on the conversation.**

And one technical rule overrides assumptions:

> **USE REACT + JAVASCRIPT + TAILWIND CSS. NEVER INTRODUCE TYPESCRIPT.**
