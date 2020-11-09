import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// components
import Checkbox from './Checkbox';

type Props = {
  joke: string;
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fceef5;
  padding: 20px;
  list-style-type: none;
  border-radius: 14px;
`;

const Jokes = ({ joke }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <ListItem>
      {joke}
      <Checkbox
        checked={checked}
        setChecked={setChecked}
      />
    </ListItem>
  )
}

export default Jokes;