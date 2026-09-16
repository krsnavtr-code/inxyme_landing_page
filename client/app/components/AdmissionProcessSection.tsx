interface AdmissionProcessSectionProps {
  universityName: string;
  programName: string;
  admissionSteps: { number: string; title: string; description: string }[];
}

export default function AdmissionProcessSection({
  universityName,
  programName,
  admissionSteps,
}: AdmissionProcessSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="w-[min(1240px,94%)] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-[#1565c0] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Seamless Online Enrollment Process
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Complete your course enrollment and document verification 100% online from home with step-by-step assistance from Inxyme.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionSteps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs text-center flex flex-col items-center justify-between relative group hover:border-[#1565c0]/40 transition-all"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#102d63] text-[#f7a51c] flex items-center justify-center font-black text-xl mb-4 shadow-sm group-hover:bg-[#1565c0] group-hover:text-white transition-colors">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#counselling"
            className="inline-flex items-center gap-2 bg-[#f7a51c] hover:bg-[#f58220] text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-[0.99]"
          >
            <span>Start Your Online Application Now</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
