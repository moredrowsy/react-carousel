import React from 'react';
import { useAutomate } from '../Carousel';

const AutoSlideshowBtn: React.FC<Props> = ({ id }) => {
  const [automate, setAutomate] = useAutomate(id);

  return (
    <>
      <input
        type='checkbox'
        id='automate'
        name='automate'
        value='automate'
        checked={automate ? true : false}
        onChange={() => setAutomate((p) => !p)}
      />
      <span onClick={() => setAutomate((p) => !p)}>Automate Slideshow</span>
    </>
  );
};

export default AutoSlideshowBtn;

type Props = {
  id: string;
};
