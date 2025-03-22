import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const DoctorDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctor/appointments', {
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

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Welcome, Dr. {profile.fullName}</h2>
      <h3 className="text-lg mb-2">My Patients</h3>
      {appointments.map((a) => (
        <div key={a._id} className="border p-4 mb-3 bg-white rounded shadow">
          <p><strong>Patient:</strong> {a.patientId?.fullName}</p>
          <p><strong>Date:</strong> {a.date} <strong>Time:</strong> {a.time}</p>
          <p><strong>Status:</strong> {a.status}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;
