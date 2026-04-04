import type { PromptState } from '../types';
import { WIZARD_STEPS } from '../components/wizard/data';

function getLabel(stepId: string, optionId: string | null | undefined): string {
    if (!optionId) return '';
    const step = WIZARD_STEPS.find((s) => s.id === stepId);
    if (!step) return optionId;
    const opt = step.options.find((o) => o.id === optionId);
    return opt ? opt.label : optionId;
}

export function generatePrompt(state: PromptState): string {
    const audienceLabel = getLabel('audience', state.audience);
    const mainGoalLabel = getLabel('mainGoal', state.mainGoal);
    const vibeLabel = getLabel('vibeOrTone', state.vibeOrTone);
    const featureLabel = getLabel('keyFeature', state.keyFeature);
    const platformLabel = getLabel('contentPlatform', state.contentPlatform);
    const projectName = state.projectName?.trim() || 'My Project';

    const extra = state.extraContext?.trim()
        ? `\n## Extra Details from User\n${state.extraContext.trim()}`
        : '';

    // ── Website / App ─────────────────────────────────────────────────────────
    if (state.category === 'website-app') {
        return `# Website / App Blueprint: "${projectName}"

## What We're Building
You are an expert product designer and UI/UX developer. Create a detailed, actionable plan and design specification for a website or app idea called **"${projectName}"**.

## Who It's For
**Primary audience**: ${audienceLabel || 'General users'}
Make sure every part of the experience — language, layout, and calls to action — is perfectly tailored for this group.

## The Main Goal
**Primary objective**: ${mainGoalLabel || 'Drive engagement'}
Every design decision should serve this goal. Prioritise clarity and conversion.

## Tone & Visual Vibe
**Style**: ${vibeLabel || 'Clean and Modern'}
Apply this consistently across headlines, button labels, illustrations, and micro-copy.

## Most Important Feature
**Core feature to nail**: ${featureLabel || 'Core user experience'}
Design this feature first. Make it impossible to miss and effortless to use.

## What to Deliver
1. A clear summary of the product concept (2–3 sentences).
2. The page structure / key screens layout.
3. Suggested headlines, subheadings, and button copy.
4. A short list of "must-have" design principles for this project.
5. Any recommended tools or platforms to build it quickly (no jargon — plain English).
${extra}
`;
    }

    // ── Content / Copy ────────────────────────────────────────────────────────
    if (state.category === 'content-copy') {
        return `# Content Blueprint: "${projectName}"

## What We're Creating
You are an expert copywriter and content strategist. Write compelling, high-impact content for a project called **"${projectName}"**.

## Who It's For
**Target audience**: ${audienceLabel || 'General audience'}
Every word should speak directly to this person — use their language, reference their world.

## The Goal
**What this content needs to do**: ${mainGoalLabel || 'Inform and engage'}
Lead with value, get to the point fast, and end with a clear next step.

## Tone & Voice
**Communication style**: ${vibeLabel || 'Engaging and clear'}
Be consistent. If it's casual, stay casual. If it's bold, commit to it.

## Platform
**Where it will be published**: ${platformLabel || 'Not specified — write for general use'}
Follow all platform conventions: length, formatting, hashtags, line breaks, and hook style.

## Deliverables
1. The main content piece (full post, article, email, or script as relevant).
2. Three alternative hook/opening line options.
3. A punchy short version (for repurposing or previewing).
4. 5 relevant hashtags or SEO keywords.
${extra}
`;
    }

    // ── Business Strategy ─────────────────────────────────────────────────────
    if (state.category === 'business-strategy') {
        return `# Strategy Blueprint: "${projectName}"

## What We're Planning
You are a senior business strategist. Develop a clear, practical strategy document for a project called **"${projectName}"**.
Base every recommendation on sound reasoning. Avoid fluff — be direct and specific.

## Who This Serves
**Key stakeholders**: ${audienceLabel || 'Business team'}
Write in a way that resonates with this audience — calibrate depth and language accordingly.

## The Primary Objective
**What success looks like**: ${mainGoalLabel || 'Achieving meaningful business results'}
Keep this front and centre throughout every recommendation.

## Document Structure to Produce
1. **Summary** — the situation, the opportunity, and the recommended direction (half a page max).
2. **Context** — key facts, challenges, and assumptions.
3. **Options** — 2–3 realistic paths forward, each with pros, cons, and rough feasibility.
4. **Recommended Path** — your single clearest recommendation with rationale.
5. **Next Steps** — 3–5 specific actions with owners and suggested timelines.
${extra}
`;
    }

    // ── Just for Fun / Creative ───────────────────────────────────────────────
    return `# Creative Brief: "${projectName}"

## Let's Get Creative
You're a creative collaborator helping bring **"${projectName}"** to life.
Be imaginative, specific, and expressive. This is the fun one — don't hold back.

## The Audience
${audienceLabel ? `This is for **${audienceLabel}** — shape the energy and tone around them.` : 'This is for a broad, general audience — keep it accessible and universally enjoyable.'}

## The Goal
${mainGoalLabel ? `We want to **${mainGoalLabel.toLowerCase()}**. Let that drive every creative decision.` : 'Create something that leaves a lasting impression.'}

## What to Create
Produce the best, most creative output for this brief. Prioritise originality and delight.
Use vivid language, strong imagery, and ideas that feel fresh.
${extra}
`;
}
