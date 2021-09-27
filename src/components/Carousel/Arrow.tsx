import React, { CSSProperties, useMemo, useState } from 'react';

const Arrow: React.FC<Props> = ({
  width,
  height,
  color = '#bfbfbf',
  direction = 'up',
  thickness = 2,
  style = {},
}) => {
  const directionStyle: CSSProperties = styles[direction];

  const arrowNotActive: CSSProperties = useMemo(
    () => ({
      display: 'inline-block',
      boxSizing: 'border-box',
      width: width,
      height: height,
      background: 'transparent',
      borderTop: 0,
      borderLeft: 0,
      textDecoration: 'none',
      color: 'transparent',
    }),
    [width, height]
  );

  const arrowActive: CSSProperties = useMemo(
    () => ({
      display: 'inline-block',
      boxSizing: 'border-box',
      width: width,
      height: height,
      background: 'transparent',
      borderTop: `${thickness}px solid ${color}`,
      borderLeft: `${thickness}px solid ${color}`,
      textDecoration: 'none',
      color: 'transparent',
    }),
    [width, height, thickness, color]
  );

  const [arrowStyle, setArrowStyle] = useState<CSSProperties>(arrowNotActive);

  const onMouseEnter = () => {
    setArrowStyle(arrowActive);
  };

  const onMouseLeave = () => {
    setArrowStyle(arrowNotActive);
  };

  return (
    <span
      style={{ ...arrowStyle, ...directionStyle, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></span>
  );
};

export default Arrow;

const styles: Record<string, CSSProperties> = {
  up: {
    transform: 'rotate(45deg)',
  },
  down: {
    transform: 'rotate(-135deg)',
  },
  left: {
    transform: 'rotate(-45deg)',
  },
  right: {
    transform: 'rotate(135deg)',
  },
};

type Props = {
  width: number;
  height: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  thickness?: number;
  style?: CSSProperties;
};
