import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

// components
import Joke from './components/Joke';

// models
import { JokeModel } from './models/JokeModel';
import { ValueModel } from './models/ValueModel';

function App() {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<JokeModel>();
  const [favorites, setFavorites] = useState<ValueModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    renderFavorites();
  }, [favorites])

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

  const onFavorite = (joke: ValueModel) => {
    const newFavorites = [...favorites];
    newFavorites.push(joke);
    setFavorites(newFavorites);
  }

  const onUnFavorite = (joke: ValueModel) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(joke);
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  }

  const renderFavorites = () => {
    // renderfavorites
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
                  joke={item}
                  onFavorite={onFavorite}
                  onUnFavorite={onUnFavorite}
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
