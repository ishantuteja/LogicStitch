import type { PromptState } from '../types';
import { WIZARD_STEPS } from '../components/wizard/data';

function getLabel(stepId: string, optionId: string | null): string {
    if (!optionId) return '';
    const step = WIZARD_STEPS.find(s => s.id === stepId);
    if (!step) return optionId;
    const option = step.options.find(o => o.id === optionId);
    return option ? option.label : optionId;
}

function getLabels(stepId: string, optionIds: string[]): string[] {
    const step = WIZARD_STEPS.find(s => s.id === stepId);
    if (!step) return optionIds;
    return optionIds.map(id => {
        const option = step.options.find(o => o.id === id);
        return option ? option.label : id;
    });
}

function getTargetAIRules(targetAI: string | null): string {
    switch (targetAI) {
        case 'midjourney':
            return `### Target AI Rules (Midjourney)
- **Constraint Level**: Heavy visual focus, aspect ratios, lighting parameters, camera definitions.
- **Modifiers**: Use specific stylistic keywords (e.g., 8k, photorealistic, octane render, vivid colors, depth of field).
- **Format**: Comma-separated descriptors prioritizing main subject, environment, lighting, and camera.
- **Avoid**: Text rules or logic interactions, as they are not understood.`;

        case 'lovable':
        case 'bolt':
        case 'v0dev':
            return `### Target AI Rules (${targetAI === 'lovable' ? 'Lovable' : targetAI === 'bolt' ? 'Bolt' : 'v0.dev'})
- **Component Breakdown**: Output must be structured in modular, reusable components.
- **Tech Stack Enforced**: React (TypeScript) + Tailwind CSS + Lucide Icons.
- **Styling Specs**: Use Tailwind utility classes for layout, spacing, and typography.
- **State Management**: Assume a functional React architecture using hooks (useState, useEffect) for interactions.
- **Interactivity**: Include micro-animations or hover states where appropriate (e.g., using Framer Motion concepts).`;

        case 'cursor':
            return `### Target AI Rules (Cursor)
- **Context Injection**: Treat this prompt as a direct rule set for the \`@workspace\` or active file context.
- **Actionable Steps**: Provide step-by-step diff-friendly instructions for file creation and modification.
- **Code Standards**: Maintain strict TypeScript typing, ESLint compliance, and modern ES6+ paradigms.
- **Refactoring Guardrails**: Ensure new logic seamlessly integrates without breaking existing file structures.`;

        case 'claude':
        case 'chatgpt':
        case 'gemini':
        default:
            return `### Target AI Rules (${getLabel('targetAI', targetAI)})
- **Tone**: Professional, highly analytical, and structurally comprehensive.
- **Architecture**: Provide high-level folder structures and system design thinking before diving into code snippets.
- **Exhaustiveness**: Output should be extremely detailed, covering edge cases, potential failure points, and optimization strategies.
- **Format**: Use rich Markdown, including code blocks, tables, and nested lists for readability.`;
    }
}

function getAestheticRules(aesthetic: string | null): string {
    switch (aesthetic) {
        case 'minimalist':
            return `Extensive whitespace, primary monochrome palette with one stark accent color, sans-serif typography (e.g., Inter), no borders, soft/no shadows.`;
        case 'corporate':
            return `Trust-inspiring blues and grays, highly structured grid layouts, legible serif or standard sans-serif fonts, sharp corners, data-centric interface.`;
        case 'playful':
            return `Vibrant, contrasting pastel or neon colors, rounded corners (large border-radius), bouncy animations, playful typography, embedded illustrations.`;
        case 'glassmorphism':
            return `Frosted glass effects (backdrop-blur), semi-transparent white/dark surfaces, colorful gradient backgrounds, subtle light borders, floating UI elements.`;
        case 'cyberpunk':
            return `Strict dark mode, neon pink/cyan/yellow accents, glitch effects, monospaced typography, sharp aggressive angles, high contrast.`;
        case 'neo-brutalism':
            return `Harsh outlines (stark black borders), overlapping unaligned elements, high-saturation solid colors (yellow, blue, red), retro UI patterns, shadow offsets without blur.`;
        default:
            return `Clean, modern, accessible design with standard spacing and legible contrast ratios.`;
    }
}

