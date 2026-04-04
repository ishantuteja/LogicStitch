export interface PromptState {
    category: string | null;         // Step 1 — always
    audience: string | null;         // Step 2 — all paths
    mainGoal: string | null;         // Step 3 — all paths
    vibeOrTone: string | null;       // Step 4 — website-app OR content-copy
    keyFeature: string | null;       // Step 5 — website-app only
    contentPlatform: string | null;  // Step 6 — content-copy only
    projectName: string;             // Step 7 — all paths
    extraContext: string;            // Step 8 — always last
}

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
    condition?: (state: PromptState) => boolean;
    options: WizardOption[];
}
