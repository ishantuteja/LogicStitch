import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WizardCard } from './wizard/WizardCard';
import { WIZARD_STEPS, AI_RECOMMENDATION_MAP } from './wizard/data';
import type { PromptState } from '../types';

interface WizardProps {
    state: PromptState;
    updateState: (key: keyof PromptState, value: any) => void;
    onComplete: () => void;
    onCancel: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

export function Wizard({ state, updateState, onComplete, onCancel, currentStep, setCurrentStep }: WizardProps) {
    const stepConfig = WIZARD_STEPS[currentStep];
    const isLastStep = currentStep === WIZARD_STEPS.length - 1;

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

    const handleToggleOption = (optionId: string) => {
        const key = stepConfig.id as keyof PromptState;

        if (stepConfig.multiselect) {
            const currentVal = (state[key] as string[]) || [];
            const isSelected = currentVal.includes(optionId);

            const newVal = isSelected
                ? currentVal.filter(id => id !== optionId)
                : [...currentVal, optionId];

            updateState(key, newVal);
        } else {
            updateState(key, optionId);
            // Auto-advance for single-select after a short delay
            setTimeout(() => {
                handleNext();
            }, 400);
        }
    };

    const isOptionSelected = (optionId: string) => {
        const val = state[stepConfig.id as keyof PromptState];
        if (stepConfig.multiselect) {
            return (val as string[]).includes(optionId);
        }
        return val === optionId;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="w-full max-w-5xl mb-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                    {WIZARD_STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`w-12 h-1.5 rounded-full transition-colors duration-300 ${i <= currentStep ? 'bg-primary-500' : 'bg-slate-200'}`}
                        />
                    ))}
                </div>
                <p className="text-sm text-slate-500 font-medium">Step {currentStep + 1} of {WIZARD_STEPS.length}</p>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-5xl flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col flex-1"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                                {stepConfig.title}
                            </h2>
                            <p className="text-lg text-slate-500">
                                {stepConfig.subtitle}
                            </p>
                        </div>

                        {stepConfig.type === 'text' ? (
                            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 mt-8">
                                <input
                                    type="text"
                                    value={(state[stepConfig.id as keyof PromptState] as string) || ''}
                                    onChange={(e) => updateState(stepConfig.id as keyof PromptState, e.target.value)}
                                    placeholder="e.g. Acme Corp Landing Page"
                                    className="w-full px-6 py-4 text-xl border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all outline-none text-slate-900 placeholder:text-slate-400 bg-white shadow-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && (state[stepConfig.id as keyof PromptState] as string)?.trim().length > 0) {
                                            handleNext();
                                        }
                                    }}
                                />
                                <p className="mt-4 text-sm text-slate-500">Press Enter to continue</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
                                {stepConfig.options.map((option) => {
                                    // Handle AI Recommendation logic
                                    let isRecommended = false;
                                    if (stepConfig.id === 'targetAI' && state.format) {
                                        isRecommended = AI_RECOMMENDATION_MAP[state.format] === option.id;
                                    }
                                    return (
                                        <WizardCard
                                            key={option.id}
                                            title={option.label}
                                            imageSrc={option.image || ''}
                                            selected={isOptionSelected(option.id)}
                                            onClick={() => handleToggleOption(option.id)}
                                            multiselect={stepConfig.multiselect}
                                            isRecommended={isRecommended}
                                        />
                                    );
                                })}
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

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 shadow-md shadow-primary-500/20 transition-all active:scale-95"
                >
                    {isLastStep ? 'Stitch Blueprint' : 'Next Step'}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
