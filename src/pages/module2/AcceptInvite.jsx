import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import { useWorkspace } from "../../context/WorkspaceContext";

function AcceptInvite() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { acceptInvite, invites } = useWorkspace();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);

  const invite = invites.find((item) => item.token === token);

  useEffect(() => {
    if (!invite) {
      setStatus({ type: "error", message: "Invite not found or already accepted." });
    }
  }, [invite]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setStatus({ type: "error", message: "Please enter your full name to accept the invitation." });
      return;
    }

    const member = acceptInvite({ token, name });
    if (!member) {
      setStatus({ type: "error", message: "Invite not found or already accepted." });
      return;
    }

    setStatus({ type: "success", message: `Welcome aboard, ${member.name}! You have joined ${invite.orgId}.` });
    setTimeout(() => navigate("/members"), 1400);
  };

  return (
    <AuthLayout>
      <h2>Accept invitation</h2>
      <p className="auth-sub">Accept your invite and join the organization workspace.</p>

      {status && (
        <p className={status.type === "error" ? "error-text" : "success-text"}>
          {status.type === "error" ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />} {status.message}
        </p>
      )}

      {invite ? (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="full-width">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="full-width">
              <p>
                You are accepting an invitation for <strong>{invite.email}</strong> into <strong>{invite.orgId}</strong>.
              </p>
              <p>
                Role: <strong>{invite.role}</strong>, Team: <strong>{invite.team}</strong>
              </p>
            </div>
          </div>

          <Button type="submit">Accept invite</Button>
        </form>
      ) : (
        <div className="auth-card">
          <p>Invite not found or already accepted.</p>
          <Button variant="secondary" onClick={() => navigate("/")}>Return to login</Button>
        </div>
      )}
    </AuthLayout>
  );
}

export default AcceptInvite;
