import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, RefreshCw } from 'lucide-react';

interface ResultProps {
    prompt: string;
    onReset: () => void;
}

export function Result({ prompt, onReset }: ResultProps) {
    const [copied, setCopied] = useState(false);

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
        // Basic download implementation
        const element = document.createElement("a");
        const file = new Blob([prompt], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "master-blueprint.md";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl flex flex-col gap-6"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Master Blueprint</h1>
                        <p className="mt-1 text-slate-500">Ready to be pasted into your AI of choice.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleCopy}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-600/20 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600" />
                    <div className="p-6 md:p-8 overflow-auto max-h-[60vh] custom-scrollbar">
                        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                            {prompt}
                        </pre>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Create Another Prompt
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
