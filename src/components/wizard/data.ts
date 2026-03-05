import type { PromptState } from '../../types';

// ─── Path classification ────────────────────────────────────────────────────
// Short path: simpler, visual, or content-only formats (4 total steps)
export const SHORT_PATH_FORMATS = new Set([
    'landing-page', 'portfolio', 'blog', 'newsletter',
    'social-media', 'pitch-deck', 'logo-brand',
]);

// Full path: complex, feature-rich technical formats (8 total steps)
export const FULL_PATH_FORMATS = new Set([
    'saas-dashboard', 'mobile-app', 'ecommerce', 'ai-chatbot',
    'admin-tool', 'data-dashboard', 'course-ui', 'api-blueprint',
]);

export function getWizardPath(format: string | null): 'short' | 'full' {
    if (format && SHORT_PATH_FORMATS.has(format)) return 'short';
    return 'full';
}

// ─── Recommendation rules ───────────────────────────────────────────────────
// Maps stepId → list of rules. Each rule: if condition(state) is true, badge those optionIds.
export type RecommendationRule = {
    condition: (state: PromptState) => boolean;
    optionIds: string[];
};

export const RECOMMENDATION_RULES: Record<string, RecommendationRule[]> = {
    targetAI: [
        {
            condition: (s) => s.format === 'logo-brand' || s.format === 'social-media',
            optionIds: ['midjourney'],
        },
        {
            condition: (s) => s.format === 'saas-dashboard' || s.format === 'admin-tool',
            optionIds: ['lovable'],
        },
        {
            condition: (s) => s.format === 'api-blueprint' || s.format === 'ai-chatbot',
            optionIds: ['cursor'],
        },
    ],
    aesthetic: [
        {
            condition: (s) => s.format === 'api-blueprint' || s.format === 'data-dashboard',
            optionIds: ['minimalist'],
        },
        {
            condition: (s) => s.format === 'saas-dashboard' || s.format === 'admin-tool',
            optionIds: ['corporate'],
        },
    ],
    contentStrategy: [
        {
            condition: (s) => s.aesthetic === 'corporate',
            optionIds: ['professional'],
        },
        {
            condition: (s) => s.format === 'api-blueprint' || s.targetAudience === 'developers',
            optionIds: ['technical'],
        },
    ],
};

// ─── AI recommendation map (for targetAI step badge) ───────────────────────
export const AI_RECOMMENDATION_MAP: Record<string, string> = {
    'landing-page': 'v0dev',
    'saas-dashboard': 'lovable',
    'mobile-app': 'claude',
    'portfolio': 'v0dev',
    'ecommerce': 'bolt',
    'blog': 'chatgpt',
    'pitch-deck': 'claude',
    'logo-brand': 'midjourney',
    'ai-chatbot': 'cursor',
    'admin-tool': 'lovable',
    'newsletter': 'chatgpt',
    'data-dashboard': 'claude',
    'course-ui': 'v0dev',
    'social-media': 'midjourney',
    'api-blueprint': 'claude',
};

// ─── Step definitions ────────────────────────────────────────────────────────
// path: undefined = appears on ALL paths; 'full' = full path only; 'short' = short path only

import type { WizardStepConfig } from '../../types';

