import React from 'react';
import { useAutomate } from './Carousel';

const AutomateButton: React.FC<Props> = ({ id }) => {
  const [automate, setAutomate] = useAutomate(id);

  return (
    <>
      <input
        type='checkbox'
        id='automate'
        name='automate'
        value='Bike'
        checked={automate ? true : false}
        onChange={() => setAutomate((p) => !p)}
      />
      <span onClick={() => setAutomate((p) => !p)}>Custom Automate Button</span>
    </>
  );
};

export default AutomateButton;

type Props = {
  id: string;
};
