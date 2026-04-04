import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, RefreshCw, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResultProps {
    prompt: string;
    projectName: string;
    isLoggedIn: boolean;
    onReset: () => void;
}

export function Result({ prompt, projectName, isLoggedIn, onReset }: ResultProps) {
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([prompt], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "master-blueprint.md";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleSave = async () => {
        if (!isLoggedIn) return;
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not found");

            const { error } = await supabase
                .from('saved_prompts')
                .insert({
                    user_id: user.id,
                    project_name: projectName || 'Untitled Project',
                    final_prompt: prompt
                });

            if (error) throw error;
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err: any) {
            console.error('Failed to save prompt:', err);
            setSaveError(err.message || 'Failed to save to dashboard');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl flex flex-col gap-6"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Your Master Blueprint</h1>
                        <p className="mt-1 text-slate-400">Ready to be pasted into your AI of choice.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleCopy}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 glass border border-white/[0.08] text-slate-300 rounded-xl font-medium hover:bg-white/[0.08] hover:text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 focus:ring-offset-surface-500"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors shadow-lg shadow-primary-600/25 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 focus:ring-offset-surface-500"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>

                {saveError && (
                    <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                        {saveError}
                    </div>
                )}

                {isLoggedIn && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving || saveSuccess}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-500 ${saveSuccess
                                    ? 'bg-green-500 text-white hover:bg-green-400 focus:ring-green-500/40 shadow-green-500/20'
                                    : 'bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500/40 shadow-primary-600/25'
                                } disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : saveSuccess ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {isSaving ? 'Saving...' : saveSuccess ? 'Saved to Dashboard' : 'Save to Dashboard'}
                        </button>
                    </div>
                )}

                <div className="rounded-2xl shadow-xl shadow-black/20 border border-white/[0.06] overflow-hidden relative glass">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-violet to-accent-cyan" />
                    <div className="p-6 md:p-8 overflow-auto max-h-[60vh]">
                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                            {prompt}
                        </pre>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Create Another Prompt
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
