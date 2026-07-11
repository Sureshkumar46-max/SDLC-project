import React, { useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, Calendar, Target, CheckCircle2, Download, AlertCircle, FileText } from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const milestones = [
    { title: 'Auth Architecture Sign-off', date: 'Jul 15, 2026', status: 'Completed', progress: 100 },
    { title: 'Kanban Board Interactive Rollout', date: 'Jul 29, 2026', status: 'In Progress', progress: 75 },
    { title: 'Alpha Release Presentation', date: 'Aug 14, 2026', status: 'Pending', progress: 0 },
    { title: 'Beta Launch Integration Cycle', date: 'Sep 10, 2026', status: 'Pending', progress: 0 }
  ];

  // Triggers browser download for mock PDF release notes
  const handleDownloadNotes = () => {
    try {
      const releaseContent = `--------------------------------------------------
NEUROFORGE ENTERPRISE SYSTEM - RELEASE NOTES v1.4.0
--------------------------------------------------
Date: July 09, 2026
Status: APPROVED
Scope: Sprint 14 & 15 Deliverables

1. Core Architecture:
   - Configured central MockAuthContext with full token clearance scopes.
   - Built protected route wrapper enforcing allowedRoles checking.
   
2. Workspace Views:
   - Fleshed out Developer Task Kanban boards with Link Commit prompts.
   - Added PM Capacity allocation cards and SVG burndown charts.
   - Embedded QA Test suites and AI Test Case scenario generators.

Approved by: Alex Mercer (Super Admin)
Organization: HexaCorp Global
--------------------------------------------------`;

      const blob = new Blob([releaseContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'NeuroForge_Release_Notes_v1.4.0.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess('Release notes download initiated successfully.');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Briefcase className="h-6.5 w-6.5 text-teal-400" />
            Client Strategic Portal
          </h1>
          <p className="text-xs text-slate-400">Read-only overview of sprint health, milestone timelines, and signed documentation downloads.</p>
        </div>

        {/* Download Release Notes */}
        <button
          onClick={handleDownloadNotes}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-sm transition-all shadow-md shadow-teal-500/10 shrink-0"
        >
          <Download className="h-4 w-4" />
          Download Release Notes
        </button>
      </div>

      {/* Success Notification Toast */}
      {downloadSuccess && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg border border-teal-500/20 bg-teal-500/10 text-teal-400 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* High-Level Progress Meters (Overall Completion, Budget Burn Rate, QA verification, Milestones) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Overall Completion */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Completion</h3>
            <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-white">68%</p>
            <p className="text-[10px] text-slate-500">Workspace sync progress</p>
          </div>
          <div className="w-full bg-slate-950 border border-slate-850 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>

        {/* Budget Burn Rate */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Burn Rate</h3>
            <DollarSign className="h-4.5 w-4.5 text-teal-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-white">65% ($42,500)</p>
            <p className="text-[10px] text-slate-500">Spent of $65,000 Q3 scope</p>
          </div>
          <div className="w-full bg-slate-950 border border-slate-850 rounded-full h-1.5">
            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* QA Test Coverage */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">QA Verification</h3>
            <Target className="h-4.5 w-4.5 text-purple-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-white">82.4% Passed</p>
            <p className="text-[10px] text-slate-500">142 test scenarios active</p>
          </div>
          <div className="w-full bg-slate-950 border border-slate-850 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '82.4%' }}></div>
          </div>
        </div>

        {/* Milestones Delivery */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestones Met</h3>
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-extrabold text-white">2 of 4</p>
            <p className="text-[10px] text-slate-500">Delivery cycle schedule</p>
          </div>
          <div className="w-full bg-slate-950 border border-slate-850 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

      </div>

      {/* Grid: Timeline (Left 2/3) + Documentation (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Milestone Timeline */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calendar className="h-4.5 w-4.5 text-teal-400" />
            <h2 className="text-base font-bold text-slate-200">Interactive Milestone Roadmap</h2>
          </div>

          <div className="space-y-6 pt-2">
            {milestones.map((mil, idx) => (
              <div key={idx} className="relative flex gap-4">
                {idx !== milestones.length - 1 && (
                  <div className="absolute left-3.5 top-8 bottom-[-24px] w-0.5 bg-slate-800"></div>
                )}
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  mil.status === 'Completed'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : mil.status === 'In Progress'
                    ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                    : 'bg-slate-800/80 border border-slate-700 text-slate-500'
                }`}>
                  {mil.status === 'Completed' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1 bg-slate-950/40 p-4 rounded-lg border border-slate-800/80 hover:border-slate-800 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{mil.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Target Completion Date: {mil.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-900 rounded-full h-1.5 border border-slate-800 hidden sm:block">
                      <div className={`h-1.5 rounded-full ${
                        mil.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`} style={{ width: `${mil.progress}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      mil.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : mil.status === 'In Progress'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-slate-800/60 text-slate-500 border-slate-700'
                    }`}>
                      {mil.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client documents hub */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-teal-400" />
              Stakeholder Deliverables
            </h2>
            <p className="text-xs text-slate-400 leading-normal">
              Review signed project specifications, security audit validations, and sprint reports.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleDownloadNotes}
                className="w-full flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="truncate">Approved v1.4.0 Release Notes</span>
                <Download className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
              </button>

              <button
                onClick={() => alert('Opening signed SLA specifications file (Mock).')}
                className="w-full flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="truncate">SLA Development Specification</span>
                <FileText className="h-3.5 w-3.5 text-slate-500 shrink-0 ml-2" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center flex justify-center items-center gap-1.5 text-[10px] text-slate-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Read-only stakeholder scope</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ClientPortal;
