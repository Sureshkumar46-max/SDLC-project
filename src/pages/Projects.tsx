import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  ListTodo,
  TrendingDown,
  Users,
  Calendar,
  FolderOpen
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  assigneeAvatar?: string;
  column: 'todo' | 'inprogress' | 'review' | 'done';
}

interface BacklogItem {
  id: string;
  title: string;
  points: number;
  priority: 'High' | 'Medium' | 'Low';
  sprint: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'PM-101',
    title: 'Configure JWT Auth Middleware',
    description: 'Implement secure mock token creation, verification checks, and session clearance paths.',
    priority: 'High',
    assignee: 'Linus Torvalds',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    column: 'inprogress'
  },
  {
    id: 'PM-102',
    title: 'Audit Organization Role Matrices',
    description: 'Verify 6 role mappings to modules to ensure strict enforcement of authorization parameters.',
    priority: 'Medium',
    assignee: 'Sarah Connor',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    column: 'review'
  },
  {
    id: 'PM-103',
    title: 'Write QA Test Suites for Auth',
    description: 'Verify behavior when unauthorized roles access admin routes (must get redirected to 403 pages).',
    priority: 'High',
    assignee: 'Ada Lovelace',
    assigneeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
    column: 'todo'
  },
  {
    id: 'PM-104',
    title: 'Initialize Workspace Layout UI',
    description: 'Generate responsive sidebar containing context badging, header user settings, and main shell grid.',
    priority: 'Low',
    assignee: 'Marcus Aurelius',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    column: 'done'
  }
];

const INITIAL_BACKLOG: BacklogItem[] = [
  { id: 'BACK-001', title: 'Setup Redis connection pools for API throttling', points: 8, priority: 'High', sprint: 'Sprint 15 (Backlog)' },
  { id: 'BACK-002', title: 'Implement dark/light mode toggle with Tailwind classes', points: 3, priority: 'Low', sprint: 'Sprint 15 (Backlog)' },
  { id: 'BACK-003', title: 'Design customer support live chat popup widget', points: 5, priority: 'Medium', sprint: 'Sprint 16 (Future)' },
  { id: 'BACK-004', title: 'Database schema migration to support tenant audit logs', points: 13, priority: 'High', sprint: 'Sprint 15 (Backlog)' }
];

