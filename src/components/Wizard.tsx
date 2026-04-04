import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { WizardCard } from './wizard/WizardCard';
import { ALL_WIZARD_STEPS, getRecommendedIds, CATEGORY_LABELS } from './wizard/data';
import type { PromptState } from '../types';

interface WizardProps {
    state: PromptState;
    updateState: (key: keyof PromptState, value: any) => void;
    onComplete: () => void;
    onCancel: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

function getActiveSteps(state: PromptState) {
    if (!state.category) return [ALL_WIZARD_STEPS[0]];
    return ALL_WIZARD_STEPS.filter((s) => !s.condition || s.condition(state));
}

export function Wizard({ state, updateState, onComplete, onCancel, currentStep, setCurrentStep }: WizardProps) {
    const activeSteps = getActiveSteps(state);
    const stepConfig = activeSteps[Math.min(currentStep, activeSteps.length - 1)];
    const isLastStep = currentStep === activeSteps.length - 1;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleNext = () => {
        if (isLastStep) onComplete();
        else setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep === 0) onCancel();
        else setCurrentStep(currentStep - 1);
    };

    const handleSelectOption = (optionId: string) => {
        const key = stepConfig.id as keyof PromptState;
        if (stepConfig.multiselect) {
            const currentVal = (state[key] as unknown as string[]) || [];
            const isSelected = currentVal.includes(optionId);
            updateState(key, isSelected ? currentVal.filter((id) => id !== optionId) : [...currentVal, optionId]);
        } else {
            updateState(key, optionId);
            if (stepConfig.id === 'category') {
                // Reset conditional fields when category changes
                updateState('vibeOrTone', null);
                updateState('keyFeature', null);
                updateState('contentPlatform', null);
                setTimeout(() => setCurrentStep(1), 420);
            } else {
                setTimeout(handleNext, 380);
            }
        }
    };

    const isOptionSelected = (optionId: string) => {
        const val = state[stepConfig.id as keyof PromptState];
        if (stepConfig.multiselect) return (val as unknown as string[]).includes(optionId);
        return val === optionId;
    };

    const recommendedIds = getRecommendedIds(stepConfig.id, state);

    const canProceed = (() => {
        if (stepConfig.type === 'textarea') return true;
        if (stepConfig.type === 'text') {
            const v = state[stepConfig.id as keyof PromptState];
            return typeof v === 'string' && (v as string).trim().length > 0;
        }
        return state[stepConfig.id as keyof PromptState] !== null;
    })();

    const pathInfo = state.category ? CATEGORY_LABELS[state.category] : null;

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">

            {/* Progress */}
            <div className="w-full max-w-5xl mb-10 flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-2 flex-wrap justify-center">
                    {activeSteps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i < currentStep
                                ? 'bg-primary-500 w-10 shadow-sm shadow-primary-500/40'
                                : i === currentStep
                                    ? 'bg-primary-400 w-14 shadow-md shadow-primary-400/50'
                                    : 'bg-white/10 w-10'
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

            {/* Content */}
            <div className="w-full max-w-5xl flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep + '-' + stepConfig.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28 }}
                        className="flex flex-col flex-1"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                                {stepConfig.title}
                            </h2>
                            <p className="text-lg text-slate-400">{stepConfig.subtitle}</p>
                        </div>

                        {/* Textarea */}
                        {stepConfig.type === 'textarea' && (
                            <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4">
                                <textarea
                                    ref={textareaRef}
                                    rows={8}
                                    value={state.extraContext || ''}
                                    onChange={(e) => updateState('extraContext', e.target.value)}
                                    placeholder="e.g. The hero headline should be 'Build faster, launch smarter.' Use a dark background. Keep every section super short — three sentences max..."
                                    className="w-full px-6 py-4 text-base border border-white/[0.08] rounded-2xl focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-slate-100 placeholder:text-slate-600 bg-white/[0.04] shadow-sm resize-none leading-relaxed"
                                    autoFocus
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                    Totally optional — hit{' '}
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.06] border border-white/[0.1] rounded text-xs font-mono text-slate-400">
                                        Skip
                                    </kbd>{' '}
                                    if you're good to go.
                                </p>
                            </div>
                        )}

                        {/* Text input */}
                        {stepConfig.type === 'text' && (
                            <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 mt-8">
                                <input
                                    type="text"
                                    value={(state[stepConfig.id as keyof PromptState] as string) || ''}
                                    onChange={(e) => updateState(stepConfig.id as keyof PromptState, e.target.value)}
                                    placeholder="e.g. Summer Launch Campaign"
                                    className="w-full px-6 py-4 text-xl border border-white/[0.08] rounded-2xl focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-white placeholder:text-slate-600 bg-white/[0.04] shadow-sm"
                                    autoFocus
                                    onKeyDown={(e) => { if (e.key === 'Enter' && canProceed) handleNext(); }}
                                />
                                <p className="mt-4 text-sm text-slate-500">Press Enter to continue</p>
                            </div>
                        )}

                        {/* Card grid */}
                        {stepConfig.type === 'cards' && (
                            <div className={`grid gap-5 p-2 ${stepConfig.options.length <= 4
                                ? 'grid-cols-1 sm:grid-cols-2'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }`}>
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

            {/* Nav footer */}
            <div className="w-full max-w-5xl mt-10 flex items-center justify-between pt-6 border-t border-white/[0.06]">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 text-slate-400 font-medium rounded-full hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {currentStep === 0 ? 'Home' : 'Back'}
                </button>

                <div className="flex items-center gap-3">
                    {stepConfig.type === 'textarea' && (
                        <button
                            onClick={onComplete}
                            className="px-6 py-3 text-slate-500 font-medium rounded-full hover:bg-white/[0.06] hover:text-slate-300 transition-colors"
                        >
                            Skip
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={!canProceed && stepConfig.type !== 'textarea'}
                        className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-500 shadow-lg shadow-primary-600/25 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isLastStep
                            ? <><Sparkles className="w-5 h-5" /> Build My Prompt</>
                            : <>Next <ArrowRight className="w-5 h-5" /></>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