export function generatePrompt(state: PromptState): string {
    const formatLabel = getLabel('format', state.format);
    const aestheticLabel = getLabel('aesthetic', state.aesthetic);
    const audienceLabel = getLabel('targetAudience', state.targetAudience);
    const contentLabel = getLabel('contentStrategy', state.contentStrategy);
    const projectName = state.projectName ? state.projectName : 'My Project';
    const featureLabels = getLabels('features', state.features);

    const isVisualOnly = state.targetAI === 'midjourney';

    if (isVisualOnly) {
        return `# Master Image Generation Prompt: ${projectName} (${formatLabel})

## [Project Overview]
You are a master AI image generator. Please create a highly detailed, professional UI/UX design mockup for a **${formatLabel}** named **${projectName}**. 
This is not a real application, but a conceptual design to be used for inspiration and client presentation.

## [Target Audience & Content Tone]
- **Target Audience**: ${audienceLabel || 'General'}
- **Content Vibe**: ${contentLabel !== 'None - I have my own' ? contentLabel : 'Use lorem ipsum but make it look realistic'}

## [Target AI Rules]
${getTargetAIRules(state.targetAI)}

## [Aesthetic & Layout]
- **Core Aesthetic**: ${aestheticLabel}
- **Visual Description**: ${getAestheticRules(state.aesthetic)}
- **Composition**: Symmetrical layout focus, showcasing a modern interface.
- **Features to Depict**: ${featureLabels.length > 0 ? featureLabels.join(', ') : 'Standard interface elements'}.
- **Rendering Parameters**: UI/UX design, dribbble style, behance, unsplash, 8k resolution, photorealistic rendering, soft studio lighting, high contrast, clean vector style, --ar 16:9 --v 5.2

## [Functional Requirements]
*(Not applicable for pure image generation, represent the following as visual dummy data only)*
- Show states indicating active user sessions or authentication.
- Display mock graphs, analytical charts, or payment success modals where relevant.
`;
    }

    return `# Master System Blueprint: ${projectName} (${formatLabel})

## [Project Overview]
You are an expert Full-Stack Engineer, UI/UX Designer, and Product Architect. Your task is to build a production-ready **${formatLabel}** named **${projectName}**.
The objective is to synthesize a perfectly structured, accessible, and performant application based on the constraints and requirements outlined below.
Do not hallucinate unnecessary dependencies. Stick strictly to the defined tech stack and aesthetic guidelines.

## [Target Audience & Content Tone]
- **Target Audience**: Ensure the UX, language, and complexity level are perfectly tailored for **${audienceLabel || 'a general audience'}**.
- **Content Strategy**: ${contentLabel !== 'None - I have my own' ? `Generate placeholder copy that is ${contentLabel}.` : 'Leave placeholders blank or use standard Lorem Ipsum as I will provide my own content.'}

## [Target AI Rules]
${getTargetAIRules(state.targetAI)}

## [Aesthetic & Layout]
- **Visual Identity**: ${aestheticLabel}
- **Styling Execution**: ${getAestheticRules(state.aesthetic)}
- **UI Architecture**: Mobile-first responsive design. Rely heavily on Flexbox and CSS Grid.
- **Accessibility**: Enforce WCAG AA standard contrast ratios, inclusive ARIA labels, and logical focus management.
- **Motion/UX**: Implement state changes (hover, active, focus) with smooth transitions (e.g., 200ms ease-in-out).

## [Functional Requirements]
The system must actively include and implement the following core capabilities:
${featureLabels.length > 0 ? featureLabels.map(f => `- **${f}**: Implement requisite frontend UI, mock API service layers, and state tracking necessary for this feature.`).join('\n') : '- Implement standard CRUD state behaviors for the core objects.'}

### Specific Data Models & State
- Establish a global state management pattern (Context API, Zustand, etc.) for the overarching user session.
- Normalize relational or complex data to ensure fast renders.
- Provide mock JSON structures if database integration is required.

### Next Steps for Execution
1. Acknowledge this blueprint and provide a brief architectural summary.
2. Output the folder structure.
3. Provide the core configuration files (package.json, tailwind.config, etc).
4. Supply the core entry point and layout components.
5. Provide the implementation for the core features specified.
`;
}
