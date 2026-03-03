import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl flex flex-col items-center"
            >
                <div className="mb-6 p-4 rounded-full bg-primary-50 text-primary-600 shadow-sm border border-primary-100">
                    <Sparkles className="w-8 h-8" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                    Stop Guessing.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Start Building.</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl text-balance">
                    Overcome blank page syndrome. Generate highly detailed, 500+ word master prompts for any AI platform with our Visual Wizard.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary-600 border border-transparent rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                >
                    Start Visual Wizard
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </motion.div>
        </div>
    );
}
