import React from 'react';

// Using text representation for logos to keep it clean without external SVGs, 
// mimicking the "fake data" request with professional looking placeholders.
const logos = [
  { name: "OdontoDigest", opacity: "opacity-40" },
  { name: "EstéticaInsider", opacity: "opacity-50" },
  { name: "HarmonizaçãoBR", opacity: "opacity-40" },
  { name: "DoctorBusiness", opacity: "opacity-60" },
  { name: "SaúdeMarketing", opacity: "opacity-40" }
];

export const AuthorityBar: React.FC = () => {
  return (
    <section className="border-y border-white/5 bg-black/40 backdrop-blur-sm py-10 relative z-20">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-gray-500 mb-8 font-medium tracking-widest uppercase">
          A escolha de +500 clínicas em todo o Brasil
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`text-xl md:text-2xl font-display font-bold text-white ${logo.opacity} hover:opacity-100 transition-opacity cursor-default select-none`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};