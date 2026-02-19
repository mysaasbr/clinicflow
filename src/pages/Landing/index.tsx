import React, { Suspense } from 'react';
import { Navbar } from '../../../components/Navbar';
import { Hero } from '../../../components/Hero';
import { Footer } from '../../../components/Footer';
import { CursorSpotlight } from './components/CursorSpotlight';

// Lazy load below-the-fold components
const ProblemComparison = React.lazy(() => import('../../../components/ProblemComparison').then(module => ({ default: module.ProblemComparison })));
const Solution = React.lazy(() => import('../../../components/Solution').then(module => ({ default: module.Solution })));
const HowItWorks = React.lazy(() => import('../../../components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const Features = React.lazy(() => import('../../../components/Features').then(module => ({ default: module.Features })));
const VisualShowcase = React.lazy(() => import('../../../components/VisualShowcase').then(module => ({ default: module.VisualShowcase })));
const CaseStudies = React.lazy(() => import('../../../components/CaseStudies').then(module => ({ default: module.CaseStudies })));
const Testimonials = React.lazy(() => import('../../../components/Testimonials').then(module => ({ default: module.Testimonials })));
const Pricing = React.lazy(() => import('../../../components/Pricing').then(module => ({ default: module.Pricing })));
const FAQ = React.lazy(() => import('../../../components/FAQ').then(module => ({ default: module.FAQ })));
const FinalCTA = React.lazy(() => import('../../../components/FinalCTA').then(module => ({ default: module.FinalCTA })));
const MathematicsOfAuthority = React.lazy(() => import('../../../components/MathematicsOfAuthority').then(m => ({ default: m.MathematicsOfAuthority })));

// Loading fallback
const SectionLoader = () => <div className="h-96 w-full flex items-center justify-center text-slate-400">Loading...</div>;

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500/30 selection:text-indigo-900 overflow-x-hidden font-sans">

            {/* Light Mode Spotlight equivalent or remove if not needed */}
            {/* <CursorSpotlight />  -- Removing for cleaner light look, or replace with subtle gradient */}

            <Navbar />

            <main className="relative z-10 space-y-0">
                <Hero />

                <Suspense fallback={<SectionLoader />}>
                    <ProblemComparison />
                    <Solution />
                    <HowItWorks />
                    <Features />
                    <VisualShowcase />
                    <MathematicsOfAuthority />
                    <CaseStudies />
                    <Testimonials />
                    <Pricing />
                    <FAQ />
                    <FinalCTA />
                </Suspense>
            </main>

            <Footer />


        </div>
    );
};
