import { useState } from 'react';
import { Trash2, Edit2, UserPlus, Save, X } from 'lucide-react';
import './Edit.css';

const Edit = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Home Cleaning Service",
      description: "Professional cleaning for homes and apartments",
      price: "$50/hour",
      members: [
        { id: 1, name: "John Smith", role: "Lead Cleaner", email: "john@example.com" },
        { id: 2, name: "Sarah Johnson", role: "Assistant", email: "sarah@example.com" }
      ]
    },
    {
      id: 2,
      title: "Tutoring Services",
      description: "Math and Science tutoring for students",
      price: "$40/hour",
      members: [
        { id: 3, name: "Michael Chen", role: "Math Tutor", email: "michael@example.com" }
      ]
    }
  ]);

  const [selectedListing, setSelectedListing] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedListing, setEditedListing] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    setEditedListing({ ...listing });
    setEditMode(false);
    setShowAddMember(false);
  };

  const handleDeleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
      if (selectedListing?.id === id) {
        setSelectedListing(null);
      }
    }
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setEditedListing({
        ...editedListing,
        members: editedListing.members.filter(m => m.id !== memberId)
      });
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.role && newMember.email) {
      const member = {
        id: Date.now(),
        ...newMember
      };
      setEditedListing({
        ...editedListing,
        members: [...editedListing.members, member]
      });
      setNewMember({ name: '', role: '', email: '' });
      setShowAddMember(false);
    }
  };

  const handleSaveChanges = () => {
    setListings(listings.map(l => l.id === editedListing.id ? editedListing : l));
    setSelectedListing(editedListing);
    setEditMode(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="edit-container">
      <div className="edit-header">
        <h1>Manage Job Listings</h1>
        <p>Select a listing to view members and make changes</p>
      </div>

      <div className="edit-content">
        {/* Listings Sidebar */}
        <div className="listings-sidebar">
          <h2>Your Listings</h2>
          {listings.map(listing => (
            <div
              key={listing.id}
              className={`listing-card ${selectedListing?.id === listing.id ? 'active' : ''}`}
              onClick={() => handleSelectListing(listing)}
            >
              <div className="listing-info">
                <h3>{listing.title}</h3>
                <p className="listing-price">{listing.price}</p>
                <p className="member-count">{listing.members.length} member(s)</p>
              </div>
              <button
                className="delete-listing-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteListing(listing.id);
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="details-panel">
          {selectedListing ? (
            <>
              <div className="panel-header">
                <h2>{editMode ? 'Edit Listing' : selectedListing.title}</h2>
                {!editMode && (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    <Edit2 size={18} />
                    Edit Listing
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editedListing.title}
                      onChange={(e) => setEditedListing({ ...editedListing, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={editedListing.description}
                      onChange={(e) => setEditedListing({ ...editedListing, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={editedListing.price}
                      onChange={(e) => setEditedListing({ ...editedListing, price: e.target.value })}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSaveChanges}>
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="listing-details">
                  <p className="description">{selectedListing.description}</p>
                  <p className="price-detail">Price: {selectedListing.price}</p>
                </div>
              )}

              {/* Members Section */}
              <div className="members-section">
                <div className="members-header">
                  <h3>Team Members</h3>
                  <button className="add-member-btn" onClick={() => setShowAddMember(!showAddMember)}>
                    <UserPlus size={18} />
                    Add Member
                  </button>
                </div>

                {showAddMember && (
                  <div className="add-member-form">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                    <div className="add-member-actions">
                      <button className="confirm-add-btn" onClick={handleAddMember}>Add</button>
                      <button className="cancel-add-btn" onClick={() => setShowAddMember(false)}>Cancel</button>
                    </div>
                  </div>
                )}

                <div className="members-list">
                  {editedListing.members.map(member => (
                    <div key={member.id} className="member-card">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                        <p className="member-role">{member.role}</p>
                        <p className="member-email">{member.email}</p>
                      </div>
                      <button
                        className="delete-member-btn"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a listing from the sidebar to view and edit details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;