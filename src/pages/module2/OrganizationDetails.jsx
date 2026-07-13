import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Building2, Users, FolderKanban, PencilLine } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useWorkspace } from "../../context/WorkspaceContext";

function OrganizationDetails() {
  const { orgId } = useParams();
  const { organizations, currentOrg } = useWorkspace();

  const organization = useMemo(
    () => organizations.find((org) => org.id === orgId) || currentOrg || organizations[0],
    [orgId, organizations, currentOrg]
  );

  return (
    <WorkspaceLayout
      title="Organization details"
      subtitle="Review the operating profile, scale and team footprint of the selected organization."
      actions={
        <Button icon={PencilLine} variant="secondary" className="organization-edit-btn">
          Edit
        </Button>
      }
    >
      <div className="detail-grid">
        <Card title={organization.name}>
          <div className="org-card" style={{ padding: 0, gap: "10px" }}>
            <div className="org-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="org-logo">{organization.logo}</div>
                <div>
                  <h4>{organization.name}</h4>
                  <p>{organization.location}</p>
                </div>
              </div>
              <span className={`status-badge ${organization.status === "Active" ? "status-active" : "status-planning"}`}>
                {organization.status}
              </span>
            </div>
            <p>{organization.description}</p>
            <div className="pill-row">
              <span className="pill">Industry: {organization.industry}</span>
              <span className="pill">Size: {organization.companySize}</span>
            </div>
          </div>
        </Card>

        <Card title="Key metrics">
          <div className="stats-grid" style={{ gridTemplateColumns: "1fr" }}>
            <div className="metric-card">
              <div className="metric-icon metric-icon-blue"><Building2 size={18} /></div>
              <strong>{organization.teams}</strong>
              <span>Teams count</span>
            </div>
            <div className="metric-card">
              <div className="metric-icon metric-icon-amber"><Users size={18} /></div>
              <strong>{organization.members}</strong>
              <span>Members count</span>
            </div>
            <div className="metric-card">
              <div className="metric-icon metric-icon-green"><FolderKanban size={18} /></div>
              <strong>{organization.projects}</strong>
              <span>Projects count</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Quick actions">
        <div className="form-actions">
          <Link to="/teams">
            <Button variant="secondary">Open team management</Button>
          </Link>
          <Link to="/members/invite">
            <Button>Invite members</Button>
          </Link>
        </div>
      </Card>
    </WorkspaceLayout>
  );
}

export default OrganizationDetails;
