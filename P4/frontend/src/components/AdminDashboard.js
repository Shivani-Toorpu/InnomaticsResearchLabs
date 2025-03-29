import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'x-auth-token': auth.token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [auth.token]);

  const approve = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`, {}, {
      headers: { 'x-auth-token': auth.token },
    });
    fetchUsers();
  };

  const reject = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/reject/${id}`, {
      headers: { 'x-auth-token': auth.token },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <h3 className="text-lg mb-4">Manage Users</h3>
      {users.map((user) => (
        <div key={user._id} className="border p-4 mb-3 bg-white rounded shadow flex justify-between items-center">
          <div>
            <p><strong>{user.fullName}</strong> ({user.role})</p>
            <p>Email: {user.email} | Mobile: {user.mobile}</p>
          </div>
          {user.role === 'Doctor' && !user.isApproved && (
            <div className="flex gap-2">
              <button onClick={() => approve(user._id)} className="bg-green-500 text-white px-3 py-1 rounded">
                Approve
              </button>
              <button onClick={() => reject(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
