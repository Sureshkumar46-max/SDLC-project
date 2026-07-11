import React, { useState } from 'react';
import { Terminal, GitPullRequest, GitBranch, Play, CheckCircle2, ShieldAlert, Link as LinkIcon, Sparkles } from 'lucide-react';

interface DevTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  commitHash?: string;
  commitMsg?: string;
}

const INITIAL_DEV_TASKS: DevTask[] = [
  { id: 'DEV-401', title: 'Implement AuthContext Provider and localStorage token sync', priority: 'High', status: 'In Progress' },
  { id: 'DEV-402', title: 'Fix CSS layout wrapping issue on mobile unauthorized page', priority: 'Medium', status: 'To Do' },
  { id: 'DEV-403', title: 'Refactor ProtectedRoute guards to check nested allowedRoles', priority: 'High', status: 'Review' },
  { id: 'DEV-404', title: 'Configure postcss autoprefixer and tailwind v3 compilation rules', priority: 'Low', status: 'Done', commitHash: 'e79f18ae415f33fbd48011c7504f2905' }
];

export const DeveloperTasks: React.FC = () => {
  const [tasks, setTasks] = useState<DevTask[]>(INITIAL_DEV_TASKS);
  
  // PR list and branch logs (supporting UI)
  const prs = [
    { id: '#412', title: 'feat: add rbac route protections', author: 'Linus Torvalds', status: 'Approved', reviews: '2/2' },
    { id: '#409', title: 'fix: localstorage token sync loop', author: 'Linus Torvalds', status: 'In Progress', reviews: '0/2' },
  ];

  const branches = [
    { name: 'main', commit: 'e79f18a', msg: 'Merge pull request #411 from dev/login-design', date: '2h ago' },
    { name: 'feature/rbac-gate', commit: '88fb3cd', msg: 'add allowedRoles checks to ProtectedRoute', date: '4h ago' },
    { name: 'bugfix/oauth-loop', commit: 'b0fa44e', msg: 'clear session state on invalid JWT signature', date: '1d ago' },
  ];

  const handleStatusChange = (taskId: string, newStatus: DevTask['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleLinkCommit = (taskId: string) => {
    const commitMsg = prompt('Enter commit message to link:');
    if (commitMsg === null) return; // User cancelled

    const mockHash = Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, commitHash: mockHash, commitMsg: commitMsg || 'Linked commit' }
          : task
      )
    );
  };

  const getPriorityColor = (priority: DevTask['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Low':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Terminal className="h-6 w-6 text-blue-500" />
          Developer Tasks & Repository Control
        </h1>
        <p className="text-xs text-slate-400">Manage your assigned backlog, link repository code, and monitor pull requests.</p>
      </div>

      {/* Main Grid: Task Board (Left 2/3) + Pipeline status (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kanban Task Board / Assigned Tasks List */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              Assigned Developer Tasks
            </h2>
            <span className="text-xs bg-slate-950 px-2 py-0.5 border border-slate-800 rounded-full text-slate-400 font-semibold">
              {tasks.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className="p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{task.id}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 leading-tight">
                    {task.title}
                  </h4>
                  {task.commitHash ? (
                    <div className="flex items-center gap-1.5 text-[10px] bg-blue-500/5 text-blue-400 px-2 py-1 rounded border border-blue-500/10 font-mono mt-1 max-w-fit">
                      <LinkIcon className="h-3 w-3 shrink-0" />
                      <span className="font-semibold text-slate-400">[{task.commitHash.substring(0, 7)}]:</span>
                      <span className="truncate max-w-[200px]">{task.commitMsg}</span>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500 italic mt-1">No repository commits linked to this ticket.</p>
                  )}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Status Dropdown selector */}
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">State</label>
                    <select
                      value={task.status}
                      onChange={e => handleStatusChange(task.id, e.target.value as any)}
                      className="text-xs rounded-lg bg-slate-900 border border-slate-800 p-2 text-slate-300 focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  {/* Link commit button */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-transparent mb-1">Action</span>
                    <button
                      onClick={() => handleLinkCommit(task.id)}
                      className="flex items-center gap-1 px-2.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-lg text-xs transition-all"
                      title="Link Git Commit Hash"
                    >
                      <LinkIcon className="h-3 w-3" />
                      {task.commitHash ? 'Relink' : 'Link Commit'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Health (Right Side) */}
        <div className="space-y-6">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Play className="h-4.5 w-4.5 text-emerald-400" />
              CI/CD Pipeline Status
            </h2>
            
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200">Build #1402 - Master</p>
                  <p className="text-[10px] text-slate-500 truncate">Passed 142 Unit tests & Linting (oxlint)</p>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200">Security Scan #890</p>
                  <p className="text-[10px] text-red-400 font-medium truncate">1 Critical vulnerability flagged (dependabot)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pull Requests */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <GitPullRequest className="h-5 w-5 text-indigo-400" />
              <h2 className="text-base font-bold text-slate-200">Active Pull Requests</h2>
            </div>

            <div className="space-y-3">
              {prs.map(pr => (
                <div key={pr.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-800 transition-all">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      <span className="text-slate-500 font-mono mr-1">{pr.id}</span>
                      {pr.title}
                    </p>
                    <p className="text-[10px] text-slate-500">By {pr.author}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      pr.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {pr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Branch history */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <GitBranch className="h-4.5 w-4.5 text-blue-400" />
          Git Branch Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5">Branch</th>
                <th className="py-2.5">Last Commit</th>
                <th className="py-2.5">Commit Message</th>
                <th className="py-2.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {branches.map(br => (
                <tr key={br.name} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-200">{br.name}</td>
                  <td className="py-3 font-mono text-blue-400">{br.commit}</td>
                  <td className="py-3 text-slate-400">{br.msg}</td>
                  <td className="py-3 text-slate-500">{br.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTasks;
