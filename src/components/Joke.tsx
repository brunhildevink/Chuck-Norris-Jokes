import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ValueModel } from '../models/ValueModel';

type Props = {
  joke: ValueModel;
  onFavorite: (joke: ValueModel) => void;
  onUnFavorite: (joke: ValueModel) => void;
}

const Jokes = ({ joke, onFavorite, onUnFavorite }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      onFavorite(joke)
    } else {
      onUnFavorite(joke)
    }
  }, [checked])

  return (
    <ListItem>
      {joke.joke}
      <Label>
        <CheckboxContainer>
          <HiddenCheckbox  onClick={() => setChecked(!checked)} />
          <StyledCheckbox>
            <svg viewBox="0 0 24 24" fill="white" width="18px" height="18px">
              <path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </StyledCheckbox>
        </CheckboxContainer>
      </Label>
    </ListItem>
  )
}

export default Jokes;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 120px;
  background: white;
  padding: 20px;
  list-style-type: none;
  border-radius: 14px;
  -webkit-box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.1);
  -moz-box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.1);
  box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.1);
`;

const Label = styled.label`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
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

const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-left: 20px;
  background: lightgrey;
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;