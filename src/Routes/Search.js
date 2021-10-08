import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from "../api";
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

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 50px;
`;

export default () => {
  const [result, setResult] = useState({
    movieResult: null,
    showResult: null,
    term: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (result.term !== "") {
      getResults();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value: term },
    } = event;
    setResult({ term });
  };

  const getResults = async () => {
    try {
      setLoading(true);
      const {
        data: { results: movieResult },
      } = await movieApi.search(result.term);
      const {
        data: { results: showResult },
      } = await tvApi.search(result.term);

      setResult({ movieResult, showResult });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Search | Nomflex</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV show..."
          value={result.term}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loading />
      ) : (
        <>
          {result.movieResult && (
            <>
              <Title>Movie Result</Title>
              <Items>
                {result.movieResult.map((movie) => (
                  <Poster
                    key={movie.id}
                    title={movie.original_title}
                    id={movie.id}
                    imgURL={movie.poster_path}
                    year={
                      movie.release_date ? movie.release_date.substr(0, 4) : ""
                    }
                    rating={movie.vote_average}
                    isMovie={true}
                  />
                ))}
              </Items>
            </>
          )}

          {result.showResult && (
            <>
              <Title>Show Result</Title>
              <Items>
                {result.showResult.map((show) => (
                  <Poster
                    key={show.id}
                    title={show.original_name}
                    id={show.id}
                    imgURL={show.poster_path}
                    year={
                      show.first_air_date
                        ? show.first_air_date.substr(0, 4)
                        : ""
                    }
                    rating={show.vote_average}
                  />
                ))}
              </Items>
            </>
          )}
        </>
      )}
    </Container>
  );
};
