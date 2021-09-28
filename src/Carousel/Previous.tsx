import React, { CSSProperties, useMemo } from 'react';
import { useIndex } from './hooks';

const Previous: React.FC<Props> = ({ id, size, style, children }) => {
  const [, setSelectedIdx] = useIndex(id);
  const containerStyle: CSSProperties = useMemo(
    () => ({
      cursor: 'pointer',
      userSelect: 'none',
    }),
    []
  );

  return (
    <span
      onClick={() => setSelectedIdx((p) => (p - 1 < 0 ? size - 1 : p - 1))}
      style={style ? { ...containerStyle, ...style } : containerStyle}
    >
      {children && children}
    </span>
  );
};

export default Previous;

type Props = {
  id: string;
  size: number;
  style?: CSSProperties;
};
