import React, { useState, useEffect } from 'react';

const AdminManagement = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch All Users
  const fetchUsers = async () => {
    const superAdminId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:5000/api/users/get-all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': superAdminId,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Error fetching users:', data.error);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  // ✅ Handle Role Change
  const handleRoleChange = async (userId, newRole) => {
    const superAdminId = localStorage.getItem('userId');
    const url = newRole === 'admin' 
      ? `http://localhost:5000/api/users/${userId}/make-admin`
      : `http://localhost:5000/api/users/${userId}/remove-admin`;

    const confirmMessage = newRole === 'admin' 
      ? 'Are you sure you want to make this user an Admin?' 
      : 'Are you sure you want to remove this Admin role?';

    if (!window.confirm(confirmMessage)) return;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': superAdminId,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
      } else {
        console.error('Error updating role:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Admin Management Panel</h1>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0073e6', color: 'white' }}>
              <th style={headerCellStyle}>Username</th>
              <th style={headerCellStyle}>Email</th>
              <th style={headerCellStyle}>Role</th>
              <th style={headerCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={cellStyle}>{user.username}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={{ ...cellStyle, color: user.role === 'admin' ? 'green' : 'gray' }}>{user.role}</td>
                <td style={cellStyle}>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRoleChange(user._id, 'user')}
                      style={removeBtnStyle}>
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user._id, 'admin')}
                      style={makeAdminBtnStyle}>
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headerCellStyle = {
  padding: '15px',
  textAlign: 'left',
};

const cellStyle = {
  padding: '15px',
  textAlign: 'left',
};

const removeBtnStyle = {
  padding: '8px 15px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
};

const makeAdminBtnStyle = {
  padding: '8px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default AdminManagement;
