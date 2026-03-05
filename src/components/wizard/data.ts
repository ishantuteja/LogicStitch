import type { PromptState, WizardStepConfig } from '../../types';

// ─── Recommendation Rules ────────────────────────────────────────────────────
export type RecommendationRule = {
    condition: (state: PromptState) => boolean;
    optionIds: string[];
};

export const RECOMMENDATION_RULES: Record<string, RecommendationRule[]> = {
    targetAudience: [
        {
            condition: (s) => s.category === 'business-strategy',
            optionIds: ['b2b-professionals'],
        },
    ],
    frameworks: [
        {
            condition: (s) => s.techStack === 'javascript',
            optionIds: ['react-nextjs'],
        },
    ],
    contentPlatform: [
        {
            // LinkedIn always recommended for reach maximisation
            condition: () => true,
            optionIds: ['linkedin'],
        },
    ],
    toneVoice: [
        {
            condition: (s) => s.category === 'content-creation',
            optionIds: ['engaging-conversational'],
        },
        {
            condition: (s) => s.category === 'business-strategy',
            optionIds: ['professional-authoritative'],
        },
    ],
    outputFormat: [
        {
            condition: (s) => s.category === 'software-dev',
            optionIds: ['markdown-code-blocks'],
        },
    ],
};

export function getRecommendedIds(stepId: string, state: PromptState): Set<string> {
    const rules = RECOMMENDATION_RULES[stepId] ?? [];
    const ids = new Set<string>();
    for (const rule of rules) {
        if (rule.condition(state)) rule.optionIds.forEach((id) => ids.add(id));
    }
    return ids;
}

// ─── Step Definitions ────────────────────────────────────────────────────────
export const ALL_WIZARD_STEPS: WizardStepConfig[] = [
    // Step 1 — Primary Category (always shown, determines path)
    {
        id: 'category',
        title: 'What are we creating today?',
        subtitle: 'Pick your primary category. This shapes every question that follows.',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'software-dev',
                label: 'Software Development',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'content-creation',
                label: 'Content Creation',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'business-strategy',
                label: 'Business Strategy',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'casual-creative',
                label: 'Casual / Creative',
                image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 2 — Target Audience (ALL paths)
    {
        id: 'targetAudience',
        title: 'Who is this for?',
        subtitle: 'Define your primary audience to tailor the output perfectly.',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'b2b-professionals',
                label: 'B2B Professionals',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'general-consumers',
                label: 'General Consumers',
                image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'developers',
                label: 'Developers / Technical',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'students-academics',
                label: 'Students / Academics',
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'creatives-artists',
                label: 'Creatives / Artists',
                image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'general-public',
                label: 'General Public',
                image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 3 — Tech Stack (Software Development only)
    {
        id: 'techStack',
        title: 'What\'s the tech stack?',
        subtitle: 'Select the primary programming language or technology.',
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'software-dev',
        options: [
            {
                id: 'javascript',
                label: 'JavaScript / TypeScript',
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'python',
                label: 'Python',
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'rust-go',
                label: 'Rust / Go',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'java-kotlin',
                label: 'Java / Kotlin',
                image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'swift',
                label: 'Swift (iOS)',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'sql-data',
                label: 'SQL / Data Engineering',
                image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 4 — Frameworks (Software Development only)
    {
        id: 'frameworks',
        title: 'Which frameworks?',
        subtitle: 'Select all that apply to your project.',
        type: 'cards',
        multiselect: true,
        condition: (s) => s.category === 'software-dev',
        options: [
            {
                id: 'react-nextjs',
                label: 'React / Next.js',
                image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'vue-nuxt',
                label: 'Vue / Nuxt',
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'nodejs-express',
                label: 'Node.js / Express',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'fastapi-django',
                label: 'FastAPI / Django',
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'supabase-firebase',
                label: 'Supabase / Firebase',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'react-native',
                label: 'React Native / Expo',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 5 — Content Platform (Content Creation only)
    {
        id: 'contentPlatform',
        title: 'Where will this be published?',
        subtitle: 'Choose the primary platform for your content.',
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'content-creation',
        options: [
            {
                id: 'linkedin',
                label: 'LinkedIn',
                image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'twitter-x',
                label: 'Twitter / X',
                image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'instagram',
                label: 'Instagram',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'youtube',
                label: 'YouTube',
                image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'blog-newsletter',
                label: 'Blog / Newsletter',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'podcast',
                label: 'Podcast',
                image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 6 — Security & Data Privacy (Software Dev OR Business Strategy)
    {
        id: 'securityPrivacy',
        title: 'Security & data requirements?',
        subtitle: 'Define the security posture and data handling expectations.',
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'software-dev' || s.category === 'business-strategy',
        options: [
            {
                id: 'enterprise-grade',
                label: 'Enterprise-grade (SOC2 / ISO 27001)',
                image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'gdpr-compliant',
                label: 'GDPR / CCPA Compliant',
                image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'basic-auth',
                label: 'Basic Auth & Encryption',
                image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'open-public',
                label: 'Open / Public Data',
                image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 7 — Tone & Voice (ALL paths)
    {
        id: 'toneVoice',
        title: 'What\'s the tone?',
        subtitle: 'Choose the voice and style for the AI\'s output.',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'professional-authoritative',
                label: 'Professional & Authoritative',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'engaging-conversational',
                label: 'Engaging & Conversational',
                image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'technical-precise',
                label: 'Technical & Precise',
                image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'creative-expressive',
                label: 'Creative & Expressive',
                image: 'https://images.unsplash.com/photo-1534080534278-f09bc119b5b2?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'concise-direct',
                label: 'Concise & Direct',
                image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 8 — Output Format (ALL paths)
    {
        id: 'outputFormat',
        title: 'How should the output be formatted?',
        subtitle: 'Specify how you want the AI to structure its response.',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'markdown-code-blocks',
                label: 'Markdown with Code Blocks',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'structured-report',
                label: 'Structured Report (Headings, Tables)',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'plain-text',
                label: 'Plain Prose / Narrative',
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'bullet-points',
                label: 'Bullet Points & Lists',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'step-by-step',
                label: 'Step-by-Step Instructions',
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 9 — Project Name (ALL paths — needed for Supabase label)
    {
        id: 'projectName',
        title: 'Give this project a name.',
        subtitle: 'This label helps you find it in your Dashboard later.',
        type: 'text',
        multiselect: false,
        options: [],
    },

    // Step 10 — Extra Context (ALWAYS last)
    {
        id: 'extraContext',
        title: 'Any extra context?',
        subtitle: 'Optional: Add specific instructions, constraints, or details the AI must follow.',
        type: 'textarea',
        multiselect: false,
        options: [],
    },
];

// For promptGenerator – flat option lookup across all steps
export const WIZARD_STEPS = ALL_WIZARD_STEPS;
