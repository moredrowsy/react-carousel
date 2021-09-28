import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useIndex } from './hooks';

import Arrow from './Arrow';
import Next from './Next';
import Previous from './Previous';

const Slider: React.FC<Props> = ({
  id,
  thumbnails,
  thumbnailWidth,
  thumbnailHeight,
  showButtons = true,
  buttonColor = 'white',
  buttonSize = 30,
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

  // Set negative margin to center button more closely at 50% height
  const btnOffset: CSSProperties = useMemo(
    () => ({
      marginTop: -(buttonSize / 2),
    }),
    [buttonSize]
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
    <div style={styles.container}>
      <div style={styles.slider} ref={sliderRef}>
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
      {showButtons && (
        <>
          <Previous
            id={id}
            size={thumbnails.length}
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
            size={thumbnails.length}
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

export default Slider;

const styles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    border: 0,
    margin: 0,
    padding: 0,
  },
  slider: {
    overflowX: 'hidden',
    height: '100%',
    width: '100%',
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
  thumbnails: string[];
  thumbnailWidth: number;
  thumbnailHeight: number;
  showButtons?: boolean;
  buttonColor?: string;
  buttonSize?: number;
};
