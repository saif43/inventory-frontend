import React from "react";
import { useSpring, animated } from "react-spring";

const Animation = (props) => {
  const style = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={style}>{props.children}</animated.div>;
};

export default Animation;
