import React from 'react';
import { useDuration } from '../Carousel';

const DurationInput: React.FC<Props> = ({ id }) => {
  const [duration, setDuration] = useDuration(id);

  return (
    <>
      <input
        type='number'
        id='duration'
        name='duration'
        value={duration}
        min={500}
        step={500}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        style={{ width: 70 }}
      />
      <span style={{ marginLeft: 5 }}>Slideshow Duration</span>
    </>
  );
};

export default DurationInput;

type Props = {
  id: string;
};
