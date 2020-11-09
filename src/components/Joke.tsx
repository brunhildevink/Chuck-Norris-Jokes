import React from 'react';

type Props = {
  joke: string;
}

const Jokes = ({ joke }: Props) => {
  return (
    <li>
      {joke}
    </li>
  )
}

export default Jokes;