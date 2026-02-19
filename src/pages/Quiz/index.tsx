import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { X, ChevronLeft } from 'lucide-react';
import { WelcomeStep } from './steps/WelcomeStep';
import { ClinicInfoStep } from './steps/ClinicInfoStep';
import { VisualIdentityStep } from './steps/VisualIdentityStep';
import { MarketingGoalsStep } from './steps/MarketingGoalsStep';
import { BrandStyleStep } from './steps/BrandStyleStep';
import { BrandMessageStep } from './steps/BrandMessageStep';
import { FinalStep } from './steps/FinalStep';
import { SuccessStep } from './steps/SuccessStep';

const QuizContent: React.FC = () => {
    const { currentStep, totalSteps, prevStep } = useQuiz();

    // Progress Bar Calculation
    const progress = (currentStep / totalSteps) * 100;

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <WelcomeStep />;
            case 1: return <ClinicInfoStep />;
            case 2: return <VisualIdentityStep />;
            case 3: return <BrandStyleStep />;
            case 4: return <BrandMessageStep />;
            case 5: return <MarketingGoalsStep />;
            case 6: return <FinalStep />;
            case 7: return <SuccessStep />;
            default: return <WelcomeStep />;
        }
    };

    // Don't show header/footer on welcome and success
    const isImmersive = currentStep === 0 || currentStep === 7;

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center overflow-hidden font-sans selection:bg-brand-purple/30">

            {/* Header / Progress Bar */}
            {!isImmersive && (
                <div className="w-full max-w-4xl px-4 py-8 flex items-center gap-4">
                    <button
                        onClick={prevStep}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex-1 h-4 bg-slate-100 rounded-2xl overflow-hidden relative shadow-inner">
                        <motion.div
                            className="h-full bg-emerald-500 rounded-2xl relative z-10"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            {/* Shine effect */}
                            <div className="absolute top-1 left-2 right-2 h-1 bg-white/30 rounded-full" />
                        </motion.div>
                    </div>

                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 w-full max-w-4xl flex flex-col justify-center px-4 md:px-8 ${isImmersive ? '' : 'pb-32'}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="w-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export const Quiz: React.FC = () => {
    return (
        <QuizProvider>
            <QuizContent />
        </QuizProvider>
    );
};
