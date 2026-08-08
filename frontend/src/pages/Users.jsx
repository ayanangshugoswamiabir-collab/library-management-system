import { useEffect, useState } from "react";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../api/userApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  // View modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  // =====================================================
  // 3D interaction state
  // =====================================================
  // Ambient background parallax, driven by cursor position
  // relative to the whole page.
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Independent tilt rigs for the elements that get a
  // pointer-tracked "physical card" feel.
  const [totalTilt, setTotalTilt] = useState({ x: 0, y: 0 });
  const [tableTilt, setTableTilt] = useState({ x: 0, y: 0 });
  const [avatarTilt, setAvatarTilt] = useState({ x: 0, y: 0 });

  const makeTiltHandlers = (setter, intensity = 10) => ({
    onMouseMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      setter({ x: py * -intensity, y: px * intensity });
    },
    onMouseLeave: () => setter({ x: 0, y: 0 }),
  });

  const totalTiltHandlers = makeTiltHandlers(setTotalTilt, 12);
  const tableTiltHandlers = makeTiltHandlers(setTableTilt, 2.5);
  const avatarTiltHandlers = makeTiltHandlers(setAvatarTilt, 16);

  const handlePageParallax = (e) => {
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;

    setParallax({ x: px, y: py });
  };

  // =====================================================
  // Fetch Users
  // =====================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data.users || data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Initial Load
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      try {
        const data = await getUsers();

        if (!cancelled) {
          setUsers(data.users || data || []);
          setError("");
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load users. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // Helpers
  // =====================================================

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getRoleClass = (role) => {
    const normalizedRole = role?.toLowerCase();

    if (normalizedRole === "admin") return "role-admin";

    if (normalizedRole === "librarian") return "role-librarian";

    return "role-student";
  };

  // =====================================================
  // View
  // =====================================================

  const handleView = (user) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  // =====================================================
  // Edit
  // =====================================================

  const handleEdit = (user) => {
    setEditingUser(user);

    setEditForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "Student",
    });

    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      setActionLoading(true);
      setError("");

      await updateUser(editingUser._id, editForm);

      setShowEditModal(false);
      setEditingUser(null);

      await fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update user. Please try again."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // Delete
  // =====================================================

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      setActionLoading(true);
      setError("");

      await deleteUser(deletingUser._id);

      setShowDeleteModal(false);
      setDeletingUser(null);

      await fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-background-glow glow-one" />
        <div className="users-background-glow glow-two" />

        <div className="users-loading">
          <div className="loading-orb">
            <div className="loading-ring" />
            <span>U</span>
          </div>

          <h2>Loading Users</h2>
          <p>Preparing your library members...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // Main
  // =====================================================

  return (
    <>
      <div className="users-page" onMouseMove={handlePageParallax}>
        <div
          className="users-background-glow glow-one"
          style={{
            transform: `translate3d(${parallax.x * -34}px, ${
              parallax.y * -24
            }px, 0)`,
          }}
        />
        <div
          className="users-background-glow glow-two"
          style={{
            transform: `translate3d(${parallax.x * 28}px, ${
              parallax.y * 20
            }px, 0)`,
          }}
        />
        <div
          className="users-background-glow glow-three"
          style={{
            transform: `translate3d(${parallax.x * -20}px, ${
              parallax.y * 26
            }px, 0)`,
          }}
        />

        {/* HEADER */}

        <div className="users-header">
          <div
            style={{
              transform: `translate3d(${parallax.x * 6}px, ${
                parallax.y * 4
              }px, 0)`,
            }}
          >
            <div className="users-eyebrow">
              <span className="eyebrow-icon">✦</span>
              Library Management
            </div>

            <h1 className="users-title">
              Admin <span>Users</span>
            </h1>

            <p className="users-subtitle">
              Manage library members, permissions and account
              information from one place.
            </p>
          </div>

          <div
            className="total-users-card"
            {...totalTiltHandlers}
            style={{
              transform: `perspective(700px) rotateX(${totalTilt.x}deg) rotateY(${totalTilt.y}deg) translateZ(10px)`,
            }}
          >
            <div className="total-card-shine" />

            <div
              className="total-icon"
              style={{
                transform: `translateZ(28px) rotateX(${
                  totalTilt.x * 0.6
                }deg) rotateY(${totalTilt.y * 0.6}deg)`,
              }}
            >
              <span>♙</span>
            </div>

            <div style={{ transform: "translateZ(18px)" }}>
              <div className="total-number">{users.length}</div>

              <div className="total-label">TOTAL USERS</div>
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="users-error">
            <div className="error-symbol">!</div>

            <div>
              <strong>Something went wrong</strong>

              <p>{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY */}

        {!error && users.length === 0 && (
          <div className="empty-users">
            <div className="empty-orb">
              <span>♙</span>
            </div>

            <h2>No users found</h2>

            <p>
              There are currently no registered users in your
              library.
            </p>
          </div>
        )}

        {/* USERS TABLE */}

        {!error && users.length > 0 && (
          <div
            className="users-table-card"
            {...tableTiltHandlers}
            style={{
              transform: `perspective(1600px) rotateX(${tableTilt.x}deg) rotateY(${tableTilt.y}deg)`,
            }}
          >
            <div className="table-top">
              <div>
                <div className="table-heading-row">
                  <div className="mini-table-icon">♙</div>

                  <h2>Library Users</h2>
                </div>

                <p>
                  All registered members and their account
                  information
                </p>
              </div>

              <div className="member-count">
                <span>{users.length}</span> members
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>JOINED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-cell">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.name || "User"}
                              className="user-avatar-image"
                            />
                          ) : (
                            <div className="user-avatar">
                              {getInitials(user.name)}
                            </div>
                          )}

                          <div className="user-information">
                            <strong>
                              {user.name || "Unknown User"}
                            </strong>

                            <span>
                              ID: {user._id?.slice(-6) || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="user-email">
                          {user.email || "—"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`user-role ${getRoleClass(
                            user.role
                          )}`}
                        >
                          <span className="role-dot" />
                          {user.role || "Student"}
                        </span>
                      </td>

                      <td>
                        <span className="user-status">
                          <span className="status-dot" />
                          Active
                        </span>
                      </td>

                      <td>
                        <span className="joined-date">
                          {formatDate(user.createdAt)}
                        </span>
                      </td>

                      <td>
                        <div className="user-actions">
                          <button
                            type="button"
                            className="action-btn view-btn"
                            onClick={() => handleView(user)}
                            title="View User"
                          >
                            👁
                          </button>

                          <button
                            type="button"
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(user)}
                            title="Edit User"
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            className="action-btn delete-btn"
                            onClick={() =>
                              handleDeleteClick(user)
                            }
                            title="Delete User"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}

      {showViewModal && viewingUser && (
        <div
          className="user-modal-overlay"
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="user-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top-line" />

            <div className="modal-header">
              <div>
                <div className="modal-kicker">
                  ACCOUNT PROFILE
                </div>

                <h2>User Details</h2>

                <p>Complete account information</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="profile-area">
              <div
                className="profile-avatar-wrapper"
                {...avatarTiltHandlers}
                style={{
                  transform: `perspective(500px) rotateX(${avatarTilt.x}deg) rotateY(${avatarTilt.y}deg) translateZ(20px)`,
                }}
              >
                {viewingUser.profileImage ? (
                  <img
                    src={viewingUser.profileImage}
                    alt={viewingUser.name || "User"}
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-fallback">
                    {getInitials(viewingUser.name)}
                  </div>
                )}

                <span className="profile-online-dot" />
              </div>

              <h3>
                {viewingUser.name || "Unknown User"}
              </h3>

              <span
                className={`user-role ${getRoleClass(
                  viewingUser.role
                )}`}
              >
                <span className="role-dot" />
                {viewingUser.role || "Student"}
              </span>
            </div>

            <div className="details-grid">
              <div className="detail-card">
                <span>EMAIL</span>
                <strong>{viewingUser.email || "—"}</strong>
              </div>

              <div className="detail-card">
                <span>USER ID</span>
                <strong>
                  {viewingUser._id || "—"}
                </strong>
              </div>

              <div className="detail-card">
                <span>STATUS</span>

                <strong className="active-detail">
                  <i />
                  Active
                </strong>
              </div>

              <div className="detail-card">
                <span>JOINED</span>

                <strong>
                  {formatDate(viewingUser.createdAt)}
                </strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-secondary"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="modal-primary"
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(viewingUser);
                }}
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && editingUser && (
        <div
          className="user-modal-overlay"
          onClick={() => {
            if (!actionLoading) {
              setShowEditModal(false);
            }
          }}
        >
          <div
            className="user-modal edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top-line" />

            <div className="modal-header">
              <div>
                <div className="modal-kicker">
                  USER MANAGEMENT
                </div>

                <h2>Edit User</h2>

                <p>
                  Update account information and permissions
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                disabled={actionLoading}
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="edit-form">
                <div className="form-field">
                  <label>FULL NAME</label>

                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>EMAIL ADDRESS</label>

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>USER ROLE</label>

                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                  >
                    <option value="Student">Student</option>
                    <option value="Librarian">Librarian</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-secondary"
                  disabled={actionLoading}
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-primary"
                  disabled={actionLoading}
                >
                  {actionLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {showDeleteModal && deletingUser && (
        <div
          className="user-modal-overlay"
          onClick={() => {
            if (!actionLoading) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-orb">🗑</div>

            <div className="delete-kicker">
              DANGER ZONE
            </div>

            <h2>Delete User?</h2>

            <p>
              Are you sure you want to remove{" "}
              <strong>{deletingUser.name}</strong> from
              the library?
              <br />
              <span>
                This action cannot be undone.
              </span>
            </p>

            <div className="delete-actions">
              <button
                type="button"
                className="modal-secondary"
                disabled={actionLoading}
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm"
                disabled={actionLoading}
                onClick={handleDelete}
              >
                {actionLoading
                  ? "Deleting..."
                  : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          3D VISUAL DESIGN ONLY
      ===================================================== */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .users-page {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 70px);
          padding: 28px 30px 35px;
          overflow: hidden;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: #e2e8f0;

          perspective: 1800px;

          background-color: #0a0f1e;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 85% 0%,
              rgba(59, 130, 246, 0.22),
              transparent 34%
            ),
            radial-gradient(
              circle at 8% 95%,
              rgba(99, 102, 241, 0.16),
              transparent 36%
            ),
            linear-gradient(
              160deg,
              #0b1120 0%,
              #0a0f1e 55%,
              #0c1326 100%
            );

          background-size:
            42px 42px,
            42px 42px,
            auto,
            auto,
            auto;
        }

        /* ================================================
           BACKGROUND 3D LIGHT
        ================================================= */

        .users-background-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(75px);
          opacity: 0.65;

          transition: transform 0.25s ease-out;
          will-change: transform;
        }

        .glow-one {
          width: 280px;
          height: 280px;
          top: -130px;
          right: 10%;
          background: rgba(59, 130, 246, 0.30);
        }

        .glow-two {
          width: 230px;
          height: 230px;
          bottom: -100px;
          left: 5%;
          background: rgba(99, 102, 241, 0.24);
        }

        .glow-three {
          width: 190px;
          height: 190px;
          top: 45%;
          right: -80px;
          background: rgba(56, 189, 248, 0.18);
        }

        /* ================================================
           HEADER
        ================================================= */

        .users-header {
          position: relative;
          z-index: 1;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;

          margin-bottom: 25px;
        }

        .users-header > div:first-child {
          transition: transform 0.2s ease-out;
        }

        .users-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 16px;
          padding: 7px 14px;

          border-radius: 999px;
          border: 1px solid rgba(96, 165, 250, 0.35);

          background: rgba(59, 130, 246, 0.12);

          color: #93c5fd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .eyebrow-icon {
          font-size: 12px;
          color: #60a5fa;
        }

        .users-title {
          margin: 0;

          font-size: clamp(30px, 3.4vw, 42px);
          line-height: 1.1;
          font-weight: 850;
          letter-spacing: -1.4px;

          color: #f8fafc;
        }

        .users-title span {
          color: #60a5fa;

          text-shadow:
            0 0 26px rgba(96, 165, 250, 0.45);
        }

        .users-subtitle {
          max-width: 620px;
          margin: 10px 0 0;

          color: #94a3b8;
          font-size: 13px;
          line-height: 1.5;
        }

        /* ================================================
           TOTAL USERS 3D CARD
        ================================================= */

        .total-users-card {
          position: relative;

          min-width: 210px;

          display: flex;
          align-items: center;
          gap: 14px;

          padding: 16px 20px;

          overflow: hidden;

          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;

          background: rgba(255,255,255,0.04);

          box-shadow:
            0 20px 35px rgba(0,0,0,0.35),
            0 5px 10px rgba(0,0,0,0.20),
            inset 0 1px 0 rgba(255,255,255,0.06);

          backdrop-filter: blur(18px);

          transform-style: preserve-3d;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out;
          will-change: transform;
          cursor: default;
        }

        .total-users-card:hover {
          border-color: rgba(96,165,250,0.35);

          box-shadow:
            0 28px 50px rgba(0,0,0,0.4),
            0 8px 16px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .total-users-card::after {
          content: "";
          position: absolute;
          inset: 0;

          border-radius: inherit;

          pointer-events: none;

          background:
            linear-gradient(
              120deg,
              rgba(255,255,255,0.06),
              transparent 35%
            );
        }

        .total-card-shine {
          position: absolute;

          width: 110px;
          height: 110px;

          right: -45px;
          top: -60px;

          border-radius: 50%;

          background: rgba(59,130,246,0.22);

          filter: blur(5px);
        }

        .total-icon {
          position: relative;
          z-index: 2;

          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 13px;

          background:
            linear-gradient(
              145deg,
              #60a5fa,
              #3b5bfa 55%,
              #2f3fd6
            );

          color: white;
          font-size: 21px;

          box-shadow:
            0 10px 18px rgba(37,99,235,0.38),
            0 3px 5px rgba(37,99,235,0.2),
            inset 0 2px 0 rgba(255,255,255,0.42),
            inset 0 -3px 5px rgba(15,23,42,0.2);

          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .total-number {
          font-size: 26px;
          line-height: 1;
          font-weight: 850;
          color: #f8fafc;
        }

        .total-label {
          margin-top: 5px;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;

          color: #94a3b8;
        }

        /* ================================================
           ERROR
        ================================================= */

        .users-error {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 18px;
          padding: 13px 17px;

          border: 1px solid rgba(248,113,113,0.3);
          border-radius: 15px;

          background: rgba(248,113,113,0.08);

          backdrop-filter: blur(14px);

          box-shadow:
            0 12px 25px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .error-symbol {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;

          background:
            linear-gradient(
              145deg,
              #ef4444,
              #dc2626
            );

          color: white;
          font-weight: 800;

          box-shadow:
            inset 0 2px 3px rgba(255,255,255,0.25),
            0 5px 10px rgba(220,38,38,0.25);
        }

        .users-error strong {
          color: #fecaca;
          font-size: 12px;
        }

        .users-error p {
          margin: 2px 0 0;
          color: #fca5a5;
          font-size: 11px;
        }

        /* ================================================
           TABLE CARD
        ================================================= */

        .users-table-card {
          position: relative;
          z-index: 1;

          overflow: hidden;

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 21px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.94),
              rgba(246,249,253,0.86)
            );

          box-shadow:
            0 35px 75px rgba(0,0,0,0.5),
            0 10px 24px rgba(0,0,0,0.3),
            inset 0 2px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(148,163,184,0.08);

          backdrop-filter: blur(18px);

          transform-style: preserve-3d;
          transition: transform 0.25s ease-out;
          will-change: transform;
        }

        .users-table-card::before {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          top: 0;

          height: 2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(96,165,250,0.75),
              rgba(129,140,248,0.65),
              transparent
            );

          pointer-events: none;
        }

        .table-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          padding: 19px 22px;

          border-bottom: 1px solid rgba(226,232,240,0.75);

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.55),
              rgba(248,250,252,0.28)
            );
        }

        .table-heading-row {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .mini-table-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background:
            linear-gradient(
              145deg,
              #eff6ff,
              #dbeafe
            );

          color: #2563eb;
          font-size: 15px;

          border: 1px solid #dbeafe;

          box-shadow:
            0 5px 10px rgba(37,99,235,0.10),
            inset 0 2px 2px rgba(255,255,255,0.95);
        }

        .table-top h2 {
          margin: 0;

          font-size: 16px;
          font-weight: 800;

          color: #111827;

          text-shadow:
            0 1px 0 white;
        }

        .table-top p {
          margin: 5px 0 0 40px;

          color: #94a3b8;
          font-size: 11px;
        }

        .member-count {
          padding: 7px 11px;

          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f1f5f9
            );

          color: #64748b;

          font-size: 10px;
          font-weight: 700;

          border: 1px solid #e2e8f0;

          box-shadow:
            0 4px 9px rgba(15,23,42,0.05),
            inset 0 1px 0 white;
        }

        .member-count span {
          color: #2563eb;
          font-weight: 850;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        .table-container table {
          width: 100%;
          min-width: 920px;
          border-collapse: collapse;
        }

        .table-container th {
          padding: 12px 20px;

          text-align: left;

          background:
            linear-gradient(
              180deg,
              rgba(248,250,252,0.95),
              rgba(241,245,249,0.65)
            );

          color: #64748b;

          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.9px;

          border-bottom: 1px solid #e2e8f0;

          box-shadow:
            inset 0 1px 0 white;
        }

        .table-container td {
          padding: 13px 20px;

          border-bottom: 1px solid #eef2f7;

          font-size: 12px;
          vertical-align: middle;
        }

        .table-container tbody tr {
          background: transparent;

          transition:
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .table-container tbody tr:hover {
          background:
            linear-gradient(
              90deg,
              rgba(239,246,255,0.8),
              rgba(255,255,255,0.45)
            );

          box-shadow:
            inset 4px 0 0 rgba(59,130,246,0.75),
            0 5px 15px rgba(37,99,235,0.04);
        }

        .table-container tbody tr:hover .user-avatar,
        .table-container tbody tr:hover .user-avatar-image {
          transform: translateZ(6px) scale(1.06);
        }

        .table-container tbody tr:last-child td {
          border-bottom: none;
        }

        /* ================================================
           USER
        ================================================= */

        .user-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          perspective: 300px;
        }

        .user-avatar,
        .user-avatar-image {
          width: 38px;
          height: 38px;
          min-width: 38px;

          border-radius: 12px;

          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              145deg,
              #eff6ff,
              #bfdbfe 55%,
              #93c5fd
            );

          color: #1d4ed8;

          font-size: 11px;
          font-weight: 850;

          border: 1px solid #bfdbfe;

          box-shadow:
            0 8px 15px rgba(37,99,235,0.14),
            inset 0 2px 3px rgba(255,255,255,0.9),
            inset 0 -2px 3px rgba(37,99,235,0.08);
        }

        .user-avatar-image {
          object-fit: cover;
          display: block;

          border: 2px solid #e0e7ff;

          box-shadow:
            0 8px 15px rgba(15,23,42,0.12),
            0 2px 3px rgba(15,23,42,0.08);
        }

        .user-information {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .user-information strong {
          color: #111827;

          font-size: 12px;
          font-weight: 750;
        }

        .user-information span {
          color: #94a3b8;
          font-size: 9px;
        }

        .user-email {
          color: #475569;
          font-size: 11px;
        }

        /* ================================================
           ROLE
        ================================================= */

        .user-role {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 5px 9px;

          border-radius: 999px;

          font-size: 9px;
          font-weight: 800;

          text-transform: capitalize;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.8),
            0 3px 7px rgba(15,23,42,0.04);
        }

        .role-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: currentColor;

          box-shadow:
            0 0 6px currentColor;
        }

        .role-admin {
          background:
            linear-gradient(
              145deg,
              #fff1f2,
              #fee2e2
            );

          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .role-librarian {
          background:
            linear-gradient(
              145deg,
              #eff6ff,
              #dbeafe
            );

          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .role-student {
          background:
            linear-gradient(
              145deg,
              #f0fdf4,
              #dcfce7
            );

          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        /* ================================================
           STATUS
        ================================================= */

        .user-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 5px 9px;

          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              #f0fdf4,
              #dcfce7
            );

          color: #16a34a;

          font-size: 9px;
          font-weight: 700;

          border: 1px solid #bbf7d0;

          box-shadow:
            inset 0 1px 0 white,
            0 3px 7px rgba(22,163,74,0.06);
        }

        .status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 0 3px rgba(34,197,94,0.08),
            0 0 8px rgba(34,197,94,0.65);
        }

        .joined-date {
          color: #64748b;
          font-size: 10px;
        }

        /* ================================================
           ACTION BUTTONS
        ================================================= */

        .user-actions {
          display: flex;
          align-items: center;
          gap: 6px;

          perspective: 400px;
        }

        .action-btn {
          width: 29px;
          height: 29px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border-radius: 8px;

          cursor: pointer;

          font-size: 12px;

          transform-style: preserve-3d;

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            filter 0.18s ease;
        }

        .action-btn:hover {
          transform: translateY(-3px) translateZ(10px) rotateX(-8deg) scale(1.06);

          filter: brightness(1.03);
        }

        .action-btn:active {
          transform: translateY(1px) translateZ(0) scale(0.96);
        }

        .view-btn {
          border: 1px solid #bfdbfe;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #dbeafe
            );

          color: #2563eb;

          box-shadow:
            0 6px 12px rgba(37,99,235,0.12),
            inset 0 2px 2px rgba(255,255,255,0.9);
        }

        .edit-btn {
          border: 1px solid #fde68a;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fef3c7
            );

          color: #d97706;

          box-shadow:
            0 6px 12px rgba(217,119,6,0.10),
            inset 0 2px 2px rgba(255,255,255,0.9);
        }

        .delete-btn {
          border: 1px solid #fecaca;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fee2e2
            );

          color: #dc2626;

          box-shadow:
            0 6px 12px rgba(220,38,38,0.10),
            inset 0 2px 2px rgba(255,255,255,0.9);
        }

        /* ================================================
           EMPTY
        ================================================= */

        .empty-users {
          position: relative;
          z-index: 1;

          min-height: 330px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 21px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.92),
              rgba(241,245,249,0.82)
            );

          box-shadow:
            0 30px 65px rgba(0,0,0,0.45),
            inset 0 2px 0 white;

          text-align: center;
        }

        .empty-orb {
          width: 72px;
          height: 72px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 15px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #dbeafe
            );

          color: #2563eb;
          font-size: 28px;

          border: 1px solid #dbeafe;

          box-shadow:
            0 16px 28px rgba(37,99,235,0.15),
            inset 0 3px 5px rgba(255,255,255,0.95),
            inset 0 -3px 5px rgba(37,99,235,0.06);

          animation: floatOrb 3.6s ease-in-out infinite;
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: perspective(500px) translateY(0) rotateX(0deg);
          }
          50% {
            transform: perspective(500px) translateY(-8px) rotateX(6deg);
          }
        }

        .empty-users h2 {
          margin: 0;

          color: #111827;

          font-size: 18px;
          font-weight: 800;
        }

        .empty-users p {
          margin: 7px 0 0;

          color: #64748b;
          font-size: 12px;
        }

        /* ================================================
           LOADING
        ================================================= */

        .users-loading {
          position: relative;
          z-index: 2;

          min-height: 70vh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .loading-orb {
          position: relative;

          width: 65px;
          height: 65px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 16px;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              #60a5fa,
              #2563eb,
              #1d4ed8
            );

          color: white;

          font-size: 22px;
          font-weight: 800;

          box-shadow:
            0 18px 30px rgba(37,99,235,0.28),
            inset 0 3px 5px rgba(255,255,255,0.35),
            inset 0 -4px 7px rgba(15,23,42,0.15);

          transform-style: preserve-3d;
          animation: orbWobble 2.2s ease-in-out infinite;
        }

        @keyframes orbWobble {
          0%, 100% {
            transform: perspective(500px) rotateY(-14deg) rotateX(4deg);
          }
          50% {
            transform: perspective(500px) rotateY(14deg) rotateX(-4deg);
          }
        }

        .loading-ring {
          position: absolute;

          inset: -6px;

          border: 2px solid rgba(37,99,235,0.15);
          border-top-color: #2563eb;

          border-radius: 25px;

          animation: userSpin 0.9s linear infinite;
        }

        .users-loading h2 {
          margin: 0;

          color: #f8fafc;

          font-size: 18px;
          font-weight: 800;
        }

        .users-loading p {
          margin: 6px 0 0;

          color: #94a3b8;
          font-size: 12px;
        }

        @keyframes userSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ================================================
           MODALS
        ================================================= */

        .user-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 18px;

          background: rgba(15,23,42,0.58);

          backdrop-filter: blur(10px);

          perspective: 1400px;
        }

        .user-modal {
          position: relative;

          width: 100%;
          max-width: 500px;
          max-height: calc(100vh - 36px);

          overflow-y: auto;

          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.99),
              rgba(241,245,249,0.97)
            );

          box-shadow:
            0 40px 100px rgba(15,23,42,0.35),
            0 10px 30px rgba(15,23,42,0.12),
            inset 0 2px 0 white;

          transform-style: preserve-3d;
          transform-origin: top center;

          animation: modalAppear 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: perspective(1400px) rotateX(-14deg) translateY(24px) scale(0.95);
          }

          to {
            opacity: 1;
            transform: perspective(1400px) rotateX(0deg) translateY(0) scale(1);
          }
        }

        .modal-top-line {
          height: 4px;
          width: 100%;

          background:
            linear-gradient(
              90deg,
              #2563eb,
              #60a5fa,
              #818cf8
            );

          box-shadow:
            0 2px 10px rgba(37,99,235,0.25);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;

          padding: 20px 22px 16px;

          border-bottom: 1px solid #eef2f7;
        }

        .modal-kicker {
          margin-bottom: 5px;

          color: #2563eb;

          font-size: 8px;
          font-weight: 850;
          letter-spacing: 1.2px;
        }

        .modal-header h2 {
          margin: 0;

          color: #111827;

          font-size: 19px;
          font-weight: 850;
        }

        .modal-header p {
          margin: 4px 0 0;

          color: #94a3b8;
          font-size: 11px;
        }

        .modal-close {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          padding: 0;

          border: 1px solid #e2e8f0;
          border-radius: 9px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #e2e8f0
            );

          color: #64748b;

          cursor: pointer;

          font-size: 20px;
          line-height: 1;

          box-shadow:
            0 4px 8px rgba(15,23,42,0.06),
            inset 0 1px 0 white;

          transition: transform 0.15s ease;
        }

        .modal-close:hover {
          background: #e2e8f0;
          transform: translateZ(4px) rotate(90deg);
        }

        .profile-area {
          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 20px;

          border-bottom: 1px solid #eef2f7;

          perspective: 500px;
        }

        .profile-avatar-wrapper {
          position: relative;

          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .profile-avatar,
        .profile-avatar-fallback {
          width: 78px;
          height: 78px;

          border-radius: 23px;
        }

        .profile-avatar {
          display: block;

          object-fit: cover;

          border: 3px solid white;

          box-shadow:
            0 18px 30px rgba(37,99,235,0.18),
            0 4px 8px rgba(15,23,42,0.08);
        }

        .profile-avatar-fallback {
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              145deg,
              #eff6ff,
              #bfdbfe,
              #93c5fd
            );

          color: #1d4ed8;

          font-size: 25px;
          font-weight: 850;

          border: 3px solid white;

          box-shadow:
            0 18px 30px rgba(37,99,235,0.18),
            inset 0 3px 5px rgba(255,255,255,0.9);
        }

        .profile-online-dot {
          position: absolute;

          right: -2px;
          bottom: 3px;

          width: 14px;
          height: 14px;

          border: 3px solid white;
          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 3px 10px rgba(34,197,94,0.45);

          transform: translateZ(15px);
        }

        .profile-area h3 {
          margin: 11px 0 8px;

          color: #111827;

          font-size: 18px;
          font-weight: 850;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;

          padding: 18px 22px;
        }

        .detail-card {
          min-width: 0;

          padding: 12px;

          border: 1px solid #e2e8f0;
          border-radius: 12px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f1f5f9
            );

          box-shadow:
            0 5px 10px rgba(15,23,42,0.04),
            inset 0 1px 0 white;

          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .detail-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 18px rgba(15,23,42,0.07),
            inset 0 1px 0 white;
        }

        .detail-card span {
          display: block;

          margin-bottom: 5px;

          color: #94a3b8;

          font-size: 8px;
          font-weight: 850;
          letter-spacing: 0.8px;
        }

        .detail-card strong {
          display: block;

          color: #334155;

          font-size: 11px;
          line-height: 1.45;

          overflow-wrap: anywhere;
        }

        .active-detail {
          display: flex !important;
          align-items: center;
          gap: 6px;

          color: #16a34a !important;
        }

        .active-detail i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 7px rgba(34,197,94,0.55);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 9px;

          padding: 15px 22px 20px;

          border-top: 1px solid #eef2f7;
        }

        .modal-secondary,
        .modal-primary,
        .delete-confirm {
          min-height: 36px;

          padding: 0 15px;

          border-radius: 10px;

          cursor: pointer;

          font-size: 11px;
          font-weight: 750;

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        .modal-secondary {
          border: 1px solid #dbe2ea;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f1f5f9
            );

          color: #475569;

          box-shadow:
            0 5px 10px rgba(15,23,42,0.05),
            inset 0 1px 0 white;
        }

        .modal-primary {
          border: none;

          background:
            linear-gradient(
              145deg,
              #60a5fa,
              #2563eb,
              #1d4ed8
            );

          color: white;

          box-shadow:
            0 9px 18px rgba(37,99,235,0.24),
            inset 0 2px 2px rgba(255,255,255,0.25);
        }

        .modal-primary:hover,
        .modal-secondary:hover,
        .delete-confirm:hover {
          transform: translateY(-2px);
        }

        /* ================================================
           EDIT
        ================================================= */

        .edit-form {
          padding: 4px 22px 5px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;

          margin-top: 14px;
        }

        .form-field label {
          color: #475569;

          font-size: 9px;
          font-weight: 850;
          letter-spacing: 0.7px;
        }

        .form-field input,
        .form-field select {
          width: 100%;
          height: 39px;

          padding: 0 12px;

          border: 1px solid #dbe3ec;
          border-radius: 10px;

          outline: none;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f1f5f9
            );

          color: #0f172a;

          font-size: 11px;

          box-shadow:
            inset 0 2px 4px rgba(15,23,42,0.035),
            0 2px 4px rgba(15,23,42,0.025);

          transition:
            border 0.18s ease,
            box-shadow 0.18s ease,
            background 0.18s ease;
        }

        .form-field input:focus,
        .form-field select:focus {
          border-color: #60a5fa;

          background: white;

          box-shadow:
            0 0 0 3px rgba(59,130,246,0.10),
            0 5px 12px rgba(37,99,235,0.06);
        }

        /* ================================================
           DELETE
        ================================================= */

        .delete-modal {
          width: 100%;
          max-width: 390px;

          padding: 30px 25px 24px;

          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.99),
              rgba(248,250,252,0.97)
            );

          text-align: center;

          box-shadow:
            0 40px 100px rgba(15,23,42,0.35),
            inset 0 2px 0 white;

          transform-style: preserve-3d;
          transform-origin: top center;

          animation: modalAppear 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .delete-orb {
          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: 0 auto 12px;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fecaca
            );

          font-size: 22px;

          border: 1px solid #fecaca;

          box-shadow:
            0 13px 24px rgba(220,38,38,0.15),
            inset 0 3px 4px rgba(255,255,255,0.9);
        }

        .delete-kicker {
          margin-bottom: 4px;

          color: #dc2626;

          font-size: 8px;
          font-weight: 850;
          letter-spacing: 1.1px;
        }

        .delete-modal h2 {
          margin: 0;

          color: #111827;

          font-size: 20px;
          font-weight: 850;
        }

        .delete-modal p {
          margin: 9px 0 22px;

          color: #64748b;

          font-size: 11px;
          line-height: 1.7;
        }

        .delete-modal p strong {
          color: #334155;
        }

        .delete-modal p span {
          color: #94a3b8;
        }

        .delete-actions {
          display: flex;
          justify-content: center;
          gap: 9px;
        }

        .delete-confirm {
          border: none;

          background:
            linear-gradient(
              145deg,
              #f87171,
              #ef4444,
              #dc2626
            );

          color: white;

          box-shadow:
            0 9px 18px rgba(220,38,38,0.23),
            inset 0 2px 2px rgba(255,255,255,0.22);
        }

        button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 800px) {
          .users-page {
            padding: 22px 17px 28px;
          }

          .users-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .total-users-card {
            min-width: 145px;
          }

          .table-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .member-count {
            align-self: flex-start;
          }
        }

        @media (max-width: 560px) {
          .users-title {
            font-size: 27px;
          }

          .users-subtitle {
            font-size: 12px;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .modal-footer {
            padding-left: 17px;
            padding-right: 17px;
          }

          .modal-header {
            padding-left: 17px;
            padding-right: 17px;
          }

          .edit-form {
            padding-left: 17px;
            padding-right: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .empty-orb,
          .loading-orb,
          .users-background-glow,
          .action-btn,
          .total-users-card,
          .users-table-card,
          .profile-avatar-wrapper {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Users;