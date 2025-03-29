import React from 'react';
import '../styles/Skills.css';

const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'React', level: 80 },
  { name: 'Node.js', level: 70 },
  { name: 'Git/GitHub', level: 75 },
  { name: 'Communication', level: 90 },
  { name: 'Teamwork', level: 85 }
];

const Skills = () => {
  return (
    <section className="skills">
      <h2>My Skills</h2>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div className="skill" key={index}>
            <span>{skill.name}</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
