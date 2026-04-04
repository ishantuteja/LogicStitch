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
                <div className="mb-6 p-4 rounded-full bg-primary-500/15 text-primary-400 shadow-lg shadow-primary-500/10 border border-primary-500/20">
                    <Sparkles className="w-8 h-8" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Stop Guessing.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-violet to-accent-cyan">Start Building.</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl text-balance">
                    Overcome blank page syndrome. Generate highly detailed, 500+ word master prompts for any AI platform with our Visual Wizard.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary-600 border border-primary-500/30 rounded-full shadow-xl shadow-primary-600/30 hover:bg-primary-500 hover:shadow-primary-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-500 focus:ring-primary-500 animate-glow-pulse"
                >
                    Start Visual Wizard
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </motion.div>
        </div>
    );
}
