import React, { CSSProperties, useMemo } from 'react';
import { useIndex } from './hooks';

const Next: React.FC<Props> = ({ id, size, style, children }) => {
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
      onClick={() => setSelectedIdx((p) => (p + 1 >= size ? 0 : p + 1))}
      style={style ? { ...containerStyle, ...style } : containerStyle}
    >
      {children && children}
    </span>
  );
};

export default Next;

type Props = {
  id: string;
  size: number;
  style?: CSSProperties;
};
