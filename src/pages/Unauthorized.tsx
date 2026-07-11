import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home, LifeBuoy } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Animated Warning Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10 opacity-75"></div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-500 shadow-xl shadow-red-500/5">
              <ShieldAlert className="h-10 w-10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            403 - Access Denied
          </h1>
          <p className="text-sm font-medium text-red-400">
            RESTRICTED ROUTE
          </p>
          <p className="mx-auto max-w-sm text-sm text-slate-400">
            Your assigned role does not have the required permissions to access this workspace module.
          </p>
        </div>

        {/* Current user badge display */}
        {currentUser && (
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 max-w-xs mx-auto text-left space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Identity</p>
            <p className="text-sm font-semibold text-slate-300">{currentUser.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
              <span className="text-xs text-slate-400 font-medium">Role: {currentUser.role}</span>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold rounded-lg transition-all text-sm shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
          >
            <Home className="h-4 w-4" />
            Workspace Hub
          </button>
        </div>

        {/* Sub-footer contact details */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-6">
          <LifeBuoy className="h-3.5 w-3.5" />
          <span>Need access? Contact your System Administrator.</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
