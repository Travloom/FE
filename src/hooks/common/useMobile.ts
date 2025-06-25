import { useEffect, useState } from "react";

const useMobile = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [isUnderTablet, setIsUnderTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsUnderTablet(window.innerWidth < 1080)
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return { isMobile, isUnderTablet };
}

export default useMobile;