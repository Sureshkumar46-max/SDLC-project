import React, { useState } from 'react';
import { ShieldCheck, Bug, RefreshCw, Cpu, Sparkles, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Defect {
  id: string;
  title: string;
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'Verifying' | 'Resolved';
  reporter: string;
}

interface TestCase {
  id: string;
  title: string;
  type: 'Automated' | 'Manual';
  status: 'Passed' | 'Failed' | 'Blocked';
  lastRun: string;
}

interface GeneratedScenario {
  title: string;
  precondition: string;
  steps: string[];
  expected: string;
}

const INITIAL_DEFECTS: Defect[] = [
  { id: 'BUG-401', title: 'Token timeout loop on slow networks', severity: 'Critical', status: 'Open', reporter: 'Ada Lovelace' },
  { id: 'BUG-402', title: 'Unauthorized page styling wraps in mobile view', severity: 'Minor', status: 'Verifying', reporter: 'Ada Lovelace' },
  { id: 'BUG-403', title: 'JWT verification fails on role changes', severity: 'Major', status: 'Resolved', reporter: 'Linus Torvalds' },
];

const INITIAL_TEST_CASES: TestCase[] = [
  { id: 'TC-801', title: 'User session persists across page refreshes with localStorage', type: 'Automated', status: 'Passed', lastRun: '1h ago' },
  { id: 'TC-802', title: 'Redirect unauthenticated users accessing /admin-settings to login', type: 'Automated', status: 'Passed', lastRun: '2h ago' },
  { id: 'TC-803', title: 'Verify Super Admin can rotate JWT signature keys in settings', type: 'Manual', status: 'Passed', lastRun: '1d ago' },
  { id: 'TC-804', title: 'Client role is intercepted and blocked from dev backlog views', type: 'Automated', status: 'Failed', lastRun: '12m ago' },
  { id: 'TC-805', title: 'Task drag column transitions update workspace boards in real-time', type: 'Manual', status: 'Blocked', lastRun: '3h ago' }
];

export const QualityAssurance: React.FC = () => {
  const [defects] = useState<Defect[]>(INITIAL_DEFECTS);
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Generator state
  const [featureDescription, setFeatureDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenarios, setGeneratedScenarios] = useState<GeneratedScenario[]>([]);

  const triggerTestRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      // Simulating passing all cases
      setTestCases(prev => prev.map(c => c.status === 'Blocked' ? c : { ...c, status: 'Passed', lastRun: 'Just now' }));
      alert('Workspace testing cycle completed: 142 checks passed, 0 failures.');
    }, 1500);
  };

  const handleGenerateScenarios = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureDescription) return;

    setIsGenerating(true);
    setGeneratedScenarios([]);

    setTimeout(() => {
      const mockScenarios: GeneratedScenario[] = [
        {
          title: `Verify happy path for: ${featureDescription}`,
          precondition: 'User is authenticated in the tenant space with correct roles.',
          steps: [
            'Navigate to the workspace tab corresponding to the feature.',
            'Trigger the primary action matching the feature description.',
            'Observe state changes and network payloads.'
          ],
          expected: 'Feature completes execution and returns a valid HTTP 200 payload.'
        },
        {
          title: `Verify authorization guard bounds for: ${featureDescription}`,
          precondition: 'User is logged in as an unauthorized role (e.g., Client/Stakeholder).',
          steps: [
            'Attempt to trigger the target URL or action manually.',
            'Inspect route protection response header.'
          ],
          expected: 'Application intercepts request and redirects client immediately to 403 /unauthorized.'
        },
        {
          title: `Validate input boundary error resilience for: ${featureDescription}`,
          precondition: 'User is actively interacting with the feature input fields.',
          steps: [
            'Input blank data or special characters violating schema formats.',
            'Submit request.'
          ],
          expected: 'Client-side validation intercepts the blank fields, displaying red warning alerts without hitting API servers.'
        }
      ];

      setGeneratedScenarios(mockScenarios);
      setIsGenerating(false);
    }, 1800);
  };

  const getSeverityBadge = (severity: 'Critical' | 'Major' | 'Minor') => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Major':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Minor':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  const getStatusBadge = (status: TestCase['status']) => {
    switch (status) {
      case 'Passed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Failed':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Blocked':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'Passed':
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />;
      case 'Failed':
        return <XCircle className="h-3.5 w-3.5 text-red-400" />;
      case 'Blocked':
        return <AlertCircle className="h-3.5 w-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="h-6.5 w-6.5 text-emerald-500" />
            Quality Assurance Portal
          </h1>
          <p className="text-xs text-slate-400">Validate code builds, trigger regression testing routines, and document application defects.</p>
        </div>

        <button
          onClick={triggerTestRun}
          disabled={isSimulating}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition-all shadow-md shadow-emerald-500/10 shrink-0"
        >
          <RefreshCw className={`h-4 w-4 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Running Suite...' : 'Trigger Suite Run'}
        </button>
      </div>

      {/* Grid: Test Cases (Left 2/3) + AI Generator (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Test Cases Table */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-200">Workspace Test Suites</h2>
            <span className="text-xs text-slate-400 font-semibold">{testCases.length} Test cases</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5">ID</th>
                  <th className="py-2.5">Test Case Title</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Last Run</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {testCases.map(tc => (
                  <tr key={tc.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-slate-400">{tc.id}</td>
                    <td className="py-3 font-semibold text-slate-200">{tc.title}</td>
                    <td className="py-3 text-slate-400 font-medium">{tc.type}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${getStatusBadge(tc.status)}`}>
                        {getStatusIcon(tc.status)}
                        {tc.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{tc.lastRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Test Case Generator */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-400" />
              AI Test Case Generator
            </h2>
            <p className="text-xs text-slate-400 leading-normal">
              Type a workspace feature or path description below, and let the local LLM formulate test scenario targets.
            </p>

            <form onSubmit={handleGenerateScenarios} className="space-y-3">
              <textarea
                value={featureDescription}
                required
                disabled={isGenerating}
                onChange={e => setFeatureDescription(e.target.value)}
                placeholder="e.g. Session persistence via localStorage"
                className="w-full text-xs rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-white placeholder-slate-650 focus:outline-none focus:border-blue-500 h-20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isGenerating || !featureDescription}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-all shadow-md shadow-purple-500/10"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent"></span>
                    Synthesizing...
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-purple-200" />
                    Generate Scenarios
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-500 font-mono">Powered by NeuroForge Llama-3-Agent</span>
          </div>
        </div>

      </div>

      {/* Generated AI Scenarios Output */}
      {generatedScenarios.length > 0 && (
        <div className="rounded-xl bg-slate-900 border border-purple-500/30 p-6 shadow-xl space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            Generated QA Scenarios ({generatedScenarios.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedScenarios.map((sc, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase">Scenario {idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 leading-snug">{sc.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    <strong className="text-slate-400">Precondition:</strong> {sc.precondition}
                  </p>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400">Steps:</p>
                    <ol className="list-decimal pl-4 text-[10px] text-slate-400 space-y-0.5">
                      {sc.steps.map((st, sIdx) => <li key={sIdx}>{st}</li>)}
                    </ol>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-300">
                  <strong className="text-emerald-400">Expected:</strong> {sc.expected}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Defect List */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Bug className="h-5 w-5 text-red-400" />
          <h2 className="text-base font-bold text-slate-200">Tracked Defect Backlog</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5">Ticket</th>
                <th className="py-2.5">Title</th>
                <th className="py-2.5">Severity</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Reporter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {defects.map(def => (
                <tr key={def.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-slate-400">{def.id}</td>
                  <td className="py-3 font-semibold text-slate-200">{def.title}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getSeverityBadge(def.severity)}`}>
                      {def.severity}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      def.status === 'Resolved'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : def.status === 'Verifying'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {def.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{def.reporter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityAssurance;
