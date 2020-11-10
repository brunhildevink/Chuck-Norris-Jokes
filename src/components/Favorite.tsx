import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ValueModel } from '../models/ValueModel';

type Props = {
  joke: ValueModel;
}

const Favorite = ({ joke }: Props) => {
  return (
    <ListItem>
      {joke.joke}
    </ListItem>
  )
}

export default Favorite;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  background: #fceef5;
  padding: 20px;
  list-style-type: none;
  border-radius: 14px;
`;