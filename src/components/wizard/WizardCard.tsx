import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils';

interface WizardCardProps {
    title: string;
    imageSrc: string;
    selected: boolean;
    onClick: () => void;
    multiselect?: boolean;
}

export function WizardCard({ title, imageSrc, selected, onClick, multiselect = false }: WizardCardProps) {
    return (
        <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative rounded-2xl overflow-hidden text-left transition-all duration-200 border-2 outline-none group",
                selected
                    ? "border-primary-500 ring-2 ring-primary-500/20 shadow-md shadow-primary-500/10"
                    : "border-slate-100/50 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            )}
        >
            <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                <img
                    src={imageSrc}
                    alt={title}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        selected ? "scale-105" : "group-hover:scale-110"
                    )}
                    loading="lazy"
                />
                {/* Gradient overlay to ensure text readability if needed in future, but we have text below */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 bg-white relative">
                <h3 className="font-semibold text-slate-800 pr-6 leading-tight">
                    {title}
                </h3>

                {/* Selection indicator */}
                <div className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200",
                    selected ? "opacity-100 scale-100 text-primary-500" : "opacity-0 scale-50 text-slate-300 group-hover:opacity-50 group-hover:scale-100"
                )}>
                    {multiselect ? (
                        <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center transition-colors",
                            selected ? "bg-primary-500 text-white" : "border-2 border-slate-300"
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
