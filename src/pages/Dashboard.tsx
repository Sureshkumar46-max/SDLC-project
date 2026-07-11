import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  GitBranch,
  Bug,
  Activity,
  Layers,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  // Custom widgets details depending on user role
  const getRoleOverviewMetrics = () => {
    const defaultStats = [
      { name: 'Active Sprints', value: '12', icon: Layers, color: 'text-blue-500 bg-blue-500/10' },
      { name: 'Velocity', value: '88%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
      { name: 'Avg Resolution Time', value: '1.4 days', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
      { name: 'Tasks Completed', value: '342', icon: CheckCircle, color: 'text-purple-500 bg-purple-500/10' },
    ];

    switch (currentUser.role) {
      case 'Super Admin':
      case 'Org Admin':
        return [
          { name: 'Total Workspace Members', value: '142 Users', icon: Users, color: 'text-purple-400 bg-purple-500/10' },
          { name: 'Active Projects', value: '18 Projects', icon: Compass, color: 'text-blue-400 bg-blue-500/10' },
          { name: 'API Server Health', value: '99.98%', icon: Zap, color: 'text-emerald-400 bg-emerald-500/10' },
          { name: 'Pending Approvals', value: '4 Requests', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10' },
        ];
      case 'Developer':
        return [
          { name: 'Assigned Issues', value: '5 Open', icon: Bug, color: 'text-red-400 bg-red-500/10' },
          { name: 'Active Branches', value: '3 Git', icon: GitBranch, color: 'text-blue-400 bg-blue-500/10' },
          { name: 'Pending PR Reviews', value: '2 Requests', icon: Activity, color: 'text-amber-400 bg-amber-500/10' },
          { name: 'Merged This Month', value: '14 PRs', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
        ];
      case 'QA/Tester':
        return [
          { name: 'Pending Verification', value: '9 Tasks', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10' },
          { name: 'Active Test Runs', value: '3 Runs', icon: Activity, color: 'text-blue-400 bg-blue-500/10' },
          { name: 'Bugs Opened (S2)', value: '11 Bugs', icon: Bug, color: 'text-red-400 bg-red-500/10' },
          { name: 'Automated Coverage', value: '82.4%', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10' },
        ];
      case 'Client/Stakeholder':
        return [
          { name: 'Roadmap Completion', value: '68%', icon: TrendingUp, color: 'text-blue-400 bg-blue-500/10' },
          { name: 'Upcoming Milestone', value: 'Beta Release', icon: Clock, color: 'text-amber-400 bg-amber-500/10' },
          { name: 'Budget Utilized', value: '$42,500', icon: Layers, color: 'text-purple-400 bg-purple-500/10' },
          { name: 'Approved Feedback', value: '17 Items', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
        ];
      default:
        return defaultStats;
    }
  };

  const metrics = getRoleOverviewMetrics();

  const mockActivities = [
    { user: 'Linus Torvalds', role: 'Developer', action: 'committed to main branch', target: 'feature/rbac-gate', time: '12m ago' },
    { user: 'Sarah Connor', role: 'Org Admin', action: 'updated permissions policy', target: 'HexaCorp Workspace', time: '1h ago' },
    { user: 'Ada Lovelace', role: 'QA/Tester', action: 'flagged defect', target: 'Bug #402: OAuth Session Loop', time: '3h ago' },
    { user: 'Marcus Aurelius', role: 'Project Manager', action: 'moved task to Done', target: 'Sprint Review Presentation', time: '4h ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-900/60 to-slate-900 border border-slate-800 p-6 md:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-blue-500/5 blur-3xl rounded-full"></div>
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            NeuroForge Hub
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            You are logged in as a <span className="font-semibold text-slate-200">{currentUser.role}</span>. Below is your personalized workstation overview for <span className="text-slate-200 font-semibold">{currentUser.organization}</span>.
          </p>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-lg hover:border-slate-700/80 transition-all duration-200"
          >
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{metric.name}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{metric.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${metric.color}`}>
              <metric.icon className="h-5 w-5 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Split details layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-200">Recent workspace activity</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time status changes in your organization</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              View History
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/60">
            {mockActivities.map((act, index) => (
              <div key={index} className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700">
                  {act.user.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-300">
                    <span className="font-semibold text-slate-200">{act.user}</span> ({act.role}){' '}
                    <span className="text-slate-400">{act.action}</span>{' '}
                    <span className="font-medium text-blue-400 truncate">{act.target}</span>
                  </p>
                  <span className="inline-block text-[10px] text-slate-500 mt-0.5">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-200">Workspace summary</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your tenant environment is fully synced. Changes to permissions and user directories will propagate across service clusters in real-time.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Current Session</span>
                <span className="font-mono text-slate-200 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Security Level</span>
                <span className="font-semibold text-emerald-400">JWT SIGNED</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Current Role Scope</span>
                <span className="font-semibold text-blue-400 text-[10px] uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{currentUser.role}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 text-center">
            <p className="text-[11px] text-slate-500 font-medium">NeuroForge Platform Core V1.4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
