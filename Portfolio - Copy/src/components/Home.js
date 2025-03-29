import React from 'react';
import profileImg from '../images/profile.png';
import '../styles/Home.css';

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <img src={profileImg} alt="Profile" className="profile-pic" />
        <h1>Hello, I'm Shivani</h1>
        <p>A passionate web developer and designer focused on building beautiful and functional applications.</p>
      </div>
    </section>
  );
};

export default Home;
