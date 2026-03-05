import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Landing } from './components/Landing';
import { Wizard } from './components/Wizard';
import { Processing } from './components/Processing';
import { Result } from './components/Result';
import { Dashboard } from './components/Dashboard';
import type { PromptState, ViewState } from './types';
import { generatePrompt } from './lib/promptGenerator';

const initialState: PromptState = {
  format: null,
  targetAI: null,
  aesthetic: null,
  targetAudience: null,
  features: [],
  contentStrategy: null,
  projectName: '',
};

// Protected route wrapper
function ProtectedRoute({ user, children }: { user: User | null; children: React.ReactNode }) {
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function HomeApp({
  user,
  onSignInClick,
}: {
  user: User | null;
  onSignInClick: () => void;
}) {
  const [view, setView] = useState<ViewState>('landing');
  const [wizardStep, setWizardStep] = useState(0);
  const [promptState, setPromptState] = useState<PromptState>(initialState);
  const [finalPrompt, setFinalPrompt] = useState('');

  const handleUpdateState = (key: keyof PromptState, value: any) => {
    setPromptState((prev) => ({ ...prev, [key]: value }));
  };

  const startWizard = () => {
    setPromptState(initialState);
    setWizardStep(0);
    setView('wizard');
  };

  const handleWizardComplete = () => setView('processing');

  const handleProcessingComplete = () => {
    const generated = generatePrompt(promptState);
    setFinalPrompt(generated);
    setView('result');
  };

  const handleReset = () => setView('landing');

  return (
    <>
      {view === 'landing' && <Landing onStart={startWizard} />}

      {view === 'wizard' && (
        <Wizard
          state={promptState}
          updateState={handleUpdateState}
          currentStep={wizardStep}
          setCurrentStep={setWizardStep}
          onComplete={handleWizardComplete}
          onCancel={handleReset}
        />
      )}

      {view === 'processing' && (
        <Processing onComplete={handleProcessingComplete} />
      )}

      {view === 'result' && (
        <Result
          prompt={finalPrompt}
          projectName={promptState.projectName}
          isLoggedIn={!!user}
          onReset={handleReset}
        />
      )}

      {/* If not logged in and tries to save, prompt sign in */}
      {view === 'result' && !user && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onSignInClick}
            className="px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          >
            Sign in to Save
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      <Header
        user={user}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomeApp
              user={user}
              onSignInClick={() => setIsAuthModalOpen(true)}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
