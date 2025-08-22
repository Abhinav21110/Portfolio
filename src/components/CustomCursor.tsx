import { useEffect, useRef } from 'react';
import gsap from 'gsap';


const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isColliding = useRef(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    const followerEl = followerRef.current;

    if (!cursorEl || !followerEl) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = gsap.quickSetter(followerEl, "x", "px");
    const ySet = gsap.quickSetter(followerEl, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      gsap.set(cursorEl, { x: mouse.x, y: mouse.y });
      xSet(pos.x);
      ySet(pos.y);

      const distance = Math.sqrt(Math.pow(mouse.x - pos.x, 2) + Math.pow(mouse.y - pos.y, 2));
      const currentlyColliding = distance < 5;

      if (currentlyColliding && !isColliding.current) {
        isColliding.current = true;
        gsap.to(followerEl, {
          scale: 0.8,
          backgroundColor: 'hsl(300, 100%, 50%)',
          ease: 'power2.out',
          duration: 0.3,
          onComplete: () => {
            gsap.to(followerEl, {
              backgroundColor: 'hsl(+=360, 100%, 50%)',
              repeat: -1,
              duration: 2,
              ease: 'linear'
            });
          }
        });
      } else if (!currentlyColliding && isColliding.current) {
        isColliding.current = false;
        gsap.killTweensOf(followerEl);
        gsap.to(followerEl, {
          scale: 1,
          backgroundColor: 'transparent',
          ease: 'power2.out',
          duration: 0.3
        });
      }
    });

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;
