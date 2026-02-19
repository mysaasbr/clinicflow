import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the data we collect
export interface QuizData {
    clinicName: string;
    whatsapp: string;
    instagram: string;
    city: string;
    primaryColor: string;
    secondaryColor: string;
    fontStyle: string; // 'modern', 'classic', 'minimal'
    brandVoice: string[]; // ['autoridade', 'acolhedora']
    marketingGoals: string[];
    differentials: string;
    slogan: string;
    visualStyle: string;
}

interface QuizContextType {
    currentStep: number;
    totalSteps: number;
    data: QuizData;
    nextStep: () => void;
    prevStep: () => void;
    updateData: (updates: Partial<QuizData>) => void;
    submitQuiz: () => Promise<void>;
    isLoading: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) throw new Error('useQuiz must be used within a QuizProvider');
    return context;
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 7; // Welcome, Info, Visuals, Style, Message, Goals, Final
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<QuizData>({
        clinicName: '',
        whatsapp: '',
        instagram: '',
        city: '',
        primaryColor: '#8B5CF6', // Brand Purple default
        secondaryColor: '#10B981', // Brand Green default
        fontStyle: 'modern',
        brandVoice: [],
        marketingGoals: [],
        differentials: '',
        slogan: '',
        visualStyle: 'modern'
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const updateData = (updates: Partial<QuizData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const submitQuiz = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('clinicflow_token');
            const userId = token?.replace('fake-jwt-token-', '');

            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    ...data
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Falha ao salvar onboarding');
            }

            const result = await response.json();
            console.log('Quiz Data Saved:', result);
        } catch (error) {
            console.error('Quiz Submission Error:', error);
            // In a real app we would show a toast error here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <QuizContext.Provider value={{
            currentStep,
            totalSteps,
            data,
            nextStep,
            prevStep,
            updateData,
            submitQuiz,
            isLoading
        }}>
            {children}
        </QuizContext.Provider>
    );
};
