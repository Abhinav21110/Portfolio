const ScrollingText = () => {
  const texts = [
    "DEVELOPER • CREATOR • INNOVATOR • LEARNER • CODER • DREAMER • BUILDER • ARTIST • ",
    "PYTHON • MACHINE LEARNING • WEB DEV • JAVASCRIPT • C++ • JAVA • CSS • REACT • ",
    "MUSIC • KEYBOARD • SINGING • CREATIVITY • PASSION • TECHNOLOGY • EXCELLENCE • "
  ];

  return (
    <>
      {/* Background scrolling texts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-5">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`scrolling-text scrolling-text-${index} absolute whitespace-nowrap text-8xl font-bold`}
            style={{
              top: `${20 + index * 30}%`,
              fontSize: `${8 - index * 1}rem`,
            }}
          >
            {text.repeat(5)}
          </div>
        ))}
      </div>
      
      {/* Additional decorative scrolling elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="scrolling-shapes absolute top-1/4 left-0 flex gap-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-primary/20' : 
                i % 3 === 1 ? 'bg-electric/20' : 'bg-purple/20'
              }`}
            />
          ))}
        </div>
        
        <div className="scrolling-shapes-2 absolute top-3/4 left-0 flex gap-32">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-20 ${
                i % 2 === 0 ? 'bg-orange/10' : 'bg-electric/10'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollingText;