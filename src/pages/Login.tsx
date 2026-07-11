import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, MOCK_CREDENTIALS } from '../context/AuthContext';
import { LogIn, Key, Mail, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);

  // Get destination path from state (redirect after login) or default to /dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If already logged in, redirect immediately
  React.useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  // Client-side validations
  const validateEmail = (val: string) => {
    if (!val) {
      setEmailError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Please enter a valid email address (e.g. user@domain.com).');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('Password is required.');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate both inputs before calling auth function
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please verify credentials and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Triggers login automatically on clicking a mock profile
  const handleQuickLogin = async (index: number) => {
    if (isSubmitting) return;

    const cred = MOCK_CREDENTIALS[index];
    setEmail(cred.email);
    setPassword(cred.password);
    setSelectedRoleIndex(index);
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    setIsSubmitting(true);

    try {
      const success = await login(cred.email, cred.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please verify credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* LEFT SIDE: Decorative Showcase (Visible on md+) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 p-12 overflow-hidden border-r border-slate-800 md:flex">
        {/* Abstract Background Accents */}
        <div className="absolute top-[-20%] left-[-20%] h-[70%] w-[70%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-500/10 blur-[100px]"></div>
        
        {/* Brand */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white shadow-lg shadow-blue-500/25">
            N
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">NeuroForge</span>
            <span className="block text-[10px] uppercase tracking-wider text-blue-400 font-semibold">AI-First Enterprise SDLC Platform</span>
          </div>
        </div>

        {/* Feature Teaser Cards */}
        <div className="my-auto space-y-8 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
            Supercharge your enterprise development workflow.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Collaborate on sprint backlogs, track build pipelines, monitor client roadmaps, and enforce organization permissions in one centralized command center.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-blue-400 mb-2" />
              <h3 className="text-sm font-semibold text-slate-200">Role-Based Access</h3>
              <p className="text-xs text-slate-500 mt-1">Granular RBAC with 6 predefined organizational roles.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <LogIn className="h-5 w-5 text-emerald-400 mb-2" />
              <h3 className="text-sm font-semibold text-slate-200">Jira-style Board</h3>
              <p className="text-xs text-slate-500 mt-1">Interactive Kanban board with fluid drag indicators.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 z-10 flex justify-between">
          <span>&copy; 2026 NeuroForge Inc. All rights reserved.</span>
          <span>v1.4.0-stable</span>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Login & Tenant Switcher */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:px-8 xl:px-16 bg-slate-950">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Sign in to workspace
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Enter credentials manually or select a profile below to log in instantly.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-400 animate-shake shadow-lg shadow-red-500/5">
                <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="email-address" className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className={`h-4 w-4 ${emailError ? 'text-red-400' : 'text-slate-500'}`} />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onBlur={(e) => validateEmail(e.target.value)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                      setSelectedRoleIndex(null);
                    }}
                    className={`block w-full rounded-lg border bg-slate-900/50 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-1 transition-all duration-200 ${
                      emailError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                    placeholder="name@enterprise.com"
                  />
                </div>
                {emailError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Key className={`h-4 w-4 ${passwordError ? 'text-red-400' : 'text-slate-500'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isSubmitting}
                    value={password}
                    onBlur={(e) => validatePassword(e.target.value)}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                      setSelectedRoleIndex(null);
                    }}
                    className={`block w-full rounded-lg border bg-slate-900/50 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-1 transition-all duration-200 ${
                      passwordError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                    } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">{passwordError}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Enter Workspace
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Quick Login Section */}
          <div className="mt-6 border-t border-slate-900/80 pt-6">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-2 text-slate-500 font-semibold tracking-wider">
                Demo Login Profiles
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {MOCK_CREDENTIALS.map((cred, idx) => (
                <button
                  key={cred.user.role}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleQuickLogin(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all duration-150 ${
                    selectedRoleIndex === idx
                      ? 'border-blue-500 bg-blue-500/5 text-blue-300'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-slate-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed hover:border-slate-800 hover:bg-slate-900/30' : ''}`}
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold truncate leading-tight">
                      {cred.user.role}
                    </p>
                    <p className="text-[9px] text-slate-500 truncate leading-tight mt-0.5">
                      {cred.user.name}
                    </p>
                  </div>
                  {selectedRoleIndex === idx && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
