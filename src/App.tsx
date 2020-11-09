import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

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
      <Container>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          {
            data?.value.map((item, index) => (
              <Grid item xs={6}>
                <Joke
                  key={index}
                  joke={item.joke}
                />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    )
  }
}

export default App;
