import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import OrganizationDashboard from "./pages/module2/OrganizationDashboard";
import CreateOrganization from "./pages/module2/CreateOrganization";
import OrganizationDetails from "./pages/module2/OrganizationDetails";
import TeamManagement from "./pages/module2/TeamManagement";
import CreateTeam from "./pages/module2/CreateTeam";
import TeamDetails from "./pages/module2/TeamDetails";
import InviteMembers from "./pages/module2/InviteMembers";
import MembersList from "./pages/module2/MembersList";
import AcceptInvite from "./pages/module2/AcceptInvite";

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/organizations" replace />} />
            <Route path="/login" element={<Navigate to="/organizations" replace />} />
            <Route path="/organizations" element={<OrganizationDashboard />} />
            <Route path="/organizations/create" element={<CreateOrganization />} />
            <Route path="/organizations/details" element={<OrganizationDetails />} />
            <Route path="/organizations/details/:orgId" element={<OrganizationDetails />} />
            <Route path="/teams" element={<TeamManagement />} />
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/teams/details" element={<TeamDetails />} />
            <Route path="/teams/details/:teamId" element={<TeamDetails />} />
            <Route path="/members" element={<MembersList />} />
            <Route path="/members/invite" element={<InviteMembers />} />
            <Route path="/invite/accept/:token" element={<AcceptInvite />} />
            <Route path="*" element={<Navigate to="/organizations" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
