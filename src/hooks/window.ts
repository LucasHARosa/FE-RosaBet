import { useEffect, useState } from "react";

export function useWindow() {
  const [width, setWidth] = useState<number | null>(null);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowSizeChange();

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = !!(width && width < 768);

  return { width, isMobile };
}
