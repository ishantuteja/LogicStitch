import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Landing } from './components/Landing';
import { Wizard } from './components/Wizard';
import { Processing } from './components/Processing';
import { Result } from './components/Result';
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

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [wizardStep, setWizardStep] = useState(0);
  const [promptState, setPromptState] = useState<PromptState>(initialState);
  const [finalPrompt, setFinalPrompt] = useState('');

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdateState = (key: keyof PromptState, value: any) => {
    setPromptState((prev) => ({ ...prev, [key]: value }));
  };

  const startWizard = () => {
    setPromptState(initialState);
    setWizardStep(0);
    setView('wizard');
  };

  const handleWizardComplete = () => {
    setView('processing');
  };

  const handleProcessingComplete = () => {
    const generated = generatePrompt(promptState);
    setFinalPrompt(generated);
    setView('result');
  };

  const handleReset = () => {
    setView('landing');
  };

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
    </div>
  );
}

export default App;
