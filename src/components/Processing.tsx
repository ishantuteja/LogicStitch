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
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center flex-col bg-white p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8 p-4 rounded-full bg-primary-50 text-primary-600"
                >
                    <Loader2 className="w-12 h-12" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight text-center">
                    Stitching your master blueprint...
                </h2>
                <p className="mt-4 text-slate-500 text-center text-lg">
                    Connecting logic, rules, and aesthetics.
                </p>

                <div className="w-64 h-2 mt-8 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
