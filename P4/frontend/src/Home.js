import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <nav className="w-full bg-white shadow p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Welcome to Healthcare</h1>
        <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </nav>

      <h2 className="mt-10 text-3xl font-semibold">Where your health is our priority</h2>

      <div className="flex gap-8 mt-10">
        <button onClick={() => navigate('/register/patient')} className="border p-6 rounded shadow-md bg-white hover:bg-gray-50">
          Login as Patient
        </button>
        <button onClick={() => navigate('/register/doctor')} className="border p-6 rounded shadow-md bg-white hover:bg-gray-50">
          Login as Doctor
        </button>
        <button onClick={() => navigate('/login')} className="border p-6 rounded shadow-md bg-white hover:bg-gray-50">
          Login as Admin
        </button>
      </div>

      <section className="mt-16 flex gap-10">
        <div className="p-4 bg-white rounded shadow">🏥 Easy Bookings</div>
        <div className="p-4 bg-white rounded shadow">👨‍⚕️ Expert Doctors</div>
        <div className="p-4 bg-white rounded shadow">📈 24/7 Support</div>
      </section>

      <footer className="w-full mt-20 bg-gray-800 text-white p-6 text-center">
        © 2025 Healthcare Booking System
      </footer>
    </div>
  );
};

export default Home;
