import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

export function initializeAnimations() {
  // Set up GSAP defaults
  gsap.defaults({ ease: "power2.out", duration: 1 });

  // Scroll-dependent background text animations
  gsap.to(".scrolling-text-0", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  gsap.to(".scrolling-text-1", {
    xPercent: 50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
    },
  });

  gsap.to(".scrolling-text-2", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });

  // Scrolling shapes animations
  gsap.to(".scrolling-shapes", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  gsap.to(".scrolling-shapes-2", {
    xPercent: 50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2
    }
  });

  // Progress bar animation
  gsap.to("#progress-bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  // Hero section animations
  const heroTl = gsap.timeline();
  
  heroTl
    .from("#hero-name h1", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .from("#hero-surname h1", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8")
    .from("#hero-tagline", {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, "-=0.4")
    .from("#hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, "-=0.4")
    .from("#hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, "-=0.2");

  // Enhanced floating elements animations
  gsap.to(".floating-dot", {
    y: "random(-30, 30)",
    x: "random(-20, 20)",
    rotation: "random(-180, 180)",
    scale: "random(0.8, 1.2)",
    duration: "random(3, 6)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      amount: 2,
      from: "random"
    }
  });

  gsap.to(".floating-line", {
    rotation: "random(-45, 45)",
    scale: "random(0.5, 1.5)",
    duration: "random(4, 8)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 1
  });

  gsap.to(".floating-triangle", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
  });

  gsap.to(".floating-square", {
    rotation: "random(-180, 180)",
    scale: "random(0.8, 1.2)",
    duration: "random(5, 8)",
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  });

  // Hero background elements animation with scroll-based speed
  const bgElementsTl = gsap.to(".hero-bg-element", {
    y: "random(-50, 50)",
    x: "random(-30, 30)",
    scale: "random(0.8, 1.3)",
    duration: "random(8, 12)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      amount: 4,
      from: "random"
    }
  });

  // Speed up animation on scroll
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      gsap.to(bgElementsTl, { timeScale: 1 + self.getVelocity() / 80, duration: 0.3 });
    }
  });

  // Scrolling background color change
  const colorTl = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  colorTl
    .to("body", { backgroundColor: "#0a0a0a" })
    .to("body", { backgroundColor: "#003f5c" })
    .to("body", { backgroundColor: "#374c80" })
    .to("body", { backgroundColor: "#7a5195" })
    .to("body", { backgroundColor: "#bc5090" })
    .to("body", { backgroundColor: "#ef5675" })
    .to("body", { backgroundColor: "#ff764a" })
    .to("body", { backgroundColor: "#ffa600" });

  // About section particles
  gsap.to(".about-particle", {
    y: "random(-20, 20)",
    x: "random(-15, 15)",
    opacity: "random(0.1, 0.4)",
    duration: "random(3, 6)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
  });

  // Navigation animation
  gsap.from("#nav-container", {
    y: -50,
    opacity: 0,
    duration: 1,
    delay: 1.5,
    ease: "back.out(1.7)"
  });

  // About section animations
  gsap.from("#about-heading", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    }
  });

  gsap.from("#about-text", {
    x: -50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    }
  });

  gsap.from("#fun-fact-1", {
    x: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      end: "top 40%",
      scrub: 1
    }
  });

  gsap.from("#fun-fact-2", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
      trigger: "#about",
      start: "top 65%",
      end: "top 35%",
      scrub: 1
    }
  });

  // Skills section animations
  gsap.from("#skills-heading", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    }
  });

  // Animate skill cards with a single, optimized ScrollTrigger
  gsap.from(".skill-card", {
    y: 50,
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#skills-container",
      start: "top 85%",
      toggleActions: "play none none none",
    }
  });

  // Optimized hover animations for skill cards
  document.querySelectorAll('.skill-card').forEach((card) => {
    // Add will-change for better performance
    card.style.willChange = 'transform';
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Projects section animations - Optimized timing
  gsap.from("#projects-heading", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

  // Staggered project cards with better timing
  gsap.from(".project-card", {
    y: 60,
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: {
      amount: 0.8,
      from: "start"
    },
    scrollTrigger: {
      trigger: "#projects-grid",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  // Optimized project card hover animations
  document.querySelectorAll('.project-card').forEach((card, index) => {
    // Add will-change for better performance
    card.style.willChange = 'transform';
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Animate the emoji inside with reduced complexity
      const emoji = card.querySelector('.text-6xl');
      if (emoji) {
        gsap.to(emoji, {
          scale: 1.1,
          duration: 0.2,
          ease: "back.out(1.7)"
        });
      }
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      const emoji = card.querySelector('.text-6xl');
      if (emoji) {
        gsap.to(emoji, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });
  });

  // Interests section animations
  gsap.from("#interests-heading", {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#interests",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    }
  });

  gsap.from(".interest-item", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#interests-container",
      start: "top 80%",
      end: "top 40%",
      scrub: 1
    }
  });

  // Contact section animations
  gsap.from("#contact-heading", {
    y: 30,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    }
  });

  gsap.from("#contact-message", {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 75%",
      end: "top 45%",
      scrub: 1
    }
  });

  gsap.from("#contact-links > *", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#contact-links",
      start: "top 85%",
      end: "top 55%",
      scrub: 1
    }
  });

  // Enhanced smooth scroll navigation with active states
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 0
          },
          ease: "power3.inOut"
        });
        
        // Add click animation
        gsap.to(link, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    });
    
    // Add hover animations to nav links
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Update active nav link based on scroll position
  ScrollTrigger.batch("section", {
    onEnter: (elements) => {
      const id = elements[0].getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    },
    onEnterBack: (elements) => {
      const id = elements[0].getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    },
    onLeave: (elements) => {
      // Handle when leaving sections
    },
    onLeaveBack: (elements) => {
      const id = elements[0].getAttribute('id');
      const previousSection = elements[0].previousElementSibling;
      if (previousSection && previousSection.tagName === 'SECTION') {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${previousSection.id}`) {
            link.classList.add('active');
          }
        });
      } else {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      }
    }
  });

  // Parallax effects for sections
  gsap.utils.toArray("section").forEach((section, i) => {
    const bg = section.querySelector(".bg-gradient-glow");
    if (bg) {
      gsap.to(bg, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });

  // Text reveal animations for headings
  gsap.utils.toArray("h2").forEach(heading => {
    gsap.from(heading, {
      backgroundPosition: "200% center",
      duration: 1,
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "top 50%",
        scrub: 1
      }
    });
  });

  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  console.log('GSAP animations initialized successfully!');
}

// Export individual animation functions for modularity
export function animateElement(selector, animation) {
  return gsap.to(selector, animation);
}

export function createScrollAnimation(trigger, animation) {
  return gsap.to(animation.target, {
    ...animation,
    scrollTrigger: {
      trigger: trigger,
      ...animation.scrollTrigger
    }
  });
}