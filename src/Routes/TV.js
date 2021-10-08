import React, { useState, useEffect } from "react";
import { tvApi } from "../api";
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
`;

export default () => {
  const [shows, setShows] = useState({
    topRated: null,
    airingToday: null,
    popular: null,
  });

  const [loading, setLoading] = useState(true);

  const getShow = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();

      setShows({ topRated, airingToday, popular });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(getShow, []);
  return (
    <>
      <Helmet>
        <title>Show | Nomflex</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Title>TopRated</Title>
          <Items>
            {shows.topRated &&
              shows.topRated.map((show) => (
                <Poster
                  key={show.id}
                  title={show.original_name}
                  id={show.id}
                  imgURL={show.poster_path}
                  year={show.first_air_date.substr(0, 4)}
                  rating={show.vote_average}
                />
              ))}
          </Items>
          <Title>AiringToday</Title>
          <Items>
            {shows.airingToday &&
              shows.airingToday.map((show) => (
                <Poster
                  key={show.id}
                  title={show.original_name}
                  id={show.id}
                  imgURL={show.poster_path}
                  year={show.first_air_date.substr(0, 4)}
                  rating={show.vote_average}
                />
              ))}
          </Items>
          <Title>Popular</Title>
          <Items>
            {shows.popular &&
              shows.popular.map((show) => (
                <Poster
                  key={show.id}
                  title={show.original_name}
                  id={show.id}
                  imgURL={show.poster_path}
                  year={show.first_air_date.substr(0, 4)}
                  rating={show.vote_average}
                />
              ))}
          </Items>
        </Container>
      )}
    </>
  );
};
