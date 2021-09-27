import React from 'react';

const AutomateButton: React.FC<Props> = ({ active }) => {
  return (
    <>
      <input
        type='checkbox'
        id='automate'
        name='automate'
        value='Bike'
        checked={active === 'true'}
        onChange={() => {}}
      />
      <label htmlFor='automate'>Automate</label>
    </>
  );
};

export default AutomateButton;

type Props = {
  active?: 'true' | 'false';
};
