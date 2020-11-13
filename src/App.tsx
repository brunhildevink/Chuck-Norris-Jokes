import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import styled, { createGlobalStyle } from "styled-components";

// components
import Joke from "./components/Joke";
import Favorite from "./components/Favorite";

// models
import { JokeModel } from "./models/JokeModel";
import { ValueModel } from "./models/ValueModel";

function App() {
  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isInterval, setIsInterval] = useState<boolean>(false);
  const [data, setData] = useState<ValueModel[]>([]);
  const [allData, setAllData] = useState<ValueModel[]>();
  const [newJoke, setNewJoke] = useState<ValueModel>();
  const [favorites, setFavorites] = useState<ValueModel[]>([]);

  useEffect(() => {
    fetchLocalData();
    fetchData();
  }, []);

  useEffect(() => {
    if (!allData) return;
    if (isInterval) {
      setData([]);
      setTimer(allData);
    } else {
      setData(allData);
    }
  }, [isInterval, allData]);

  useEffect(() => {
    if (!newJoke) return;
    setData([...data, newJoke]);
  }, [newJoke]);

  const fetchLocalData = () => {
    const localFavorites = localStorage.getItem("jokes");
    if (localFavorites !== null) {
      setFavorites(JSON.parse(localFavorites));
    }
  };

  const fetchData = async () => {
    fetch("https://api.icndb.com/jokes/random/10/")
      .then((res) => res.json())
      .then(
        (result: JokeModel) => {
          setIsInterval(false);
          setIsLoaded(true);
          setAllData(result.value);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const setTimer = (allData: ValueModel[]) => {
    const newData = [...allData];
    setNewJoke(newData.pop());

    const intervalId = setInterval(() => {
      const joke = newData.pop();
      if (joke) {
        setNewJoke(joke);
      } else {
        clearInterval(intervalId);
      }
    }, 5000);
  };

  const onFavorite = (joke: ValueModel) => {
    if (favorites.length === 10) return;
    const newFavorites = [...favorites];
    setData(data.filter((item) => item !== joke));
    newFavorites.push(joke);
    localStorage.setItem("jokes", JSON.stringify(newFavorites));
    fetchLocalData();
  };

  const onUnFavorite = (joke: ValueModel) => {
    const newFavorites = [...favorites];
    const found = newFavorites.find((item) => item.id === joke.id);

    if (found) {
      const index = newFavorites.indexOf(found);
      newFavorites.splice(index, 1);
      localStorage.setItem("jokes", JSON.stringify(newFavorites));
      fetchLocalData();
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Container>
        <GlobalStyle />
        <h1>Jokes 😂</h1>
        <div>Loading jokes...</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <GlobalStyle />
        <h1>Jokes 😂</h1>

        <Grid container direction="row" spacing={4}>
          {data?.map((item, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <Joke
                joke={item}
                onFavorite={onFavorite}
                onUnFavorite={onUnFavorite}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container direction="row" spacing={6}>
          <Grid item lg={3} xs={12}>
            <Button onClick={fetchData}>Load more jokes</Button>
          </Grid>
          <Grid item lg={3} xs={12}>
            <ButtonSecondary onClick={() => setIsInterval(true)}>
              Set timer for 10 jokes
            </ButtonSecondary>
          </Grid>
        </Grid>

        <h1>Favorites💗</h1>

        <Grid container direction="row" spacing={4}>
          {favorites?.map((item, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <Favorite joke={item} onUnFavorite={onUnFavorite} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f9ff;
  }
`;

const Button = styled.button`
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid #214252;
  background: #214252;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  padding: 20px 30px;
  width: 100%;
`;

const ButtonSecondary = styled.button`
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid #214252;
  color: #214252;
  background: none;
  text-transform: uppercase;
  font-weight: 600;
  padding: 20px 30px;
  width: 100%;
`;
