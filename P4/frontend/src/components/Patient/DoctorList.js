import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const DoctorList = () => {
  const { auth } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [selected, setSelected] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patient/doctors', {
          headers: { 'x-auth-token': auth.token },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, [auth]);

  const book = async (doctorId) => {
    await axios.post('http://localhost:5000/api/patient/book', {
      doctorId, date, time,
    }, {
      headers: { 'x-auth-token': auth.token },
    });
    alert('Appointment Booked!');
    setSelected({});
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Doctors Available</h2>
      {doctors.map((doc) => (
        <div key={doc._id} className="border p-4 mb-3 bg-white rounded shadow">
          <p><strong>{doc.fullName}</strong> ({doc.specialization})</p>
          <button onClick={() => setSelected(doc._id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
            Book Appointment
          </button>
          {selected === doc._id && (
            <div className="mt-4 flex flex-col">
              <input type="date" onChange={(e) => setDate(e.target.value)} className="border p-2 mb-2" />
              <input type="time" onChange={(e) => setTime(e.target.value)} className="border p-2 mb-2" />
              <button onClick={() => book(doc._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Confirm</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
