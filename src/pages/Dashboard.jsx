import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Building2, Users, ShieldCheck, BarChart3,
  FolderKanban, ListChecks, GitPullRequest, Bug, Sparkles,
  FileText, Eye, LogOut, Settings, ChevronDown,
} from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

// Sidebar nav items + dashboard stat cards per role — mirrors the role
// table in the Module 1 blueprint spec (Jira / Azure DevOps style RBAC).
const roleConfig = {
  "Super Admin": {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Organizations", icon: Building2 },
      { label: "Platform analytics", icon: BarChart3 },
      { label: "Settings", icon: Settings },
    ],
    stats: [
      { title: "Organizations", desc: "Create and manage all organizations on the platform.", icon: Building2, color: "var(--blue)" },
      { title: "Platform analytics", desc: "Usage, plans, and system-wide health.", icon: BarChart3, color: "var(--amber)" },
      { title: "Billing & plans", desc: "Manage subscription tiers across orgs.", icon: ShieldCheck, color: "var(--green)" },
    ],
  },
  "Org Admin": {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Teams", icon: Users },
      { label: "Roles", icon: ShieldCheck },
      { label: "Org settings", icon: Settings },
    ],
    stats: [
      { title: "Teams", desc: "Create teams and invite members.", icon: Users, color: "var(--blue)" },
      { title: "Roles", desc: "Assign roles within your organization.", icon: ShieldCheck, color: "var(--amber)" },
      { title: "Org settings", desc: "Configure organization-wide preferences.", icon: Settings, color: "var(--green)" },
    ],
  },
  PM: {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Projects", icon: FolderKanban },
      { label: "Sprints", icon: ListChecks },
      { label: "Reports", icon: BarChart3 },
    ],
    stats: [
      { title: "Projects", desc: "Create projects and define requirements.", icon: FolderKanban, color: "var(--blue)" },
      { title: "Sprints", desc: "Plan sprints and assign tasks.", icon: ListChecks, color: "var(--amber)" },
      { title: "Reports", desc: "View release and progress reports.", icon: BarChart3, color: "var(--green)" },
    ],
  },
  Developer: {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "My tasks", icon: ListChecks },
      { label: "Code review", icon: GitPullRequest },
      { label: "Blockers", icon: Bug },
    ],
    stats: [
      { title: "My tasks", desc: "View tasks assigned to you.", icon: ListChecks, color: "var(--blue)" },
      { title: "Code review", desc: "Submit code for AI review, link commits.", icon: GitPullRequest, color: "var(--amber)" },
      { title: "Blockers", desc: "Log work and raise blockers.", icon: Bug, color: "var(--red)" },
    ],
  },
  QA: {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Test cases", icon: ListChecks },
      { label: "Bugs", icon: Bug },
      { label: "AI test generation", icon: Sparkles },
    ],
    stats: [
      { title: "Test cases", desc: "Create and execute test cases.", icon: ListChecks, color: "var(--blue)" },
      { title: "Bugs", desc: "Report bugs and verify fixes.", icon: Bug, color: "var(--red)" },
      { title: "AI test generation", desc: "Generate test cases automatically.", icon: Sparkles, color: "var(--amber)" },
    ],
  },
  Client: {
    nav: [
      { label: "Overview", icon: LayoutDashboard, active: true },
      { label: "Progress", icon: BarChart3 },
      { label: "Release notes", icon: FileText },
    ],
    stats: [
      { title: "Progress", desc: "View project progress and milestones.", icon: BarChart3, color: "var(--blue)" },
      { title: "Release notes", desc: "Read approved release documents.", icon: FileText, color: "var(--amber)" },
      { title: "Read-only access", desc: "You have viewer access — no editing.", icon: Eye, color: "var(--ink-soft)" },
    ],
  },
};

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const config = roleConfig[user?.role] || roleConfig.Developer;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name
    ?.split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <Logo />
        <div>
          <div className="nav-section">Menu</div>
          {config.nav.map((item) => (
            <a key={item.label} className={`nav-item ${item.active ? "active" : ""}`} href="#">
              <item.icon size={16} />
              {item.label}
            </a>
          ))}
        </div>
        <div className="sidebar-footer">
          <a className="nav-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            <LogOut size={16} />
            Logout
          </a>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <span className="role-chip">{user?.role}</span>
          <div className="dash-profile">
            <button
              className={`dash-profile-trigger ${profileOpen ? "open" : ""}`}
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span className="user-avatar">{initials}</span>
              <span className="dash-profile-copy">
                <strong>{user?.name || "Workspace User"}</strong>
                <small>{user?.role || "User"}</small>
              </span>
              <ChevronDown size={14} />
            </button>

            {profileOpen && (
              <div className="dash-profile-menu" role="menu">
                <strong>{user?.name || "Workspace User"}</strong>
                <small>{user?.role || "User"}</small>
                <button className="logout-btn" onClick={handleLogout} role="menuitem">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="dash-body">
          <div className="dash-welcome">
            <h1>Welcome, {user?.name?.split(" ")[0]}</h1>
            <p>Here's what's relevant to your role as {user?.role}.</p>
          </div>

          <div className="stat-grid">
            {config.stats.map((s, i) => (
              <div className="stat-card" key={s.title} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="stat-icon" style={{ background: `${s.color}1a`, color: s.color }}>
                  <s.icon size={18} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
