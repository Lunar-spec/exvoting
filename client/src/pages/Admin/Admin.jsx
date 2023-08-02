// src/components/SuperAdminPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editedConstituencies, setEditedConstituencies] = useState({});

  // console.log(editedConstituencies)
  const constituency = localStorage.getItem('constituency')

  const currentUserRole = localStorage.getItem('role'); // Replace this with the current user's role

  const constituencyOptions = ['Ashti', 'Karanja', 'Arvi'];

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/users`);
      setUsers(response.data);
    } catch (error) {
      alert('Error fetching users data');
    }
  };

  const handleEdit = async (userId, role, constituency) => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER}/users/superAdmin`, { userId, role, constituency });
      alert('User data updated successfully!');
      fetchAllUsers(); // Refresh the users list after the update
    } catch (error) {
      alert('Error editing user data');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/users/superAdmin/${userId}`);
      alert('User deleted successfully!');
      fetchAllUsers(); // Refresh the users list after the deletion
    } catch (error) {
      alert('Error deleting user');
    }
  };

  const handleConstituencyChange = (userId, role, value) => {
    setEditedConstituencies((prevState) => ({
      ...prevState,
      [userId]: value,
    }));

    handleEdit(userId, role, value);
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Constituency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            //Filter users based on the logged-in constituency_admin's constituency
            (currentUserRole === 'constituency_admin' && user.role === 'normal_user' && user.constituency === constituency) || // Replace CURRENT_USER_CONSTITUENCY with the logged-in constituency_admin's constituency
            (currentUserRole === 'superadmin' && user.role !== 'superadmin') || // Hide superadmin info from all admins
            (currentUserRole !== 'constituency_admin' && currentUserRole !== 'superadmin') // Show all users to superadmin
            ? (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'constituency_admin' || user.role === 'superadmin' ? (
                    <span>{user.constituency}</span>
                  ) : (
                    <div>
                      <select
                        value={editedConstituencies[user._id] || user.constituency}
                        onChange={(e) => handleConstituencyChange(user._id, user.role, e.target.value)}
                      >
                        {constituencyOptions.map((constituency) => (
                          <option key={constituency} value={constituency}>
                            {constituency}
                          </option>
                        ))}
                        <option value="type_manually">Type Manually</option>
                      </select>
                      {editedConstituencies[user._id] === 'type_manually' && (
                        <input
                          type="text"
                          value={user.constituency}
                          onChange={(e) => handleConstituencyChange(user._id, user.role, e.target.value)}
                        />
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {user.role === 'constituency_admin' && (
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(user._id, 'normal_user', user.constituency)}
                    >
                      Change to Normal User
                    </button>
                  )}
                  {user.role !== 'superadmin' && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id)}
                      disabled={user.role === 'superadmin'} // Disable the button for superadmin
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
