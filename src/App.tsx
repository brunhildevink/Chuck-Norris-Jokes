import React, { useState, useEffect } from 'react';

// components
import Joke from './components/Joke';

// models
import { JokeModel } from './models/JokeModel';

function App() {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<JokeModel>();

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    fetch('http://api.icndb.com/jokes/random/10/')
    .then(res => res.json())
    .then(
      (result) => {
        setData(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        {
          data?.value.map((item, index) => (
            <Joke
              key={index}
              joke={item.joke}
            />
          ))
        }
      </>
    )
  }

}

export default App;
