import { useEffect, useState } from 'react';

type TDimensions = {width: number, height: number};

export const useDimensions = (): TDimensions => {
  const [dimensions, setDimensions] = useState<TDimensions>({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
  const updateWindowDimensions = () => {
    setDimensions({width: window.innerWidth, height: window.innerHeight});
  };
  window.addEventListener("resize", updateWindowDimensions);
  return () => window.removeEventListener("resize", updateWindowDimensions)
}, []);

return ({
  width: dimensions.width,
  height: dimensions.height
})
}
