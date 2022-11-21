import { useEffect, useMemo, useState } from "react";
import { BreakpointName } from "../types";

const breakpoints: Record<BreakpointName, number> = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200
};

export const useDeviceSize = () => {
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(900);
  const deviceSize = useMemo<BreakpointName>(() => {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [width])

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }

    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return { deviceSize, height, width };
}

