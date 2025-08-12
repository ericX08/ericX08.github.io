import React, {useState} from 'react';
import { Dumbbell, Briefcase, GraduationCap, BookOpen, X } from 'lucide-react';
import { leetcode, github, linkedin, document, resume } from '../../public';

const AboutSection = ({ title, icon: Icon, children }) => (
  <div className="bg-gray-200 rounded-lg p-6 mb-6 shadow-md flex-grow flex flex-col">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 mr-3 text-blue-600" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

const About = ({ activePopup, onClose }) => {
  const [showResume, setShowResume] = useState(false);
  const content = {
    aboutMe: (
      <AboutSection title="About Me" icon={Dumbbell}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[7] md:pr-4">
            <p className="text-gray-700 mb-4 text-lg">
              Hey, I'm Eric Xiao, a student-athlete at Brandeis University pursuing a BS in Computer Science with a minor in Economics. I'm passionate about software engineering and full-stack development, with experience building scalable applications and working with modern technologies. I love solving complex problems and creating user-friendly solutions that make a real impact.
            </p>
          </div>
          <div className="flex-[3] flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <a
                href="https://leetcode.com/u/exiao312/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={leetcode} alt="LeetCode" className="w-12 h-12" />
              </a>
              <a
                href="https://github.com/ericX08"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={github} alt="GitHub" className="w-12 h-12" />
              </a>
              <a
                href="https://www.linkedin.com/in/ericxiao-cs/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={linkedin} alt="LinkedIn" className="w-12 h-12" />
              </a>
              <button
                onClick={() => setShowResume(true)}
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img src={document} alt="document" className="w-12 h-12" />
              </button>
            </div>
          </div>
        </div>
      </AboutSection>
    ),
    experience: (
      <AboutSection title="Experience" icon={Briefcase}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">DraftKings — Software Engineer Intern</h3>
            <p className="text-gray-600 mb-2">Jun 2025 - Aug 2025 • Boston, MA</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Contributed to investigation of game launch failures affecting <strong>0.5%</strong> of platform errors, helped identify root cause and implement production fix within <strong>24 hours</strong> of intensive analysis</li>
              <li>Developed user tracking system across <strong>10+</strong> backend microservices using <strong>.NET/C#</strong> and <strong>TypeScript</strong>, integrated with <strong>Datadog</strong> for monitoring and redesigned infrastructure for improved scalability and incident response</li>
              <li>Helped engineer Crown accrual groups architecture transition from one-to-one to many-to-many mapping for <strong>1000+</strong> games serving <strong>millions</strong> of users, optimized infrastructure by migrating from <strong>TypeORM</strong> to direct <strong>SQL</strong> queries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Stealth Startup — Software Engineer Intern</h3>
            <p className="text-gray-600 mb-2">Jul 2024 - Feb 2025 • Remote</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Co-engineered a <strong>Flutter/Google Cloud</strong> social dining app for shared meal discounts via restaurant partnerships</li>
              <li>Attained <strong>97%</strong> accuracy in NSFW image detection by integrating Google Cloud Vision API for content moderation</li>
              <li>Processed <strong>10,000+</strong> daily requests with <strong>40%</strong> decrease in unresolved safety incidents by engineering a scalable safety infrastructure with Firebase, supporting five distinct reporting channels</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Arbin Instruments — Software Engineer Intern</h3>
            <p className="text-gray-600 mb-2">May 2024 - Aug 2024 • College Station, TX</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Reduced issue triage time by <strong>80%</strong> by developing a customer support ticket system with automated email notifications</li>
              <li>Streamlined data synchronization by developing a custom RESTful API integrating the customer support website with NetSuite for package tracking and invoice generation</li>
            </ul>
          </div>
        </div>
      </AboutSection>
    ),
    education: (
      <AboutSection title="Education" icon={GraduationCap}>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Brandeis University — B.S. in Computer Science, Minor in Economics</h3>
            <p className="text-gray-600 mb-2">Aug 2022 - Expected Dec 2025 • Waltham, MA</p>
            <p className="text-gray-700 font-semibold">GPA: 3.67/4.0</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Student Athlete - Brandeis University Varsity Swimming</h3>
            <p className="text-gray-600 mb-2">Aug 2022 - Present</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Exhibited discipline by consistently committing to every practice</li>
              <li>Enhanced team performance by guiding teammates in strengthening techniques</li>
            </ul>
          </div>
        </div>
      </AboutSection>
    ),
    coursework: (
      <AboutSection title="Relevant Coursework" icon={BookOpen}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Data Structures</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Algorithms</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Machine Learning</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Statistics</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Information Visualization</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Computer Systems</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Discrete Structures</span>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <span className="font-semibold text-blue-800">Theory of Computation</span>
          </div>
        </div>
      </AboutSection>
    )
  };

  if (!activePopup) return null;

  return (
    <div className="bg-white rounded-xl p-8 mx-auto overflow-y-auto h-full flex flex-col relative">
      {/* Close button positioned at top right */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition-colors duration-200"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="flex-grow flex flex-col mb-8">
        {content[activePopup]}
      </div>
      
      {showResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-100">
            <h2 className="text-2xl font-bold mb-4">Resume</h2>
            <iframe src={resume} className="w-full h-96 mb-4" />
            <div className="flex justify-between">
              <a
                href={resume}
                download
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Download Resume
              </a>
              <button
                onClick={() => setShowResume(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;