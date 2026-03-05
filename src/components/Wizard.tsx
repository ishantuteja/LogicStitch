import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { WizardCard } from './wizard/WizardCard';
import { ALL_WIZARD_STEPS, getRecommendedIds } from './wizard/data';
import type { PromptState } from '../types';

interface WizardProps {
    state: PromptState;
    updateState: (key: keyof PromptState, value: any) => void;
    onComplete: () => void;
    onCancel: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

/** Returns which steps are visible given the current state */
function getActiveSteps(state: PromptState) {
    // Before category is selected, only show the first step
    if (!state.category) return [ALL_WIZARD_STEPS[0]];
    return ALL_WIZARD_STEPS.filter((s) => !s.condition || s.condition(state));
}

const PATH_LABELS: Record<string, { label: string; color: string }> = {
    'software-dev': { label: '🔧 Heavy Path', color: 'bg-violet-100 text-violet-700' },
    'content-creation': { label: '✍️ Medium Path', color: 'bg-blue-100 text-blue-700' },
    'business-strategy': { label: '📊 Medium Path', color: 'bg-amber-100 text-amber-700' },
    'casual-creative': { label: '⚡ Light Path', color: 'bg-green-100 text-green-700' },
};

export function Wizard({ state, updateState, onComplete, onCancel, currentStep, setCurrentStep }: WizardProps) {
    const activeSteps = getActiveSteps(state);
    const stepConfig = activeSteps[Math.min(currentStep, activeSteps.length - 1)];
    const isLastStep = currentStep === activeSteps.length - 1;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep === 0) {
            onCancel();
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSelectOption = (optionId: string) => {
        const key = stepConfig.id as keyof PromptState;

        if (stepConfig.multiselect) {
            const currentVal = (state[key] as string[]) || [];
            const isSelected = currentVal.includes(optionId);
            updateState(key, isSelected ? currentVal.filter((id) => id !== optionId) : [...currentVal, optionId]);
        } else {
            updateState(key, optionId);
            // Auto-advance on single-select (with slight delay for visual feedback)
            // Selecting category resets step to 1 automatically
            if (stepConfig.id === 'category') {
                // Reset all category-conditional fields when changing category
                updateState('techStack', null);
                updateState('frameworks', []);
                updateState('contentPlatform', null);
                updateState('securityPrivacy', null);
                setTimeout(() => {
                    setCurrentStep(1);
                }, 450);
            } else {
                setTimeout(handleNext, 400);
            }
        }
    };

    const isOptionSelected = (optionId: string) => {
        const val = state[stepConfig.id as keyof PromptState];
        if (stepConfig.multiselect) return (val as string[]).includes(optionId);
        return val === optionId;
    };

    const recommendedIds = getRecommendedIds(stepConfig.id, state);

    const canProceed = (() => {
        if (stepConfig.type === 'textarea') return true;
        if (stepConfig.type === 'text') {
            const v = state[stepConfig.id as keyof PromptState];
            return typeof v === 'string' && (v as string).trim().length > 0;
        }
        if (stepConfig.multiselect) return (state[stepConfig.id as keyof PromptState] as string[]).length > 0;
        return state[stepConfig.id as keyof PromptState] !== null;
    })();

    const pathInfo = state.category ? PATH_LABELS[state.category] : null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">

            {/* Progress Bar */}
            <div className="w-full max-w-5xl mb-10 flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-2 flex-wrap justify-center">
                    {activeSteps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i < currentStep
                                    ? 'bg-primary-500 w-10'
                                    : i === currentStep
                                        ? 'bg-primary-500 w-14'
                                        : 'bg-slate-200 w-10'
                                }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500 font-medium">
                        Step {currentStep + 1} of {activeSteps.length}
                    </p>
                    {pathInfo && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${pathInfo.color}`}>
                            {pathInfo.label}
                        </span>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-5xl flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep + '-' + stepConfig.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col flex-1"
                    >
                        {/* Step header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                                {stepConfig.title}
                            </h2>
                            <p className="text-lg text-slate-500">{stepConfig.subtitle}</p>
                        </div>

                        {/* ── Textarea ── */}
                        {stepConfig.type === 'textarea' && (
                            <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4">
                                <textarea
                                    ref={textareaRef}
                                    rows={8}
                                    value={(state.extraContext as string) || ''}
                                    onChange={(e) => updateState('extraContext', e.target.value)}
                                    placeholder="e.g. The primary CTA must be 'Get Started Free'. The brand palette is #6C63FF and #FFFFFF. A product demo video placeholder should appear in the hero section..."
                                    className="w-full px-6 py-4 text-base border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all outline-none text-slate-900 placeholder:text-slate-400 bg-white shadow-sm resize-none leading-relaxed"
                                    autoFocus
                                />
                                <p className="mt-3 text-sm text-slate-400">
                                    This is optional — press{' '}
                                    <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-mono">
                                        Skip
                                    </kbd>{' '}
                                    to generate without extra context.
                                </p>
                            </div>
                        )}

                        {/* ── Text Input ── */}
                        {stepConfig.type === 'text' && (
                            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 mt-8">
                                <input
                                    type="text"
                                    value={(state[stepConfig.id as keyof PromptState] as string) || ''}
                                    onChange={(e) => updateState(stepConfig.id as keyof PromptState, e.target.value)}
                                    placeholder="e.g. Acme Corp Q3 Campaign"
                                    className="w-full px-6 py-4 text-xl border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all outline-none text-slate-900 placeholder:text-slate-400 bg-white shadow-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && canProceed) handleNext();
                                    }}
                                />
                                <p className="mt-4 text-sm text-slate-500">Press Enter to continue</p>
                            </div>
                        )}

                        {/* ── Card Grid ── */}
                        {stepConfig.type === 'cards' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                {stepConfig.options.map((option) => (
                                    <WizardCard
                                        key={option.id}
                                        title={option.label}
                                        imageSrc={option.image || ''}
                                        selected={isOptionSelected(option.id)}
                                        onClick={() => handleSelectOption(option.id)}
                                        multiselect={stepConfig.multiselect}
                                        isRecommended={recommendedIds.has(option.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="w-full max-w-5xl mt-10 flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 text-slate-600 font-medium rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {currentStep === 0 ? 'Home' : 'Back'}
                </button>

                <div className="flex items-center gap-3">
                    {stepConfig.type === 'textarea' && (
                        <button
                            onClick={onComplete}
                            className="px-6 py-3 text-slate-500 font-medium rounded-full hover:bg-slate-100 transition-colors"
                        >
                            Skip
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={!canProceed && stepConfig.type !== 'textarea'}
                        className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 shadow-md shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {isLastStep ? (
                            <><Sparkles className="w-5 h-5" /> Stitch Blueprint</>
                        ) : (
                            <>Next Step <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
