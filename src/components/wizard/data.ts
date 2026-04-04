import type { PromptState, WizardStepConfig } from '../../types';

// ─── Recommendation Rules ────────────────────────────────────────────────────
export type RecommendationRule = {
    condition: (state: PromptState) => boolean;
    optionIds: string[];
};

export const RECOMMENDATION_RULES: Record<string, RecommendationRule[]> = {
    audience: [
        {
            condition: (s) => s.category === 'business-strategy',
            optionIds: ['b2b-professionals'],
        },
    ],
    mainGoal: [
        {
            condition: (s) => s.category === 'website-app',
            optionIds: ['get-sales-leads'],
        },
    ],
    keyFeature: [
        {
            condition: () => true,
            optionIds: ['collect-emails'],
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

// ─── Path labels ─────────────────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
    'website-app': { label: '🌐 Website / App', color: 'bg-violet-500/20 text-violet-300' },
    'content-copy': { label: '✍️ Content', color: 'bg-blue-500/20 text-blue-300' },
    'business-strategy': { label: '📊 Strategy', color: 'bg-amber-500/20 text-amber-300' },
    'just-fun': { label: '🎨 Creative', color: 'bg-green-500/20 text-green-300' },
};

// ─── Step definitions ─────────────────────────────────────────────────────────
export const ALL_WIZARD_STEPS: WizardStepConfig[] = [
    // Step 1 — Primary Category (always, determines path)
    {
        id: 'category',
        title: 'What are you trying to do today?',
        subtitle: "Pick the one that fits best — we'll ask the right questions from there.",
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'website-app',
                label: 'Create a Website or App Idea',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'content-copy',
                label: 'Write Content or Copy',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'business-strategy',
                label: 'Plan a Business Strategy',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'just-fun',
                label: 'Just for Fun / Creative',
                image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 2 — Audience (ALL paths)
    {
        id: 'audience',
        title: 'Who is this for?',
        subtitle: 'Knowing your audience helps us write the perfect prompt.',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'general-public',
                label: 'General Public',
                image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'b2b-professionals',
                label: 'Business Professionals (B2B)',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'students-teens',
                label: 'Students / Teens',
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'internal-team',
                label: 'Internal Team',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 3 — Main Goal (ALL paths)
    {
        id: 'mainGoal',
        title: 'What is the main goal?',
        subtitle: 'What should this actually achieve?',
        type: 'cards',
        multiselect: false,
        options: [
            {
                id: 'get-sales-leads',
                label: 'Get more sales / leads',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'share-information',
                label: 'Share information',
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'entertain',
                label: 'Entertain people',
                image: 'https://images.unsplash.com/photo-1534080534278-f09bc119b5b2?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'organize-work',
                label: 'Organize my work',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 4 — Vibe / Tone (website-app OR content-copy only)
    {
        id: 'vibeOrTone',
        title: 'What kind of vibe should it have?',
        subtitle: 'Pick the tone that fits your brand or message.',
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'website-app' || s.category === 'content-copy',
        options: [
            {
                id: 'friendly-casual',
                label: 'Friendly & Casual',
                image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'professional-serious',
                label: 'Professional & Serious',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'exciting-bold',
                label: 'Exciting & Bold',
                image: 'https://images.unsplash.com/photo-1542831371-32f555c86880?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'simple-direct',
                label: 'Simple & Direct',
                image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 5 — Key Feature (website-app only)
    {
        id: 'keyFeature',
        title: 'What\'s the most important feature?',
        subtitle: "What's the most important feature?",
        // subtitle field fixed
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'website-app',
        options: [
            {
                id: 'collect-emails',
                label: 'Collecting Emails / Signups',
                image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'show-portfolio',
                label: 'Showing a Portfolio',
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'sell-product',
                label: 'Selling a Product',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'user-login-profiles',
                label: 'User Login & Profiles',
                image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 6 — Content Platform (content-copy only)
    {
        id: 'contentPlatform',
        title: 'Where will people see this?',
        subtitle: "Where will people see this? We'll format the output to fit that platform perfectly.",
        type: 'cards',
        multiselect: false,
        condition: (s) => s.category === 'content-copy',
        options: [
            {
                id: 'instagram-tiktok',
                label: 'Instagram / TikTok',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'linkedin',
                label: 'LinkedIn',
                image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'blog-website',
                label: 'Blog / Website',
                image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300',
            },
            {
                id: 'email-newsletter',
                label: 'Email Newsletter',
                image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=400&h=300',
            },
        ],
    },

    // Step 7 — Project Name (ALL paths — used as Supabase label)
    {
        id: 'projectName',
        title: 'Give it a quick name.',
        subtitle: 'Just a label so you can find it later in your Dashboard.',
        type: 'text',
        multiselect: false,
        options: [],
    },

    // Step 8 — Extra Context (ALWAYS last)
    {
        id: 'extraContext',
        title: 'Any extra details we should know?',
        subtitle: 'Optional — throw in anything specific. The more detail, the better the prompt.',
        type: 'textarea',
        multiselect: false,
        options: [],
    },
];

export const WIZARD_STEPS = ALL_WIZARD_STEPS;
