# Planning Guide

An interactive English grammar practice game that transforms essential grammar rules into engaging exercises, helping learners master the fundamentals of English conversation through immediate feedback and progressive difficulty.

**Experience Qualities**: 
1. **Educational** - Creates a structured learning environment where each exercise reinforces specific grammar concepts with clear explanations and immediate correction feedback.
2. **Motivating** - Builds confidence through visible progress tracking, achievement milestones, and encouraging feedback that celebrates improvement.
3. **Intuitive** - Presents grammar challenges in a game-like format that feels approachable and fun rather than intimidating or test-like.

**Complexity Level**: Light Application (multiple features with basic state)
This is an educational tool with multiple exercise types, progress tracking, and rule reference materials - more than a single-purpose tool but not requiring complex multi-view navigation or advanced backend features.

## Essential Features

**Grammar Rule Browser**
- Functionality: Displays all 13 essential grammar rules with examples and explanations
- Purpose: Provides learners with quick reference material to review before or during practice
- Trigger: User clicks "Study Rules" or accesses rules from within an exercise
- Progression: Select category → View rule card with examples → Navigate between rules → Return to practice
- Success criteria: All rules are clearly displayed with color-coded categories and real-world examples

**Interactive Exercise System**
- Functionality: Presents randomized grammar exercises across multiple types (fill-in-blank, multiple choice, sentence construction, error correction)
- Purpose: Reinforces learning through active practice with immediate feedback
- Trigger: User starts practice session or continues from previous session
- Progression: View question → Submit answer → See instant feedback (correct/incorrect with explanation) → Next question → Track score
- Success criteria: Questions accurately test grammar concepts, feedback is educational, variety keeps engagement high

**Progress Tracking Dashboard**
- Functionality: Shows completed exercises, accuracy rates, weak areas, and achievement badges
- Purpose: Motivates continued practice by visualizing improvement and identifying focus areas
- Trigger: Accessible from main navigation, auto-updates after each exercise
- Progression: Complete exercises → Earn points → Unlock achievements → View statistics → Identify weak grammar rules → Return to targeted practice
- Success criteria: Stats update in real-time, visual indicators make progress clear, weak areas guide future practice

**Category-Based Practice**
- Functionality: Allows learners to focus on specific grammar topics (tenses, questions, modals, etc.)
- Purpose: Enables targeted practice on challenging areas rather than random review
- Trigger: User selects specific grammar category from practice menu
- Progression: Browse categories → Select topic → Practice focused exercises → Review topic-specific progress
- Success criteria: Categories align with the 13 core rules, adequate questions per category

**Achievement & Streak System**
- Functionality: Awards badges for milestones (10 correct, 5-day streak, master specific rule)
- Purpose: Gamifies learning to encourage daily practice habits
- Trigger: Automatic upon reaching achievement thresholds
- Progression: Practice consistently → Reach milestone → Badge notification appears → View in achievement gallery
- Success criteria: Achievements feel attainable yet meaningful, visual rewards are appealing

## Edge Case Handling

- **No Answer Submitted**: Gentle prompt to select/type answer before proceeding
- **Rapid Clicking**: Prevent answer skip by requiring feedback review before next question
- **All Categories Mastered**: Congratulatory message with option to reset progress or try mixed review
- **First-Time User**: Brief onboarding tour highlighting key features without overwhelming
- **Long Absence**: Welcome back message showing previous progress and encouraging return streak
- **Mobile Keyboard**: Input fields auto-focus and keyboard-friendly for typing exercises

## Design Direction

The design should feel like a friendly language learning companion - encouraging, clear, and visually organized. Think of a modern educational app that balances playfulness with credibility. Colors should differentiate grammar categories while maintaining harmony. Typography needs excellent readability for both grammar rules and exercise text. The overall feel should be "I'm making progress!" rather than "I'm being tested."

## Color Selection

A warm, educational palette that feels inviting and optimistic while maintaining clarity for text-heavy content.

- **Primary Color (Deep Teal)**: `oklch(0.55 0.14 210)` - Represents knowledge and trust, used for primary actions and active states. Conveys stability and learning focus.
- **Secondary Color (Soft Slate)**: `oklch(0.65 0.02 240)` - Supporting color for secondary buttons, cards, and less prominent UI elements. Provides visual breathing room.
- **Accent Color (Warm Coral)**: `oklch(0.70 0.16 30)` - Energetic highlight for achievements, correct answers, and encouraging feedback. Creates moments of celebration.
- **Success Green**: `oklch(0.65 0.15 150)` - For correct answers and positive reinforcement
- **Warning Amber**: `oklch(0.75 0.14 70)` - For hints and areas needing improvement
- **Error Red**: `oklch(0.60 0.20 25)` - For incorrect answers (softened to be instructive not harsh)

**Foreground/Background Pairings**:
- Background (Warm Cream): `oklch(0.98 0.01 85)` with Foreground (Rich Charcoal): `oklch(0.20 0.01 260)` - Ratio 13.2:1 ✓
- Primary (Deep Teal): White text `oklch(1 0 0)` - Ratio 6.8:1 ✓
- Accent (Warm Coral): White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
- Card (White): `oklch(1 0 0)` with Foreground (Rich Charcoal) - Ratio 14.1:1 ✓

## Font Selection

Typography should balance educational clarity with personality - readable for dense grammar explanations while feeling contemporary and approachable.

