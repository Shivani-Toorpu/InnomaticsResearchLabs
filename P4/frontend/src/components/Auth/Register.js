import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    mobile: '',
    specialization: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        role: role === 'patient' ? 'Patient' : 'Doctor'
      });
      alert('Registered! Please Login');
      navigate('/login');
    } 
    catch (err) {
      console.error(err); // Log full error in console for visibility
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg); // Show specific backend message
      } else {
        alert('Error Registering');
      }
    }    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-bold text-center">Register as {role}</h2>
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile"
          required
          className="w-full p-2 mb-3 border"
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        {role === 'doctor' && (
          <input
            type="text"
            placeholder="Specialization"
            required
            className="w-full p-2 mb-3 border"
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          />
        )}
        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