export const ALL_WIZARD_STEPS: WizardStepConfig[] = [
    // Step 1 — always shown first
    {
        id: 'format',
        title: 'What are we building?',
        subtitle: 'Select the primary format or structure of your project.',
        type: 'cards',
        multiselect: false,
        path: undefined,
        options: [
            { id: 'landing-page', label: 'Landing Page', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'saas-dashboard', label: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'mobile-app', label: 'Mobile App UI', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'portfolio', label: 'Personal Portfolio', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'ecommerce', label: 'E-commerce Store', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'blog', label: 'Blog/Content Platform', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'pitch-deck', label: 'Pitch Deck/Presentation', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'logo-brand', label: 'Logo & Brand Identity', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'ai-chatbot', label: 'AI Chatbot Interface', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'admin-tool', label: 'Internal Admin Tool', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'newsletter', label: 'Newsletter Template', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'data-dashboard', label: 'Data Analytics Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'course-ui', label: 'Educational Course UI', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'social-media', label: 'Social Media Campaign', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'api-blueprint', label: 'API Architecture Blueprint', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 2 — all paths
    {
        id: 'targetAI',
        title: 'Which AI are we commanding?',
        subtitle: 'Select the intelligence that will execute your prompt.',
        type: 'cards',
        multiselect: false,
        path: undefined,
        options: [
            { id: 'chatgpt', label: 'ChatGPT', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'claude', label: 'Claude', image: 'https://images.unsplash.com/photo-1691425261314-e0b6edef2b89?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'gemini', label: 'Gemini', image: 'https://images.unsplash.com/photo-1682346764491-9e7ec27e2a96?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'midjourney', label: 'Midjourney', image: 'https://images.unsplash.com/photo-1686191553077-2feaddbcf29b?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'lovable', label: 'Lovable', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'bolt', label: 'Bolt', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'v0dev', label: 'v0.dev', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'cursor', label: 'Cursor', image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 3 — all paths
    {
        id: 'aesthetic',
        title: 'Choose your visual vibe.',
        subtitle: 'What aesthetic defines the look and feel?',
        type: 'cards',
        multiselect: false,
        path: undefined,
        options: [
            { id: 'minimalist', label: 'Minimalist', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'corporate', label: 'Corporate', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'playful', label: 'Playful', image: 'https://images.unsplash.com/photo-1534080534278-f09bc119b5b2?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'glassmorphism', label: 'Glassmorphism', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'cyberpunk', label: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1542831371-32f555c86880?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'neo-brutalism', label: 'Neo-brutalism', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'dark-mode', label: 'Dark Mode', image: 'https://images.unsplash.com/photo-1555516086-63e26bb2d354?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'elegant', label: 'Elegant', image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'retro', label: 'Retro', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'material-design', label: 'Material Design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 4 — full path only
    {
        id: 'targetAudience',
        title: 'Who is this for?',
        subtitle: 'Select the primary target audience.',
        type: 'cards',
        multiselect: false,
        path: 'full',
        options: [
            { id: 'developers', label: 'Developers/Technical', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'general-public', label: 'General Public', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'kids-teens', label: 'Kids/Teens', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'b2b', label: 'B2B/Enterprise', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'creatives', label: 'Creatives/Artists', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'academics', label: 'Academics', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 5 — full path only
    {
        id: 'features',
        title: 'What does it need to do?',
        subtitle: 'Select all the core features required for this project.',
        type: 'cards',
        multiselect: true,
        path: 'full',
        options: [
            { id: 'user-auth', label: 'User Auth', image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'relational-db', label: 'Relational Database', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'payment', label: 'Payment Gateway', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'charts', label: 'Dynamic Charts', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'seo', label: 'SEO Optimization', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'push-notifications', label: 'Push Notifications', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'file-uploads', label: 'File Uploads', image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'real-time-chat', label: 'Real-time Chat', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'search-filter', label: 'Search/Filter', image: 'https://images.unsplash.com/photo-1588702545922-e4291880fb48?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'api-integrations', label: 'API Integrations', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 6 — full path only
    {
        id: 'contentStrategy',
        title: 'Content Strategy',
        subtitle: 'What kind of copy/content do you need generated?',
        type: 'cards',
        multiselect: false,
        path: 'full',
        options: [
            { id: 'professional', label: 'Professional & Persuasive', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'casual', label: 'Casual & Conversational', image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'technical', label: 'Technical & Detailed', image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'short', label: 'Short & Punchy', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'none', label: 'None - I have my own', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=400&h=300' },
        ],
    },
    // Step 7 — full path only
    {
        id: 'projectName',
        title: 'Final Details',
        subtitle: 'What is the name of this project/website?',
        type: 'text',
        multiselect: false,
        path: 'full',
        options: [],
    },
    // Step 8 — ALL paths, always last
    {
        id: 'extraContext',
        title: 'Any extra context?',
        subtitle: 'Optional: Add anything else the AI should know.',
        type: 'textarea',
        multiselect: false,
        path: undefined,
        options: [],
    },
];

// For backward compatibility with promptGenerator.ts (getLabel / getLabels helpers)
export const WIZARD_STEPS = ALL_WIZARD_STEPS;
