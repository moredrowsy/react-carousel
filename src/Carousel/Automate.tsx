import React, { CSSProperties, useMemo } from 'react';
import { useSelectShareState, useSetShareState } from './hooks/useShareState';
import { AutoSlide } from './types';

const Automate: React.FC<Props> = ({ id, style, children }) => {
  const autoSlide = useSelectShareState<AutoSlide>(`carousel/autoSlide/${id}`);
  const setAutoSlide = useSetShareState<AutoSlide>(`carousel/autoSlide/${id}`);

  const containerStyle: CSSProperties = useMemo(
    () => ({
      cursor: 'pointer',
      userSelect: 'none',
    }),
    []
  );

  return (
    <span
      onClick={() => setAutoSlide((p) => ({ ...p, active: !p.active }))}
      style={style ? { ...containerStyle, ...style } : containerStyle}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            active: autoSlide && autoSlide.active.toString(),
          })
        : children}
    </span>
  );
};

export default Automate;

type Props = {
  id: string;
  style?: CSSProperties;
};
