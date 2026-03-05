import type { User } from '@supabase/supabase-js';
import { LogIn, LogOut, LayoutTemplate, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeaderProps {
    user: User | null;
    onSignInClick: () => void;
    onSignOut: () => void;
}

export function Header({ user, onSignInClick, onSignOut }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
                            <LayoutTemplate className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                            LogicStitch
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onSignOut}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </motion.button>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onSignInClick}
                                className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-primary-600 rounded-full hover:bg-primary-700 shadow-sm shadow-primary-500/20 transition-colors"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
