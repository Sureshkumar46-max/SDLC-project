import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { organizations as defaultOrgs, teams as defaultTeams, members as defaultMembers } from "../data/module2Data";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "nf_workspace_state";
const WorkspaceContext = createContext(null);

function loadSavedState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse workspace state", error);
    return null;
  }
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function WorkspaceProvider({ children }) {
  const { user } = useAuth();
  const [state, setState] = useState(() => {
    const saved = loadSavedState();
    if (saved) return saved;

    return {
      organizations: defaultOrgs,
      teams: defaultTeams,
      members: defaultMembers,
      invites: [],
      currentOrgId: defaultOrgs[0]?.id || null,
    };
  });

  useEffect(() => {
    if (user?.orgId && state.currentOrgId !== user.orgId) {
      setState((prev) => ({ ...prev, currentOrgId: user.orgId }));
    }
  }, [state.currentOrgId, user?.orgId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const organizations = useMemo(() => state.organizations, [state.organizations]);
  const teams = useMemo(() => state.teams, [state.teams]);
  const members = useMemo(() => state.members, [state.members]);
  const invites = useMemo(() => state.invites, [state.invites]);
  const currentOrgId = state.currentOrgId;

  const currentOrg = useMemo(
    () => organizations.find((org) => org.id === currentOrgId) || organizations[0] || null,
    [organizations, currentOrgId]
  );

  const orgTeams = useMemo(
    () => teams.filter((team) => team.orgId === currentOrgId),
    [teams, currentOrgId]
  );

  const orgMembers = useMemo(
    () => members.filter((member) => member.orgId === currentOrgId),
    [members, currentOrgId]
  );

  const orgInvites = useMemo(
    () => invites.filter((invite) => invite.orgId === currentOrgId),
    [invites, currentOrgId]
  );

  const setCurrentOrg = (orgId) => {
    if (!orgId) return;
    setState((prev) => ({ ...prev, currentOrgId: orgId }));
  };

  const createOrganization = ({ name, description, industry, companySize }) => {
    const id = generateSlug(name) || `org-${Date.now()}`;
    const newOrg = {
      id,
      name,
      description,
      industry,
      companySize,
      location: "Remote",
      logo: name
        .split(" ")
        .map((item) => item[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      status: "Active",
      teams: 0,
      members: 0,
      projects: 0,
    };

    setState((prev) => ({
      ...prev,
      organizations: [...prev.organizations, newOrg],
      currentOrgId: id,
    }));
    return newOrg;
  };

  const createTeam = ({ name, description, lead, members: teamMembers }) => {
    const id = generateSlug(name) || `team-${Date.now()}`;
    const newTeam = {
      id,
      orgId: currentOrg?.id || organizations[0]?.id,
      name,
      description,
      lead,
      members: teamMembers.length,
      projects: 0,
      status: "Planning",
    };

    setState((prev) => ({
      ...prev,
      teams: [...prev.teams, newTeam],
      organizations: prev.organizations.map((org) =>
        org.id === newTeam.orgId
          ? { ...org, teams: org.teams + 1 }
          : org
      ),
    }));
    return newTeam;
  };

  const sendInvite = ({ email, role, team }) => {
    const invite = {
      id: `${Date.now()}`,
      token: generateToken(),
      orgId: currentOrg?.id || organizations[0]?.id,
      email,
      role,
      team,
      status: "Pending",
      sentAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      invites: [...prev.invites, invite],
    }));

    return invite;
  };

  const acceptInvite = ({ token, name }) => {
    const invite = state.invites.find((item) => item.token === token && item.status === "Pending");
    if (!invite) return null;

    const member = {
      id: `${Date.now()}`,
      name,
      email: invite.email,
      role: invite.role,
      team: invite.team,
      status: "Active",
      orgId: invite.orgId,
      avatar: invite.email
        .split("@")[0]
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    setState((prev) => ({
      ...prev,
      invites: prev.invites.map((item) =>
        item.token === token ? { ...item, status: "Accepted", acceptedAt: new Date().toISOString() } : item
      ),
      members: [...prev.members, member],
      organizations: prev.organizations.map((org) =>
        org.id === invite.orgId ? { ...org, members: org.members + 1 } : org
      ),
    }));

    return member;
  };

  return (
    <WorkspaceContext.Provider
      value={{
        organizations,
        teams,
        members,
        invites,
        currentOrg,
        currentOrgId,
        orgTeams,
        orgMembers,
        orgInvites,
        setCurrentOrg,
        createOrganization,
        createTeam,
        sendInvite,
        acceptInvite,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
