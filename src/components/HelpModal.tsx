
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check } from 'lucide-react';
import { SectionGuide } from '../data/onboardingData';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
    guide: SectionGuide;
    isFirstTime?: boolean;
    onComplete?: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
    isOpen, onClose, guide, isFirstTime, onComplete
}) => {
    const [currentStep, setCurrentStep] = React.useState(0);

    const handleNext = () => {
        if (currentStep < guide.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            if (isFirstTime && onComplete) {
                onComplete();
            }
            onClose();
            setCurrentStep(0);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 select-none"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-40 bg-slate-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
                            <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    key={currentStep}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={`p-6 rounded-3xl bg-${guide.steps[currentStep].color}-500/10 border border-white/10`}
                                >
                                    {React.createElement(guide.steps[currentStep].icon, {
                                        className: `w-12 h-12 text-${guide.steps[currentStep].color}-400`,
                                        strokeWidth: 2.5
                                    })}
                                </motion.div>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-10 md:p-14 space-y-8 text-center">
                            <div className="space-y-4">
                                <motion.h3
                                    key={`title-${currentStep}`}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-3xl font-black text-slate-800 tracking-tight"
                                >
                                    {guide.steps[currentStep].title}
                                </motion.h3>
                                <motion.p
                                    key={`desc-${currentStep}`}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto"
                                >
                                    {guide.steps[currentStep].description}
                                </motion.p>
                            </div>

                            {/* Progress Indicators */}
                            <div className="flex justify-center gap-2">
                                {guide.steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-100'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleNext}
                                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 group"
                            >
                                {currentStep === guide.steps.length - 1 ? (
                                    <>Começar Agora <Check className="w-4 h-4" /></>
                                ) : (
                                    <>Próximo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>

                            {isFirstTime && (
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                    Dica: Você pode acessar este guia a qualquer momento <br /> através do botão (?) em cada seção.
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
