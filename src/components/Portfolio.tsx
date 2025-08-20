import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ScrollingText from './ScrollingText';

const Portfolio = () => {
  useEffect(() => {
    // Import and initialize GSAP animations
    import('../animations/gsapAnimations.js').then((module) => {
      module.initializeAnimations();
    });

    // Cleanup function
    return () => {
      // GSAP cleanup if needed
    };
  }, []);

  const skills = [
    'Python',
    'Machine Learning',
    'Fine Tuning',
    'Web Development',
    'App Development',
    'JavaScript',
    'CSS',
    'C++',
    'C',
    'Java'
  ];

  const projects = [
    { title: 'Project One', tech: 'React, Node.js' },
    { title: 'Project Two', tech: 'Python, ML' },
    { title: 'Project Three', tech: 'JavaScript, CSS' },
    { title: 'Project Four', tech: 'C++, Algorithms' },
    { title: 'Project Five', tech: 'Java, Spring' },
    { title: 'Project Six', tech: 'Web Dev, APIs' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Background Scrolling Text */}
      <ScrollingText />
      
      {/* Progress Indicator */}
      <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-gradient-primary z-50"></div>
      
      {/* Navigation */}
      <nav className="fixed top-8 right-8 z-40">
        <div id="nav-container" className="bg-card/80 backdrop-blur-md rounded-full px-6 py-3 border border-border">
          <div className="flex gap-6 text-sm">
            <a href="#home" className="nav-link hover:text-primary transition-colors">Home</a>
            <a href="#about" className="nav-link hover:text-primary transition-colors">About</a>
            <a href="#skills" className="nav-link hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="nav-link hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="nav-link hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-bg-element absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
          <div className="hero-bg-element absolute bottom-32 right-20 w-48 h-48 bg-electric/5 rounded-full blur-2xl"></div>
          <div className="hero-bg-element absolute top-1/2 left-1/4 w-24 h-24 bg-purple/5 rounded-full blur-lg"></div>
          <div className="hero-bg-element absolute bottom-1/4 left-1/3 w-40 h-40 bg-orange/5 rounded-full blur-xl"></div>
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-8">
          <div id="hero-name" className="overflow-hidden">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              GOVIND
            </h1>
          </div>
          <div id="hero-surname" className="overflow-hidden">
            <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-electric bg-clip-text text-transparent">
              ABHINAV
            </h1>
          </div>
          <div id="hero-tagline" className="mb-6">
            <p className="text-xl md:text-2xl text-muted-foreground">
              Neil Gogte Institute of Technology | Coder | Creator
            </p>
          </div>
          <div id="hero-subtitle" className="mb-12">
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              I love developing things & learning new things every day.
            </p>
          </div>
          <div id="hero-cta" className="space-y-4">
            <p className="text-base text-muted-foreground">2nd year student at Neil Gogte Institute of Technology</p>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full floating-dot shadow-glow"></div>
        <div className="absolute bottom-40 right-32 w-6 h-6 bg-electric rounded-full floating-dot shadow-electric"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple rounded-full floating-dot shadow-purple"></div>
        <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-orange rounded-full floating-dot"></div>
        <div className="floating-line absolute top-10 right-10 w-1 h-20 bg-gradient-primary opacity-30"></div>
        <div className="floating-line absolute bottom-10 left-10 w-20 h-1 bg-gradient-electric opacity-30"></div>
        <div className="floating-triangle absolute top-1/4 left-32 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-primary opacity-40"></div>
        <div className="floating-square absolute bottom-1/3 right-40 w-6 h-6 border-2 border-purple rotate-45 opacity-30"></div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 relative z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="about-particle absolute top-20 left-20 w-2 h-2 bg-primary/20 rounded-full"></div>
          <div className="about-particle absolute bottom-32 right-32 w-3 h-3 bg-electric/20 rounded-full"></div>
          <div className="about-particle absolute top-1/2 right-20 w-1 h-1 bg-purple/20 rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div id="about-heading" className="mb-8">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">About</h2>
              <div className="w-20 h-1 bg-gradient-primary"></div>
            </div>
            <div id="about-text" className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Hi, I'm Govind Abhinav, a second-year student at Neil Gogte Institute of Technology 
                pursuing my passion for coding and creative development. I'm driven by curiosity, 
                a love for building, and relentless learning.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <Card id="fun-fact-1" className="p-6 bg-gradient-to-br from-primary/10 to-electric/10 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Musical Excellence</h3>
                  <p className="text-foreground/80">
                    10+ years experience in electronic keyboard (Initial to Grade 6, Trinity College London; all with distinction)
                  </p>
                </div>
              </div>
            </Card>
            
            <Card id="fun-fact-2" className="p-6 bg-gradient-to-br from-purple/10 to-orange/10 border-purple/20">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-purple rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-purple mb-2">Creative Expression</h3>
                  <p className="text-foreground/80">
                    Singing as a hobby enriches my creativity and brings balance to my technical pursuits.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20">
        <div className="max-w-6xl mx-auto px-8">
            <div id="skills-heading" className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 relative">
              <span className="relative z-10">Skills</span>
              <div className="absolute inset-0 bg-gradient-electric bg-clip-text text-transparent blur-sm opacity-50">Skills</div>
            </h2>
            <div className="w-20 h-1 bg-gradient-electric mx-auto"></div>
          </div>
          
          <div id="skills-container" className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div key={skill} className={`skill-card skill-card-${index} group`}>
                <Card className="p-6 text-center hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110">💻</div>
                  <h3 className="font-semibold text-foreground relative z-10">{skill}</h3>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div id="projects-heading" className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Projects</h2>
            <div className="w-20 h-1 bg-gradient-warm mx-auto"></div>
          </div>
          
          <div id="projects-grid" className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`project-card project-card-${index}`}>
                <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-electric/20 flex items-center justify-center">
                    <div className="text-6xl opacity-50">🚀</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{project.tech}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="min-h-screen flex items-center py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div id="interests-heading" className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Interests</h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto"></div>
          </div>
          
          <div id="interests-container" className="grid md:grid-cols-2 gap-12">
            <div className="interest-item">
              <Card className="p-8 bg-gradient-to-br from-electric/10 to-primary/10 border-electric/20 hover:shadow-electric transition-all duration-500">
                <div className="text-6xl mb-6">🎹</div>
                <h3 className="text-2xl font-semibold mb-4 text-electric">Electronics & Music</h3>
                <p className="text-foreground/80">
                  Passionate about electronic keyboards and the intersection of technology and music creation.
                </p>
              </Card>
            </div>
            
            <div className="interest-item">
              <Card className="p-8 bg-gradient-to-br from-purple/10 to-orange/10 border-purple/20 hover:shadow-purple transition-all duration-500">
                <div className="text-6xl mb-6">🎤</div>
                <h3 className="text-2xl font-semibold mb-4 text-purple">Singing</h3>
                <p className="text-foreground/80">
                  Finding creative expression through vocal performance and exploring different musical styles.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div id="contact-heading" className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Let's Connect</h2>
            <div className="w-20 h-1 bg-gradient-electric mx-auto mb-8"></div>
            <p id="contact-message" className="text-xl text-foreground/80 mb-12">
              Let's connect and create something amazing!
            </p>
          </div>
          
          <div id="contact-links" className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Card className="p-4 hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground">📧 govind.abhinav@example.com</p>
            </Card>
            <Card className="p-4 hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground">🔗 Connect on LinkedIn</p>
            </Card>
            <Card className="p-4 hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground">🐱 GitHub Profile</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;