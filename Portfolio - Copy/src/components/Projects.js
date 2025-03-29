import React from 'react';
import '../styles/Projects.css';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio to showcase my skills and projects using React.',
    technologies: ['React', 'CSS', 'React Router'],
    link: 'https://your-portfolio-link.com',
    github: 'https://github.com/yourusername/portfolio'
  },
  {
    title: 'Weather App',
    description: 'A web app to check current weather using OpenWeatherMap API.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
    link: 'https://your-weather-app-link.com',
    github: 'https://github.com/yourusername/weather-app'
  },
  {
    title: 'To-Do List App',
    description: 'A responsive task manager with add, edit, and delete features.',
    technologies: ['React', 'Hooks', 'LocalStorage'],
    link: 'https://your-todo-link.com',
    github: 'https://github.com/yourusername/todo-app'
  }
];

const Projects = () => {
  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
            <div className="links">
              <a href={project.link} target="_blank" rel="noreferrer">Live Demo</a>
              <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
