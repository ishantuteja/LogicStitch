import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../../utils';

interface WizardCardProps {
    title: string;
    imageSrc: string;
    selected: boolean;
    onClick: () => void;
    multiselect?: boolean;
    isRecommended?: boolean;
}

export function WizardCard({ title, imageSrc, selected, onClick, multiselect = false, isRecommended = false }: WizardCardProps) {
    return (
        <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative rounded-2xl overflow-hidden text-left transition-all duration-200 border-2 outline-none group",
                selected
                    ? "border-primary-500 ring-2 ring-primary-500/25 shadow-lg shadow-primary-500/15"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:shadow-lg hover:shadow-black/30",
                isRecommended && !selected && "border-amber-500/40 shadow-amber-500/10"
            )}
        >
            <div className="aspect-[4/3] w-full bg-surface-200 overflow-hidden relative">
                <img
                    src={imageSrc}
                    alt={title}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        selected ? "scale-105" : "group-hover:scale-110"
                    )}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {isRecommended && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md shadow-amber-500/40 flex items-center gap-1"
                    >
                        <Sparkles className="w-3 h-3" />
                        Recommended
                    </motion.div>
                )}
            </div>

            <div className="p-4 bg-surface-200/80 relative">
                <h3 className="font-semibold text-slate-200 pr-6 leading-tight">
                    {title}
                </h3>

                {/* Selection indicator */}
                <div className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200",
                    selected ? "opacity-100 scale-100 text-primary-400" : "opacity-0 scale-50 text-slate-500 group-hover:opacity-50 group-hover:scale-100"
                )}>
                    {multiselect ? (
                        <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center transition-colors",
                            selected ? "bg-primary-500 text-white" : "border-2 border-slate-600"
                        )}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                    ) : (
                        <CheckCircle2 className="w-5 h-5" />
                    )}
                </div>
            </div>
        </motion.button>
    );
}
