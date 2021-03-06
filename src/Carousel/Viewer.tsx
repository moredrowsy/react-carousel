import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import { useShareState } from './hooks/useShareState';

import { AutoSlide } from './types';
import Arrow from './Arrow';
import Next from './Next';
import Previous from './Previous';

const Viewer: React.FC<Props> = ({
  id,
  images,
  slideshow = false,
  duration = 2000,
  showButtons = true,
  buttonColor = 'white',
  buttonSize = 50,
}) => {
  const [selectedIdx, setSelectedIdx] = useShareState<number>(
    `carousel/selIdx/${id}`,
    0
  );
  const [autoSlide, setAutoSlide] = useShareState<AutoSlide>(
    `carousel/autoSlide/${id}`,
    {
      active: slideshow,
      timerId: null,
      duration: duration,
    }
  );

  // Set negative margin to center button more closely at 50% height
  const btnOffset: CSSProperties = useMemo(
    () => ({
      marginTop: -(buttonSize / 2),
    }),
    [buttonSize]
  );

  // Select next index; used in automatic slideshow
  const nextSlide = useCallback(
    () => setSelectedIdx((p) => (p + 1 >= images.length ? 0 : p + 1)),
    [setSelectedIdx, images.length]
  );

  // Set automatic slideshow
  useEffect(() => {
    if (autoSlide.active) {
      // Clear old setInterval
      if (autoSlide.timerId !== null) clearInterval(autoSlide.timerId);

      const timerId = setInterval(() => {
        nextSlide();
      }, autoSlide.duration);
      setAutoSlide((p) => ({ ...p, timerId }));
    }

    if (!autoSlide.active && autoSlide.timerId !== null) {
      clearInterval(autoSlide.timerId);
      setAutoSlide((p) => ({ ...p, timerId: null }));
    }

    return () => {
      if (autoSlide.timerId !== null) {
        clearInterval(autoSlide.timerId);
        setAutoSlide((p) => ({ ...p, timerId: null }));
      }
    };
  }, [autoSlide, setAutoSlide, nextSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div style={styles.container}>
      <div>
        <img src={images[selectedIdx]} alt='' style={styles.image} />
      </div>
      {showButtons && (
        <>
          <Previous
            id={id}
            size={images.length}
            style={{ ...styles.button, ...styles.buttonLeft, ...btnOffset }}
          >
            <Arrow
              width={buttonSize}
              height={buttonSize}
              color={buttonColor}
              direction='left'
            />
          </Previous>
          <Next
            id={id}
            size={images.length}
            style={{ ...styles.button, ...styles.buttonRight, ...btnOffset }}
          >
            <Arrow
              width={buttonSize}
              height={buttonSize}
              color={buttonColor}
              direction='right'
            />
          </Next>
        </>
      )}
    </div>
  );
};

export default Viewer;

const styles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    border: 0,
    margin: 0,
    padding: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  button: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    width: 'auto',
    userSelect: 'none',
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    right: 0,
  },
};

type Props = {
  id: string;
  images: string[];
  slideshow?: boolean;
  duration?: number;
  showButtons?: boolean;
  buttonColor?: string;
  buttonSize?: number;
};
