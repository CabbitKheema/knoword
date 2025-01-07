import { useEffect, useRef } from "react";

const About = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <main
        className="flex-1 overflow-y-scroll bg-green-900 p-4"
        ref={scrollContainerRef}
      >
        <div className="h-[2000px]">Scroll me down!</div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-4">Footer</footer>
    </div>
  );
};

export default About;