export const Projects: React.FC = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [backlog, setBacklog] = useState<BacklogItem[]>(INITIAL_BACKLOG);
  const [activeTab, setActiveTab] = useState<'kanban' | 'backlog'>('kanban');
  
  // Task creation state
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleMoveTask = (taskId: string, direction: 'forward' | 'backward') => {
    const columns: ('todo' | 'inprogress' | 'review' | 'done')[] = ['todo', 'inprogress', 'review', 'done'];
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id !== taskId) return task;
        
        const currentIndex = columns.indexOf(task.column);
        let newIndex = currentIndex;
        
        if (direction === 'forward' && currentIndex < columns.length - 1) {
          newIndex += 1;
        } else if (direction === 'backward' && currentIndex > 0) {
          newIndex -= 1;
        }
        
        return { ...task, column: columns[newIndex] };
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newTask: Task = {
      id: `PM-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      assignee: currentUser?.name || 'Unassigned',
      assigneeAvatar: currentUser?.avatarUrl,
      column: 'todo'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTitle('');
    setNewDesc('');
    setNewPriority('Medium');
    setIsCreating(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Simulated drag-to-sprint / plan in sprint function
  const handlePlanInSprint = (backlogId: string) => {
    const item = backlog.find(b => b.id === backlogId);
    if (!item) return;

    // Create the task card on the board
    const newTask: Task = {
      id: `PM-${item.id.split('-')[1]}`,
      title: item.title,
      description: `Backlog refinement item. Original estimate: ${item.points} story points. Priority: ${item.priority}.`,
      priority: item.priority,
      assignee: 'Unassigned',
      column: 'todo'
    };

    setTasks(prev => [...prev, newTask]);
    setBacklog(prev => prev.filter(b => b.id !== backlogId));
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Low':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
  };

  const columnsList = [
    { key: 'todo' as const, name: 'To Do', border: 'border-t-slate-500' },
    { key: 'inprogress' as const, name: 'In Progress', border: 'border-t-blue-500' },
    { key: 'review' as const, name: 'In Review', border: 'border-t-amber-500' },
    { key: 'done' as const, name: 'Done', border: 'border-t-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Workspace projects</h1>
          <p className="text-xs text-slate-400">Track milestones, sprint capacity, and check board deliverables.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'kanban'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('backlog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'backlog'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListTodo className="h-3.5 w-3.5" />
            Sprint Backlog & Planning
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {activeTab === 'kanban' && (
        <div className="space-y-6">
          {/* Create Task Toggle */}
          {currentUser?.role !== 'Client/Stakeholder' && (
            <div className="flex justify-end">
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all shadow-md shadow-blue-500/10"
              >
                <Plus className="h-4 w-4" />
                Create Task
              </button>
            </div>
          )}

          {/* Creation Modal / Inline Form */}
          {isCreating && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-w-lg">
              <h3 className="text-sm font-bold text-slate-200">Create New Workspace Task</h3>
              <form onSubmit={handleAddTask} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g. Implement OIDC scopes"
                    className="w-full text-sm rounded-lg bg-slate-950 border border-slate-800 p-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="Details about task requirements..."
                    className="w-full text-sm rounded-lg bg-slate-950 border border-slate-800 p-2 text-white focus:outline-none focus:border-blue-500 h-20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="text-sm rounded-lg bg-slate-950 border border-slate-800 p-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columnsList.map(col => {
              const colTasks = tasks.filter(t => t.column === col.key);
              return (
                <div
                  key={col.key}
                  className={`rounded-xl bg-slate-900 border border-slate-800/80 p-4 min-h-[500px] flex flex-col space-y-4 border-t-4 ${col.border}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{col.name}</span>
                    <span className="text-xs bg-slate-950 px-2 py-0.5 border border-slate-800 rounded-full text-slate-400 font-semibold">
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Tasks list */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {colTasks.map(task => (
                      <div
                        key={task.id}
                        className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 shadow-sm transition-all duration-200 group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-slate-500">{task.id}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white leading-tight">
                            {task.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-normal line-clamp-3">
                            {task.description}
                          </p>
                        </div>

                        {/* Task Footer / Assignee / Interactivity */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900/80">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {task.assigneeAvatar ? (
                              <img
                                src={task.assigneeAvatar}
                                alt={task.assignee}
                                className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-800"
                              />
                            ) : (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-300 font-semibold ring-1 ring-slate-700">
                                {task.assignee.charAt(0)}
                              </div>
                            )}
                            <span className="text-[10px] text-slate-400 truncate font-medium">{task.assignee}</span>
                          </div>

                          {/* Direction Controls */}
                          <div className="flex items-center gap-1">
                            {col.key !== 'todo' && (
                              <button
                                onClick={() => handleMoveTask(task.id, 'backward')}
                                className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
                                title="Move back"
                              >
                                <ArrowLeft className="h-3 w-3" />
                              </button>
                            )}
                            {col.key !== 'done' && (
                              <button
                                onClick={() => handleMoveTask(task.id, 'forward')}
                                className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
                                title="Move forward"
                              >
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}
                            {currentUser?.role === 'Super Admin' && (
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                                title="Delete task"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {colTasks.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800/80 rounded-lg text-slate-600">
                        <p className="text-xs">No tasks in column</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SPRINT PLANNING & RESOURCE CAPACITY VIEW (PM VIEW) */}
      {activeTab === 'backlog' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Backlog Planning Section (Left 2/3) */}
          <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-amber-500" />
                Sprint Backlog Refinement
              </h2>
              <span className="text-xs text-slate-400 font-semibold">{backlog.length} Backlog Items</span>
            </div>

            <div className="space-y-3">
              {backlog.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-800 hover:bg-slate-950 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-500">{item.id}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{item.sprint}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200 truncate pr-4">{item.title}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400 font-bold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                      {item.points} pts
                    </span>
                    <button
                      onClick={() => handlePlanInSprint(item.id)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition-all shadow-md"
                    >
                      Plan in Sprint
                    </button>
                  </div>
                </div>
              ))}

              {backlog.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-lg text-slate-600">
                  <p className="text-xs font-semibold">Backlog is fully planned!</p>
                  <p className="text-[10px] text-slate-500 mt-1">All items have been moved into active sprint Kanban cards.</p>
                </div>
              )}
            </div>
          </div>

          {/* PM Metrics & Burndown Chart (Right 1/3) */}
          <div className="space-y-6">
            
            {/* Resource Capacity Utilization */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-blue-400" />
                Resource Allocation capacity
              </h2>

              <div className="space-y-4">
                {/* Dev Team: 95% utilized */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Developer Team</span>
                    <span className="text-red-400 font-bold">95% (Warning)</span>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                {/* QA Team: 85% utilized */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">QA / Tester Team</span>
                    <span className="text-amber-400 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Design Team: 80% utilized */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Design Team</span>
                    <span className="text-indigo-400 font-bold">80%</span>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                {/* DevOps: 40% utilized */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">DevOps & Cloud Infrastructure</span>
                    <span className="text-slate-400">40%</span>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2">
                    <div className="bg-slate-700 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Burndown Chart & Velocity */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <TrendingDown className="h-4.5 w-4.5 text-indigo-400" />
                Sprint Burndown Metrics
              </h2>

              {/* SVG Burndown line chart representation */}
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-850 flex flex-col justify-center">
                <svg className="w-full h-28" viewBox="0 0 100 40">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.25" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#1e293b" strokeWidth="0.25" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#1e293b" strokeWidth="0.25" />
                  {/* Planned Burndown line (grey dashed) */}
                  <line x1="0" y1="5" x2="100" y2="35" stroke="#475569" strokeWidth="1" strokeDasharray="2" />
                  {/* Actual Burndown line (blue solid) */}
                  <path d="M 0 5 L 20 12 L 40 18 L 60 17 L 80 28 L 100 32" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                  {/* Dots for actual points */}
                  <circle cx="0" cy="5" r="1" fill="#2563eb" />
                  <circle cx="20" cy="12" r="1" fill="#2563eb" />
                  <circle cx="40" cy="18" r="1" fill="#2563eb" />
                  <circle cx="60" cy="17" r="1" fill="#2563eb" />
                  <circle cx="80" cy="28" r="1" fill="#2563eb" />
                  <circle cx="100" cy="32" r="1" fill="#2563eb" />
                </svg>
                <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1 px-1">
                  <span>Day 1</span>
                  <span>Day 5</span>
                  <span>Day 10 (Sprint End)</span>
                </div>
              </div>

              {/* Sprint Velocity dashboard */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Sprint Points</p>
                  <p className="text-base font-extrabold text-white">80 pts total</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Day Velocity</p>
                  <p className="text-base font-extrabold text-blue-400">8.2 pts/day</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Target Completion</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    On Schedule
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Projects;
