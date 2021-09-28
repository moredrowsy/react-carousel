import React, { CSSProperties, useState } from 'react';

const Arrow: React.FC<Props> = ({
  width,
  height,
  color = 'white',
  direction = 'up',
  style = {},
}) => {
  const directionStyle: CSSProperties = styles[direction];

  const [arrowStyle, setArrowStyle] = useState<CSSProperties>(styles.hidden);

  const onMouseEnter = () => {
    setArrowStyle(styles.active);
  };

  const onMouseLeave = () => {
    setArrowStyle(styles.hidden);
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill={color}
      style={{ width, height, ...arrowStyle, ...directionStyle, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z' />
    </svg>
  );
};

export default Arrow;

const styles: Record<string, CSSProperties> = {
  up: {
    transform: 'rotate(-90deg)',
  },
  down: {
    transform: 'rotate(90deg)',
  },
  left: {
    transform: 'rotate(-180deg)',
  },
  right: {
    transform: 'rotate(0deg)',
  },
  active: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

type Props = {
  width: number;
  height: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: CSSProperties;
};
