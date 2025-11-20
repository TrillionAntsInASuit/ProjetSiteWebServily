import "./Services.css";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, userType, onJoin, onDelete, editLink }) {
  const percentage = (service.nb_membres / service.maxMembres) * 100;
  const isFull = service.nb_membres >= service.maxMembres;

  return (
    <div className="service-card">
      <h2>{service.name}</h2>
      <p className="service-type">Type: {service.type}</p>

      <div className="members-info">
        <span className="members-count">
          <strong>{service.nb_membres}</strong> / {service.maxMembres}
        </span>
      </div>

      <div className="progress-bar-container">
        <div className={`progress-bar ${isFull ? "full" : ""}`} style={{ width: `${percentage}%` }} />
      </div>

      {isFull && <span className="full-badge">Full</span>}

      {userType === "client" && onJoin && (
        <button className="joinBtn" onClick={onJoin}>Join</button>
      )}

      {userType !== "client" && !onJoin && (
        <button className="joinBtn" disabled={isFull}>siuuu</button>
      )}

      {editLink && <Link to={editLink}><button className="editBtn">Edit</button></Link>}
      {onDelete && <button className="deleteBtn" onClick={onDelete}>Delete</button>}
    </div>
  );
}