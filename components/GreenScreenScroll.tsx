import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const GreenScreenScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const maskSize = useTransform(scrollYProgress, [0, 0.3], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const y1 = useTransform(scrollYProgress, [0.3, 0.7], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.7], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <section ref={targetRef} id="showcase" className="relative h-[300vh]">
      
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-brand-gray">
        
        {/* The "Pain" - Before State */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-700 mb-6 leading-tight">
                    Site antigo, amador<br/>e sem conversão?
                </h2>
                <p className="text-gray-500 text-xl">
                    A falta de uma presença premium faz você perder pacientes para concorrentes que parecem mais "caros".
                </p>
            </div>
        </div>

        {/* The "Solution" - After State */}
        <motion.div 
            style={{ clipPath: maskSize }}
            className="absolute inset-0 bg-brand-dark w-full h-full flex flex-col items-center justify-center"
        >
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
                    alt="Clínica Premium" 
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/50"></div>
            </div>

            <motion.div style={{ opacity }} className="z-10 relative max-w-6xl w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div style={{ y: y1 }} className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white">
                        Autoridade <span className="text-brand-purple">Imediata</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Nós entregamos uma <strong>Landing Page Premium</strong> pronta, com design moderno e focada em agendamentos no WhatsApp.
                        <br/><br/>
                        Sem depender de agências caras, lentas e estressantes.
                    </p>
                </motion.div>

                <motion.div style={{ y: y2 }} className="relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden border border-brand-purple/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-[#0a0a0a]">
                        <div className="p-4 border-b border-white/10 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
                            alt="Interface Clínica Premium" 
                            className="w-full h-auto opacity-80"
                        />
                        {/* Overlay UI Mockup */}
                        <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold text-xl">Dr</div>
                                <div>
                                    <div className="h-3 w-32 bg-white rounded mb-2"></div>
                                    <div className="h-2 w-24 bg-white/60 rounded"></div>
                                </div>
                                <div className="ml-auto bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">Agendar</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};