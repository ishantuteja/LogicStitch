// ─── Core Prompt State ───────────────────────────────────────────────────────
export interface PromptState {
    // Step 1 – always
    category: string | null; // 'software-dev' | 'content-creation' | 'business-strategy' | 'casual-creative'
    // Step 2 – all paths
    targetAudience: string | null;
    // Step 3 – software-dev only
    techStack: string | null;
    // Step 4 – software-dev only
    frameworks: string[];
    // Step 5 – content-creation only
    contentPlatform: string | null;
    // Step 6 – software-dev | business-strategy
    securityPrivacy: string | null;
    // Step 7 – all paths
    toneVoice: string | null;
    // Step 8 – all paths
    outputFormat: string | null;
    // Step 9 – all paths (label for saved_prompts)
    projectName: string;
    // Step 10 – always last
    extraContext: string;
}

// ─── View & Wizard Config Types ──────────────────────────────────────────────
export type ViewState = 'landing' | 'wizard' | 'processing' | 'result';

export interface WizardOption {
    id: string;
    label: string;
    image?: string;
}

export interface WizardStepConfig {
    id: string;
    title: string;
    subtitle: string;
    type: 'cards' | 'text' | 'textarea';
    multiselect: boolean;
    /** If present, step is only shown when this returns true */
    condition?: (state: PromptState) => boolean;
    options: WizardOption[];
}
