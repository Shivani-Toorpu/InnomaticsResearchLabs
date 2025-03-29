import React from 'react';
import '../styles/Experience.css';

const experiences = [
  {
    role: 'Frontend Intern',
    company: 'Tech Solutions Inc.',
    period: 'June 2023 - August 2023',
    description: [
      'Built responsive UIs using React and CSS for client dashboards.',
      'Collaborated with backend developers to integrate APIs.',
      'Improved page load speed by optimizing assets and code structure.'
    ]
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: 'Jan 2023 - May 2023',
    description: [
      'Developed custom websites for small businesses.',
      'Handled everything from design to deployment.',
      'Focused on SEO, mobile-first design, and performance.'
    ]
  }
];

const Experience = () => {
  return (
    <section className="experience">
      <h2>Experience</h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div className="experience-card" key={index}>
            <h3>{exp.role} @ {exp.company}</h3>
            <span className="period">{exp.period}</span>
            <ul>
              {exp.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
