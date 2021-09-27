import React, { CSSProperties, useMemo } from 'react';
import { useShareState } from './useShareState';

import Arrow from './Arrow';
import Next from './Next';
import Previous from './Previous';

const Viewer: React.FC<Props> = ({ id, images, showButtons = true }) => {
  const [selectedIdx] = useShareState<number>(`selIdx/${id}`, 0);
  const btnHeight = 50;

  // Set negative margin to center button more closely at 50% height
  const btnOffset: CSSProperties = useMemo(
    () => ({
      marginTop: -btnHeight,
    }),
    [btnHeight]
  );

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
            <span>
              <Arrow width={50} height={50} direction='left' />
            </span>
          </Previous>
          <Next
            id={id}
            size={images.length}
            style={{ ...styles.button, ...styles.buttonRight, ...btnOffset }}
          >
            <span>
              <Arrow width={50} height={50} direction='right' />
            </span>
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
    padding: '16px',
    color: 'white',
    transition: '0.6s ease',
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
  showButtons?: boolean;
};
