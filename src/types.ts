export interface PromptState {
    format: string | null;
    targetAI: string | null;
    aesthetic: string | null;
    features: string[];
}

export type ViewState = 'landing' | 'wizard' | 'processing' | 'result';
