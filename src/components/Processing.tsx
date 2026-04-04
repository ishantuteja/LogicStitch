import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingProps {
    onComplete: () => void;
}

export function Processing({ onComplete }: ProcessingProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center p-12 rounded-3xl glass shadow-2xl shadow-black/30"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8 p-4 rounded-full bg-primary-500/15 text-primary-400"
                >
                    <Loader2 className="w-12 h-12" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center">
                    Stitching your master blueprint...
                </h2>
                <p className="mt-4 text-slate-400 text-center text-lg">
                    Connecting logic, rules, and aesthetics.
                </p>

                <div className="w-64 h-2 mt-8 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-600 to-accent-violet rounded-full shadow-sm shadow-primary-500/50"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
