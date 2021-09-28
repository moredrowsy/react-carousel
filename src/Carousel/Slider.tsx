import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useIndex } from './hooks';

const Slider: React.FC<Props> = ({
  id,
  thumbnails,
  thumbnailWidth,
  thumbnailHeight,
}) => {
  const [selectedIdx, setSelectedIdx] = useIndex(id);
  const sliderRef = useRef<HTMLDivElement>(null);

  const thumbStyles: CSSProperties = useMemo(
    () => ({
      minWidth: thumbnailWidth,
      minHeight: thumbnailHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      opacity: 0.5,
    }),
    [thumbnailWidth, thumbnailHeight]
  );

  const thumbStylesSelected: CSSProperties = useMemo(
    () => ({
      minWidth: thumbnailWidth,
      minHeight: thumbnailHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    }),
    [thumbnailWidth, thumbnailHeight]
  );

  const onWheel = (evt: WheelEvent) => {
    evt.preventDefault();
    if (sliderRef && sliderRef.current) {
      sliderRef.current.scrollLeft += evt.deltaY;
    }
  };

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      const savedSliderRef = sliderRef.current;
      savedSliderRef.addEventListener('wheel', onWheel, {
        passive: false,
      });

      return () => {
        savedSliderRef.removeEventListener('wheel', onWheel);
      };
    }
  }, [sliderRef]);

  // Scroll selected thumbnail into view
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      const scrollWindow =
        sliderRef.current.scrollLeft +
        sliderRef.current.offsetWidth -
        thumbnailWidth;

      const newScrollLeft = selectedIdx * thumbnailWidth;

      if (
        newScrollLeft < sliderRef.current.scrollLeft ||
        newScrollLeft > scrollWindow
      ) {
        sliderRef.current.scrollLeft = newScrollLeft;
      }
    }
  }, [sliderRef, selectedIdx, thumbnailWidth]);

  return (
    <div style={styles.container} ref={sliderRef}>
      {thumbnails.map((thumb, idx) => (
        <div
          key={thumb}
          style={idx === selectedIdx ? thumbStylesSelected : thumbStyles}
        >
          <img
            src={thumb}
            alt=''
            style={styles.image}
            onClick={() => setSelectedIdx(idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;

const styles: Record<string, CSSProperties> = {
  container: {
    overflowX: 'hidden',
    display: 'flex',
    border: 0,
    margin: 0,
    padding: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
};

type Props = {
  id: string;
  thumbnails: string[];
  thumbnailWidth: number;
  thumbnailHeight: number;
};
