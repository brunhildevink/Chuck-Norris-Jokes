import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ValueModel } from '../models/ValueModel';

type Props = {
  joke: ValueModel;
  onUnFavorite: (joke: ValueModel) => void;
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

const Favorite = ({ joke, onUnFavorite }: Props) => {
  return (
    <ListItem>
      {joke.joke}
      <Label>
        <CheckboxContainer checked={true}>
          <HiddenCheckbox  onClick={() => onUnFavorite(joke)} />
          <StyledCheckbox checked={true}>
            <svg viewBox="0 0 24 24" fill="white" width="18px" height="18px">
              <path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </StyledCheckbox>
        </CheckboxContainer>
      </Label>
    </ListItem>
  )
}

export default Favorite;

const Label = styled.label`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxContainer = styled.div<{checked: boolean}>`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{checked: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-left: 20px;
  background: ${props => (props.checked ? 'pink' : 'lightgrey')};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;