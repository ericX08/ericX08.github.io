import React from 'react';
import { Dumbbell, ShoppingCart, Globe, X } from 'lucide-react';
import { project1, SwimLessons, Saferly } from '../../public';

const ProjectCard = ({ title, icon: Icon, description, skills, image, link }) => (
  <div className="bg-emerald-100 rounded-lg shadow-lg flex flex-col h-full">
    <div className="bg-emerald-400 p-4 rounded-t-lg">
      <div className="flex items-center">
        <div className="bg-white p-4 rounded-full mr-5">
          <Icon className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
    </div>
    <div className="flex-grow p-8">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <div className="flex-[6] flex flex-col">
          <p className="text-emerald-700 mb-6 text-xl leading-relaxed flex-grow">{description}</p>
          {link && (
            <div className="mb-6">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5 mr-2" />
                View Project
              </a>
            </div>
          )}
          <div className="mt-auto">
            <h3 className="text-xl font-semibold text-emerald-700 mb-3">Skills:</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-[4]">
          <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  </div>
);

const Projects = ({ activePopup, onClose }) => {
  const content = {
    swimWebsite: (
      <ProjectCard
        title="Brandeis Swimming Lessons"
        icon={Dumbbell}
        description="Developed a comprehensive swimming lesson management website serving 50+ students and 20+ instructors, designed to help parents concerned with water safety easily enroll their children in lessons. Features include automated scheduling, payment processing, and real-time data synchronization. Eliminated 100% of manual scheduling processes by architecting a scalable lesson management platform using Next.js, Prisma ORM, and PostgreSQL, with automated instructor availability tracking."
        skills={['Next.js', 'JavaScript', 'PostgreSQL', 'Prisma ORM', 'Next-Auth', 'JWT']}
        image={SwimLessons}
        link="https://www.busdtswimlessons.com/"
      />
    ),
    saferly: (
      <ProjectCard
        title="Saferly"
        icon={ShoppingCart}
        description="Built the Saferly app to provide the elderly easy-to-use and safe access to the internet, with Flutter & Google Cloud Platform. Reduced phishing risks by 75% through engineering a secure email verification system using OAuth 2.0 and Gmail API. Achieved 99% accuracy in identifying malicious URLs by constructing a real-time website risk assessment tool using Ipqualityscore API."
        skills={['Flutter', 'Firebase', 'Google Cloud Platform', 'OAuth 2.0', 'Gmail API']}
        image={Saferly}
        link="https://devpost.com/software/saferly"
      />
    ),
    portfolio: (
      <ProjectCard
        title="3D Interactive Portfolio"
        icon={Globe}
        description="My portfolio is a unique blend of 3D web development, incorporating Three.js, React, HTML, CSS, and Blender. It features a fully interactive 3D environment, complete with animations and a mini-game. This project not only showcases my skills but also enhances the user experience by making information accessible through engaging, interactive elements."
        skills={['Three.js', 'React', 'HTML', 'CSS', 'Blender', 'GSAP']}
        image={project1}
      />
    ),
  };

  if (!activePopup) return null;

  return (
    <div className="bg-emerald-50 rounded-xl p-10 mx-auto overflow-y-auto h-full flex flex-col relative">
      {/* Close button positioned at top right */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition-colors duration-200"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="flex-grow mb-8">
        {content[activePopup]}
      </div>
    </div>
  );
};

export default Projects;