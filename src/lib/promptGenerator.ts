import type { PromptState } from '../types';
import { WIZARD_STEPS } from '../components/wizard/data';

function getLabel(stepId: string, optionId: string | null | undefined): string {
    if (!optionId) return '';
    const step = WIZARD_STEPS.find((s) => s.id === stepId);
    if (!step) return optionId;
    const option = step.options.find((o) => o.id === optionId);
    return option ? option.label : optionId;
}

function getLabels(stepId: string, optionIds: string[]): string[] {
    const step = WIZARD_STEPS.find((s) => s.id === stepId);
    if (!step) return optionIds;
    return optionIds.map((id) => {
        const option = step.options.find((o) => o.id === id);
        return option ? option.label : id;
    });
}

export function generatePrompt(state: PromptState): string {
    const categoryLabel = getLabel('category', state.category);
    const audienceLabel = getLabel('targetAudience', state.targetAudience);
    const toneLabel = getLabel('toneVoice', state.toneVoice);
    const outputLabel = getLabel('outputFormat', state.outputFormat);
    const projectName = state.projectName?.trim() || 'My Project';
    const techLabel = getLabel('techStack', state.techStack);
    const frameworkLabels = getLabels('frameworks', state.frameworks ?? []);
    const platformLabel = getLabel('contentPlatform', state.contentPlatform);
    const securityLabel = getLabel('securityPrivacy', state.securityPrivacy);

    const extraSection = state.extraContext?.trim()
        ? `\n## [Additional Context from User]\n${state.extraContext.trim()}`
        : '';

    // ── Software Development ──────────────────────────────────────────────────
    if (state.category === 'software-dev') {
        return `# Master Engineering Blueprint: ${projectName}

## [Project Overview]
You are an expert Full-Stack Engineer and Software Architect. Your task is to produce a comprehensive, production-ready implementation plan and code structure for a **${categoryLabel}** project named **"${projectName}"**.
Do not hallucinate libraries. Stick to the specified stack and best practices.

## [Target Audience]
This system is designed for: **${audienceLabel || 'developers/technical users'}**.
Ensure all interfaces, error messages, and documentation are calibrated for this audience.

## [Tech Stack]
- **Primary Language**: ${techLabel || 'Not specified — infer from context'}
${frameworkLabels.length > 0 ? `- **Frameworks / Libraries**: ${frameworkLabels.join(', ')}` : '- **Frameworks**: Choose widely adopted, well-maintained options for the above language.'}

## [Security & Data Privacy]
- **Security Posture**: ${securityLabel || 'Standard best practices'}
- Enforce input validation, parameterized queries, and principle of least privilege throughout.
- Specify any auth provider (e.g., Supabase Auth, NextAuth, Passport.js) and token lifecycle management.

## [Tone & Output Format]
- **Tone**: ${toneLabel || 'Technical & Precise'}
- **Output Format**: ${outputLabel || 'Markdown with code blocks'}
- Use rich Markdown, fenced code blocks, and architecture diagrams where applicable.

## [Execution Steps]
1. Provide a brief architectural summary and tech decisions rationale.
2. Output the recommended folder structure.
3. Supply all core configuration files (package.json, tsconfig, tailwind.config, etc.).
4. Implement core entry point and layout components.
5. Build out the primary features with clean, commented code.
6. List edge cases, error handling strategies, and optimization notes.
${extraSection}
`;
    }

    // ── Content Creation ──────────────────────────────────────────────────────
    if (state.category === 'content-creation') {
        return `# Master Content Blueprint: ${projectName}

## [Content Overview]
You are an expert Content Strategist and Copywriter. Your task is to create compelling, high-impact content for **"${projectName}"**.
The content must be tailored to the platform, audience, and tone defined below.

## [Target Audience]
- **Primary Audience**: ${audienceLabel || 'General audience'}
- Calibrate vocabulary, complexity, hook style, and CTA language to perfectly fit this audience.

## [Platform & Distribution]
- **Primary Platform**: ${platformLabel || 'Not specified'}
- Follow platform-specific best practices (character limits, formatting, hashtag strategy, posting cadence).

## [Tone & Voice]
- **Voice**: ${toneLabel || 'Engaging & Conversational'}
- Every sentence should feel intentional. Avoid fluff. Lead with value.

## [Output Format]
- **Format**: ${outputLabel || 'Structured with headings'}
- Include: hook, body, CTA, and any platform-specific elements (e.g., LinkedIn carousel slides, Twitter thread structure).

## [Deliverables]
1. A primary content piece (full post / article / script as applicable).
2. 3 headline/hook variations for A/B testing.
3. A short-form version (suitable for repurposing).
4. Suggested hashtags or SEO keywords.
${extraSection}
`;
    }

    // ── Business Strategy ─────────────────────────────────────────────────────
    if (state.category === 'business-strategy') {
        return `# Master Strategy Blueprint: ${projectName}

## [Strategic Overview]
You are a Senior Business Strategist and Management Consultant. Your task is to develop a clear, actionable strategy document for **"${projectName}"**.
Ground all recommendations in data and logical frameworks. Avoid vague platitudes.

## [Target Audience]
- **Decision-Makers**: ${audienceLabel || 'Business stakeholders'}
- Tailor language and depth to this audience's level of domain expertise.

## [Security & Compliance Requirements]
- **Data Governance**: ${securityLabel || 'Standard compliance'}
- Identify risk surface areas and recommend mitigation strategies within the strategic plan.

## [Tone & Voice]
- **Communication Style**: ${toneLabel || 'Professional & Authoritative'}
- Be direct, use precise business language, and support all assertions with rationale.

## [Output Format]
- **Document Format**: ${outputLabel || 'Structured Report (Headings, Tables)'}
- Use executive summary, supporting sections, tables for comparisons, and a clear action plan.

## [Document Structure]
1. **Executive Summary** — problem, opportunity, and recommended course of action.
2. **Situation Analysis** — market, competitive landscape, internal strengths/weaknesses.
3. **Strategic Options** — 2–3 viable options with pros, cons, and risk assessment.
4. **Recommended Strategy** — rationale, KPIs, and success metrics.
5. **Action Plan** — milestones, owners, and timeline.
${extraSection}
`;
    }

    // ── Casual / Creative ─────────────────────────────────────────────────────
    return `# Creative Blueprint: ${projectName}

## [Overview]
You are a creative collaborator helping with **"${projectName}"** — a ${categoryLabel} project.
Be imaginative, responsive, and helpful. Match the energy of the prompt.

## [Audience]
${audienceLabel ? `This is aimed at: **${audienceLabel}**.` : 'Tailor the output to a broad, general audience.'}

## [Tone & Voice]
- **Style**: ${toneLabel || 'Creative & Expressive'}
- Let ideas breathe. Use vivid language and concrete examples.

## [Output Format]
- **Format**: ${outputLabel || 'Plain prose / narrative'}

## [Deliverables]
Generate the best creative output for this project. Prioritize originality, clarity, and engagement.
${extraSection}
`;
}
