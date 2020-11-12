import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

// components
import Joke from './components/Joke';
import Favorite from './components/Favorite';

// models
import { JokeModel } from './models/JokeModel';
import { ValueModel } from './models/ValueModel';

function App() {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ValueModel[]>([]);
  const [favorites, setFavorites] = useState<ValueModel[]>([]);

  useEffect(() => {
    fetchLocalData();
    fetchData();
  }, [])

  const fetchLocalData = () => {
    const localFavorites = localStorage.getItem('jokes');
    if (localFavorites !== null) {
      setFavorites(JSON.parse(localFavorites));
    }
  }

  const fetchData = async () => {
    fetch('http://api.icndb.com/jokes/random/10/')
    .then(res => res.json())
    .then(
      (result: JokeModel) => {
        setData(result.value);
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
    localStorage.setItem('jokes', JSON.stringify(newFavorites));
    fetchLocalData();
  }

  const onUnFavorite = (joke: ValueModel) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(joke);
    newFavorites.splice(index, 1);
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
    <Container>
      <h1>Jokes😭</h1>

      <Grid container direction="row" justify="center" spacing={2}>
        {
          data?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Joke
                joke={item}
                onFavorite={onFavorite}
                onUnFavorite={onUnFavorite}
              />
            </Grid>
          ))
        }
        <Grid item>
          <button onClick={fetchData}>Load more jokes</button>
        </Grid>
      </Grid>

      <h1>Favorites💗</h1>

      <Grid container direction="row" justify="center" spacing={2}>
        {
          favorites?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Favorite
                key={`favorite-${index}`}
                joke={item}
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
