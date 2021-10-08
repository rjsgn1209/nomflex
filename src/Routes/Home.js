import React, { useState, useEffect } from "react";
import { movieApi } from "../api";
import styled from "styled-components";
import Loading from "../Components/Loading";
import Poster from "../Components/Poster.js";
import Helmet from "react-helmet";

const Container = styled.div`
  margin: 15px;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  gap: 25px;
  margin-bottom: 20px;
`;

export default () => {
  const [movies, setMovies] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
  });

  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();

      setMovies({ nowPlaying, upcoming, popular });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(getMovie, []);
  return (
    <>
      <Helmet>
        <title>Movie | Nomflex</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Title>Now Playing</Title>
          <Items>
            {movies.nowPlaying &&
              movies.nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  title={movie.original_title}
                  id={movie.id}
                  imgURL={movie.poster_path}
                  year={movie.release_date.substr(0, 4)}
                  rating={movie.vote_average}
                  isMovie={true}
                />
              ))}
          </Items>
          <Title>Upcoming</Title>
          <Items>
            {movies.upcoming &&
              movies.upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  title={movie.original_title}
                  id={movie.id}
                  imgURL={movie.poster_path}
                  year={movie.release_date.substr(0, 4)}
                  rating={movie.vote_average}
                  isMovie={true}
                />
              ))}
          </Items>
          <Title>Popular</Title>
          <Items>
            {movies.popular &&
              movies.popular.map((movie) => (
                <Poster
                  key={movie.id}
                  title={movie.original_title}
                  id={movie.id}
                  imgURL={movie.poster_path}
                  year={movie.release_date.substr(0, 4)}
                  rating={movie.vote_average}
                  isMovie={true}
                />
              ))}
          </Items>
        </Container>
      )}
    </>
  );
};
