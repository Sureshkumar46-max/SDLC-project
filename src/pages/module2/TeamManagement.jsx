import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
import WorkspaceLayout from "../../components/WorkspaceLayout";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { teamStatusOptions } from "../../data/module2Data";
import { useWorkspace } from "../../context/WorkspaceContext";

function TeamManagement() {
  const { orgTeams } = useWorkspace();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredTeams = useMemo(() => {
    return orgTeams.filter((team) => {
      const matchesSearch = `${team.name} ${team.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || team.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [orgTeams, search, status]);

  return (
    <WorkspaceLayout
      title="Team management"
      subtitle="Create a new team, monitor delivery groups and keep membership aligned with your org structure."
      actions={
        <Link to="/teams/create">
          <Button icon={Plus}>Create team</Button>
        </Link>
      }
    >
      <Card title="Delivery teams">
        <div className="filter-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
            <Search size={16} color="var(--ink-soft)" aria-hidden="true" />
            <label htmlFor="team-search" className="visually-hidden">
              Search teams
            </label>
            <input
              id="team-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team"
              aria-label="Search teams"
            />
          </div>
          <div className="filter-control status-filter-control" style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "220px" }}>
            <Filter size={16} color="var(--ink-soft)" aria-hidden="true" />
            <label htmlFor="status-filter" className="visually-hidden">
              Filter by status
            </label>
            <select
              className="status-filter-select"
              id="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              {teamStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="data-table">
          <caption className="visually-hidden">Delivery team overview for current organization</caption>
          <thead>
            <tr>
              <th scope="col">Team</th>
              <th scope="col">Lead</th>
              <th scope="col">Members</th>
              <th scope="col">Projects</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <strong>{team.name}</strong>
                    <div style={{ color: "var(--ink-soft)", fontSize: "0.84rem" }}>{team.description}</div>
                  </td>
                  <td>{team.lead}</td>
                  <td>{team.members}</td>
                  <td>{team.projects}</td>
                  <td>
                    <span className={`status-badge ${team.status === "Active" ? "status-active" : team.status === "Planning" ? "status-planning" : "status-pending"}`}>
                      {team.status}
                    </span>
                  </td>
                  <td>
                    <Link className="text-link" to={`/teams/details/${team.id}`}>
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "18px 10px", color: "var(--ink-soft)" }}>
                  No teams match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </WorkspaceLayout>
  );
}

export default TeamManagement;
