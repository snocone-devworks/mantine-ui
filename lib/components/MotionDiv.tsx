import { motion } from 'framer-motion';
import React, { useMemo } from 'react'

type SpringConfig = {
  bounce?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}

const undefinedSpring: SpringConfig = {
  bounce: undefined,
  damping: undefined,
  mass: undefined,
  stiffness: undefined,
  velocity: undefined,
  restSpeed: undefined,
  restDelta: undefined,
}

const defaultSpring: SpringConfig = {
  bounce: 0.1,
  damping: 10,
  mass: 0.5,
  stiffness: 25,
  velocity: undefined,
  restSpeed: undefined,
  restDelta: undefined,
}

type From = {
  x: string | number | undefined;
  y: string | number | undefined;
}

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  enterFrom?: 'top' | 'right' | 'bottom' | 'left';
  exitFrom?: 'top' | 'right' | 'bottom' | 'left';
  motionKey?: React.Key | null | undefined;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  spring?: boolean | Partial<SpringConfig>;
  style?: React.CSSProperties;
}

const MotionDiv = (props: Props) => {
  const enterFrom = useMemo<From>(() => {
    let returnValue: From = {
      x: undefined,
      y: undefined,
    };

    if (props.enterFrom === 'left') returnValue.x = '-100vw';
    if (props.enterFrom === 'right') returnValue.x = '100vw';
    if (props.enterFrom === 'top') returnValue.y = '-100vh';
    if (props.enterFrom === 'bottom') returnValue.y = '100vh';
    return returnValue;
  }, [props.enterFrom])

  const exitFrom = useMemo<From>(() => {
    let returnValue: From = {
      x: undefined,
      y: undefined,
    };

    if (props.exitFrom === 'left') returnValue.x = '-100vw';
    if (props.exitFrom === 'right') returnValue.x = '100vw';
    if (props.exitFrom === 'top') returnValue.y = '-100vh';
    if (props.exitFrom === 'bottom') returnValue.y = '100vh';
    return returnValue;
  }, [props.exitFrom])  

  const spring = useMemo<SpringConfig>(() => {
    if (!props.spring) return {...undefinedSpring};
    if (typeof props.spring === 'boolean') return {...defaultSpring};
    return {...undefinedSpring, ...props.spring};
  }, [props.spring])

  return (
    <motion.div
      key={props.motionKey}
      initial={{ opacity: 0, x: enterFrom.x, y: enterFrom.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: exitFrom.x, y: exitFrom.y}}
      style={props.style}
      transition={{
        delay: props.delay ?? 0,
        duration: props.duration ?? 0.4,
        ease: props.spring ? undefined : 'easeInOut',
        type: !props.spring ? 'tween' : 'spring',
        ...spring
      }}
    >
      {props.children}
    </motion.div>
  )
}

export default MotionDiv