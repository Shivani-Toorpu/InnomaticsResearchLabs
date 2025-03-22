import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const PatientDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patient/appointments', {
          headers: { 'x-auth-token': auth.token },
        });
        setAppointments(res.data);

        const user = JSON.parse(atob(auth.token.split('.')[1])).user;
        const userProfile = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { 'x-auth-token': auth.token },
        });
        const me = userProfile.data.find((u) => u._id === user.id);
        setProfile(me);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [auth]);

  const cancelAppointment = async (id) => {
    await axios.put(`http://localhost:5000/api/patient/cancel/${id}`, {}, {
      headers: { 'x-auth-token': auth.token },
    });
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Welcome, {profile.fullName}</h2>
      <h3 className="text-lg mb-2">My Appointments</h3>
      {appointments.map((a) => (
        <div key={a._id} className="border p-4 mb-3 bg-white rounded shadow flex justify-between items-center">
          <div>
            <p><strong>Doctor:</strong> {a.doctorId?.fullName}</p>
            <p><strong>Date:</strong> {a.date} <strong>Time:</strong> {a.time}</p>
            <p><strong>Status:</strong> {a.status}</p>
          </div>
          {a.status !== 'Cancelled' && (
            <button onClick={() => cancelAppointment(a._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientDashboard;
