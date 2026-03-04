export interface PromptState {
    format: string | null;
    targetAI: string | null;
    aesthetic: string | null;
    targetAudience: string | null;
    features: string[];
    contentStrategy: string | null;
    projectName: string;
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
    type: 'cards' | 'text';
    multiselect: boolean;
    options: WizardOption[];
}

