import { useState, useEffect, useRef } from 'react';

export function useDimensions() {
  const ref = useRef(null);
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const newHeight = ref.current.clientHeight;
      const newWidth = ref.current.clientWidth;
      if (newHeight !== height) setHeight(newHeight);
      if (newWidth !== width) setWidth(newWidth);
    });
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect(); 
  }, []);

  return { ref, width, height };
}
