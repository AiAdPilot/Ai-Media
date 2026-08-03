import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, BarChart2, ShieldCheck } from 'lucide-react';

interface LoadingExperienceProps {
  productName: string;
  onComplete: () => void;
}

export const LoadingExperience: React.FC<LoadingExperienceProps> = ({ productName, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { label: 'Understanding your product...', duration: 1100 },
    { label: 'Researching your market...', duration: 1300 },
    { label: 'Building your audience...', duration: 1200 },
    { label: 'Creating campaign strategy...', duration: 1400 },
    { label: 'Almost ready...', duration: 900 },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentStepIndex < steps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, steps[currentStepIndex].duration);
    } else {
      timeout = setTimeout(() => {
        onComplete();
      }, steps[currentStepIndex].duration);
    }

    return () => clearTimeout(timeout);
  }, [currentStepIndex, onComplete]);

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 animate-fadeIn">
      {/* Header Progress Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-[#0F172A]">
                Building Strategy for <span className="text-[#2563EB]">{productName || 'Your Product'}</span>
              </h2>
              <p className="text-xs text-[#64748B]">
                Synthesizing Meta Ads Graph data & audience lookalikes
              </p>
            </div>
          </div>
          <span className="font-heading text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] h-3 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-[#2563EB] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step-by-Step Progress Checklist */}
        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={step.label}
                className={`
                  flex items-center justify-between p-3 rounded-lg border transition-all duration-300
                  ${isCurrent 
                    ? 'bg-blue-50/70 border-blue-200 text-[#0F172A]' 
                    : isCompleted 
                      ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]' 
                      : 'bg-white border-dashed border-[#E2E8F0] text-[#64748B] opacity-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#2563EB] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className={`text-xs font-medium ${isCurrent ? 'font-bold text-[#2563EB]' : ''}`}>
                    {step.label}
                  </span>
                </div>
                {isCompleted && (
                  <span className="text-[10px] text-[#16A34A] font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Done
                  </span>
                )}
                {isCurrent && (
                  <span className="text-[10px] text-[#2563EB] font-semibold bg-blue-100 border border-blue-200 px-2 py-0.5 rounded animate-pulse">
                    Processing
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton Loaders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] uppercase tracking-wider px-1">
          <span>Preparing Strategy Layout...</span>
          <span className="flex items-center gap-1.5 text-[#2563EB]">
            <BarChart2 className="w-3.5 h-3.5" />
            Meta Advantage+ Engine
          </span>
        </div>

        {/* 3 Metric Cards Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-3 animate-pulse">
              <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              <div className="h-7 bg-slate-300 rounded w-1/2"></div>
              <div className="h-2.5 bg-slate-100 rounded w-4/5"></div>
            </div>
          ))}
        </div>

        {/* Big Preview Skeleton Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
            <div className="space-y-1.5 flex-1">
              <div className="h-4 bg-slate-300 rounded w-1/3"></div>
              <div className="h-3 bg-slate-100 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-16 bg-slate-100 rounded-lg w-full"></div>
          <div className="h-48 bg-slate-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};