**Primary Font**: Space Grotesk - A geometric grotesque with technical roots that feels modern and friendly. Perfect for headings and UI elements with its distinctive character that doesn't feel corporate.

**Secondary Font**: Inter - Highly legible sans-serif designed for screens, ideal for body text, examples, and exercise content where clarity is paramount.

- **Typographic Hierarchy**:
  - **H1 (App Title)**: Space Grotesk Bold / 32px / tight letter-spacing (-0.02em)
  - **H2 (Section Headers)**: Space Grotesk SemiBold / 24px / normal spacing
  - **H3 (Grammar Rule Titles)**: Space Grotesk Medium / 20px / slight spacing
  - **Body (Explanations & Examples)**: Inter Regular / 16px / line-height 1.6
  - **Exercise Text**: Inter Medium / 18px / line-height 1.5
  - **Small Labels**: Inter Medium / 14px / uppercase tracking (0.05em)
  - **Feedback Text**: Inter SemiBold / 16px / line-height 1.5

## Animations

Animations should provide educational feedback and celebrate progress - use motion to reinforce learning outcomes and maintain engagement without distraction.

**Feedback Animations**: Gentle shake (200ms) for incorrect answers, satisfying scale bounce (300ms) for correct answers. Color transitions (250ms) when answer states change.

**Card Transitions**: Smooth slide-up entrance (400ms ease-out) for new questions, fade transitions between rule cards (300ms).

**Progress Indicators**: Animated fill for progress bars (600ms ease-in-out), confetti burst for achievement unlocks (800ms).

**Micro-interactions**: Subtle hover lift (150ms) on interactive cards, spring animation on badge unlocks, gentle pulse on streak counters.

## Component Selection

- **Components**:
  - **Card**: Primary container for grammar rules, exercises, and progress stats. Add shadow-lg and border-l-4 with category color for visual distinction.
  - **Button**: Primary actions (submit answer, next question) using accent color. Secondary for navigation (skip, review rules).
  - **Badge**: For achievement display and grammar category tags. Customize with category colors.
  - **Progress**: Visual indicator for session progress and mastery levels. Custom styling to match accent colors.
  - **Tabs**: Switch between exercise types (fill-blank, multiple choice, construction) and grammar categories.
  - **Dialog**: Display achievement unlocks, rule explanations, and onboarding tooltips.
  - **Radio Group / Checkbox**: Multiple choice questions and answer selection.
  - **Input**: Text input for fill-in-the-blank and sentence construction exercises.
  - **Accordion**: Collapsible grammar rule sections in study mode.
  - **Alert**: Encouraging feedback messages and hints.
  - **Separator**: Visual breaks between UI sections.

- **Customizations**:
  - **Grammar Rule Cards**: Custom component combining Card with category color-coding, expandable examples, and quick-reference layout.
  - **Exercise Question Card**: Specialized card with answer feedback states (neutral, correct glow, incorrect indication).
  - **Achievement Badge Component**: Custom animated badge with icon, title, and progress ring.
  - **Streak Counter**: Custom component with fire icon and animated number updates.

- **States**:
  - **Buttons**: Default (solid accent), Hover (slightly lighter with lift), Active (pressed scale), Disabled (muted with reduced opacity), Success (green on correct submission)
  - **Input Fields**: Default (neutral border), Focus (accent border with subtle glow), Error (red border with shake), Success (green border with checkmark icon)
  - **Answer Options**: Unselected (card default), Selected (accent border with colored background tint), Correct (green background with checkmark), Incorrect (red tint with X icon)
  - **Cards**: Default (white with subtle shadow), Hover (lifted shadow), Active Exercise (accent left border), Completed (muted with checkmark badge)

- **Icon Selection**:
  - **Navigation**: House (home), BookOpen (study rules), ChartBar (progress)
  - **Exercise Types**: TextAa (fill-blank), CheckCircle (multiple choice), Pencil (construction)
  - **Feedback**: CheckCircle (correct), XCircle (incorrect), Lightbulb (hint)
  - **Progress**: Trophy (achievements), Fire (streak), Target (accuracy)
  - **Categories**: Calendar (tenses), Question (questions), Article (articles), ArrowRight (prepositions)
  - **Actions**: Play (start), ArrowRight (next), ArrowLeft (previous), RotateCcw (retry)

- **Spacing**:
  - **Container Padding**: p-6 (desktop), p-4 (mobile)
  - **Card Internal**: p-6 for content, p-4 for compact cards
  - **Stack Spacing**: space-y-6 for major sections, space-y-4 for related groups, space-y-2 for tight groups
  - **Grid Gaps**: gap-6 for card grids (desktop), gap-4 (mobile)
  - **Button Spacing**: px-6 py-3 for primary, px-4 py-2 for secondary
  - **Section Margins**: mb-8 between major sections, mb-4 for subsections

- **Mobile**:
  - **Bottom Navigation**: Convert top nav to bottom sticky bar on mobile with icons + labels
  - **Single Column Layout**: Stack cards vertically, full-width on mobile
  - **Touch Targets**: Minimum 44px height for all interactive elements, increased padding on buttons
  - **Simplified Dashboard**: Collapse detailed stats into expandable sections, prioritize current streak and score
  - **Keyboard Optimization**: Ensure form inputs trigger appropriate mobile keyboards, submit on enter
  - **Reduced Motion**: Respect prefers-reduced-motion for animations
  - **Compact Typography**: H1 scales to 24px, body to 15px on screens under 640px
