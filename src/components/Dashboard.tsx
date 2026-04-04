import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import {
    Copy, Trash2, Check, Loader2, ChevronRight,
    LayoutDashboard, Sparkles, Clock, AlertCircle
} from 'lucide-react';

interface SavedPrompt {
    id: string;
    project_name: string;
    final_prompt: string;
    created_at: string;
}

export function Dashboard() {
    const navigate = useNavigate();
    const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/');
                return;
            }

            const { data, error } = await supabase
                .from('saved_prompts')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPrompts(data || []);
        } catch (err: any) {
            setError(err.message || 'Failed to load your prompts.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (prompt: SavedPrompt) => {
        try {
            await navigator.clipboard.writeText(prompt.final_prompt);
            setCopiedId(prompt.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            // Clipboard not available
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const { error } = await supabase
                .from('saved_prompts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setPrompts((prev) => prev.filter((p) => p.id !== id));
        } catch (err: any) {
            console.error('Failed to delete prompt:', err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500/15 text-primary-400">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-white">My Dashboard</h1>
                            <p className="text-sm text-slate-500">Your saved AI master blueprints</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-full hover:bg-primary-500 shadow-lg shadow-primary-600/25 transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        New Blueprint
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-6">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 text-primary-400 animate-spin mb-4" />
                        <p className="text-slate-500 text-sm">Loading your blueprints...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && prompts.length === 0 && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="p-4 rounded-full bg-white/[0.04] mb-5">
                            <Sparkles className="w-8 h-8 text-slate-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-300 mb-2">No blueprints yet</h2>
                        <p className="text-slate-500 text-sm max-w-xs mb-6">
                            Run the Visual Wizard and save a prompt to see it appear here.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-full hover:bg-primary-500 shadow-lg shadow-primary-600/25 transition-colors"
                        >
                            Create Your First Blueprint
                        </button>
                    </motion.div>
                )}

                {/* Prompts Grid */}
                {!loading && prompts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <AnimatePresence>
                            {prompts.map((prompt) => (
                                <motion.div
                                    key={prompt.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    className="glass rounded-2xl border border-white/[0.06] shadow-lg shadow-black/20 hover:border-white/[0.12] transition-all overflow-hidden flex flex-col"
                                >
                                    {/* Top accent bar */}
                                    <div className="h-1 w-full bg-gradient-to-r from-primary-500 via-accent-violet to-accent-cyan" />

                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Title + Date */}
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <h3 className="text-base font-bold text-white leading-snug line-clamp-1">
                                                {prompt.project_name}
                                            </h3>
                                            <span className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap flex-shrink-0 mt-0.5">
                                                <Clock className="w-3 h-3" />
                                                {formatDate(prompt.created_at)}
                                            </span>
                                        </div>

                                        {/* Prompt preview */}
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4 font-mono">
                                            {prompt.final_prompt}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                                            <button
                                                onClick={() => handleCopy(prompt)}
                                                className={`flex flex-1 items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all ${copiedId === prompt.id
                                                        ? 'bg-green-500/15 text-green-400'
                                                        : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                                                    }`}
                                            >
                                                {copiedId === prompt.id ? (
                                                    <><Check className="w-4 h-4" />Copied!</>
                                                ) : (
                                                    <><Copy className="w-4 h-4" />Copy Prompt</>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleDelete(prompt.id)}
                                                disabled={deletingId === prompt.id}
                                                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {deletingId === prompt.id
                                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                                    : <Trash2 className="w-4 h-4" />
                                                }
                                                {deletingId === prompt.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
