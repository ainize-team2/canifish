import React, { FC, useState } from 'react';
import { Toggle } from './Toggle';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'components|Toggles',
  component: Toggle,
  decorators: [withKnobs],
};

export const Primary: FC = () => {
  const [ toggle, setToggle ] = useState<boolean>(
    true,
  );

  return (
    <Toggle first={"ON"} second={"OFF"} active={toggle} onClick={(e) => {
      setToggle(!toggle);
    }} />
  );
};
