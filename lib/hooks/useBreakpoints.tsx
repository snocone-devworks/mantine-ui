import { useEffect, useState } from "react";

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Breakpoint = {
  name: BreakpointName;
  width: number;
}

const breakpoints: Breakpoint[] = [
  { name: 'xl', width: 1200 },
  { name: 'lg', width: 992 },
  { name: 'md', width: 768 },
  { name: 'sm', width: 576 },
  { name: 'xs', width: 0 },
];

export const useBreakpoints = () => {
  const [deviceSize, setDeviceSize] = useState<BreakpointName>('xs');
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(900);

  useEffect(() => {
    function handleResize() {
      let size: number = window.innerWidth;
      let match = breakpoints.find(b => size >= b.width)?.name;

      setDeviceSize(match ?? 'xs');
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const breakpointExcludes = (sizes: BreakpointName[]): boolean => !sizes.includes(deviceSize);
  const breakpointIncludes = (sizes: BreakpointName[]): boolean => sizes.includes(deviceSize);

  const maxBreakpoint = (size: BreakpointName): boolean => {
    let sizes: BreakpointName[] = [];

    if (size === 'xl') sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    if (size === 'lg') sizes = ['xs', 'sm', 'md', 'lg'];
    if (size === 'md') sizes = ['xs', 'sm', 'md'];
    if (size === 'sm') sizes = ['xs', 'sm'];
    if (size === 'xs') sizes = ['xs'];

    return sizes.includes(deviceSize);
  }

  const minBreakpoint = (size: BreakpointName): boolean => {
    let sizes: BreakpointName[] = [];

    if (size === 'xl') sizes = ['xl'];
    if (size === 'lg') sizes = ['lg', 'xl'];
    if (size === 'md') sizes = ['md', 'lg', 'xl'];
    if (size === 'sm') sizes = ['sm', 'md', 'lg', 'xl'];
    if (size === 'xs') sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

    return sizes.includes(deviceSize);
  }

  return { breakpointExcludes, breakpointIncludes, deviceSize, maxBreakpoint, minBreakpoint, height, width };
}