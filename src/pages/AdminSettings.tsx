import React from 'react';
import { Settings, Shield, Key, Eye } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const auditLogs = [
    { event: 'IAM Role Policy Modified', user: 'Sarah Connor', ip: '192.168.1.42', date: 'Jul 09, 09:12 AM' },
    { event: 'User Invitation Dispatched', user: 'Alex Mercer', ip: '10.0.4.15', date: 'Jul 08, 04:30 PM' },
    { event: 'OAuth Client Credentials Rotated', user: 'Alex Mercer', ip: '10.0.4.15', date: 'Jul 08, 04:22 PM' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Settings className="h-6.5 w-6.5 text-purple-400" />
          Admin & Org Settings
        </h1>
        <p className="text-xs text-slate-400">Configure global workspace parameters, manage enterprise billing targets, and inspect security audit files.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace Configurations */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="h-5 w-5 text-purple-400" />
            <h2 className="text-base font-bold text-slate-200">Global Security Toggles</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-200">Enforce Multi-Factor Auth (MFA)</p>
                <p className="text-[10px] text-slate-500">Require all organizational members to complete 2FA verify.</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-200">Enforce Domain Whitelisting</p>
                <p className="text-[10px] text-slate-500">Restrict team sign-ups to authorized corporate emails.</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-200">Persistent Session Expiry (24h)</p>
                <p className="text-[10px] text-slate-500">Invalidate mock JWT strings stored in client cookie space.</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Summary */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <Key className="h-4.5 w-4.5 text-purple-400" />
            API & Client Keys
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            NeuroForge interfaces are secured via SHA-256 web tokens. Administrators can rotate system signatures or generate workspace deployment tokens below.
          </p>

          <div className="space-y-2">
            <button className="w-full py-2 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-lg text-xs transition-colors">
              Rotate JWT Signature Keys
            </button>
            <button className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-semibold rounded-lg text-xs transition-colors">
              Generate Service Account Key
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Eye className="h-4.5 w-4.5 text-slate-400" />
          Workspace Audit Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5">Event</th>
                <th className="py-2.5">User</th>
                <th className="py-2.5">Client IP</th>
                <th className="py-2.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {auditLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-200">{log.event}</td>
                  <td className="py-3 text-slate-400">{log.user}</td>
                  <td className="py-3 font-mono text-slate-500">{log.ip}</td>
                  <td className="py-3 text-slate-500">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
