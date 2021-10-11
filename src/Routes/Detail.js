import React, { useState, useEffect } from "react";
import { movieApi, tvApi } from "../api";
import Helmat from "react-helmet";
import Loading from "../Components/Loading";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.imgURL});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Cover = styled.div`
  background-image: url(${(props) => props.imgURL});
  border-radius: 5px;
  height: 100%;
  width: 30%;
  background-size: cover;
  background-position: center center;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.span`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 10px 0px;
  font-size: 12px;
  height: 20px;
  width: 100%;
  align-items: center;
  display: flex;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.div`
  font-size: 12px;
  opacity: 0.7;
  line-height: 2;
  width: 50%;
`;

const IMDB = styled.a`
  color: black;
  font-size: 10px;
  font-weight: 600;
  background: linear-gradient(to right, gold 0%, aqua 50%, pink 100%);
  padding: 3px 2px;
  border-radius: 5px;
  border: white solid 1px;
`;

const VideoContainer = styled.div`
  margin: 20px 0px;
`;

const Video = styled.iframe`
  margin-right: 20px;
`;

const SeriesContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

const Series = styled.div`
  margin-right: 20px;
  height: 200px;
  width: 130px;
  border-radius: 5px;
  background-image: url(${(props) => props.imgURL});
  background-size: cover;
  background-position: center center;
`;

const SeriesTitle = styled.span``;

const CompanyLogo = styled.div`
  background-image: url(${(props) => props.imgURL});
  height: 25px;
  width: 50px;
  border: white 2px solid;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border-radius: 2px;
  background-color: white;
`;

const CompanyName = styled.span`
  border: white solid 1px;
  padding: 2px 4px;
`;

export default ({
  location: { pathname },
  match: {
    params: { id },
  },
}) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const getDetail = async () => {
    try {
      if (pathname.includes("/tv/")) {
        const { data: result } = await tvApi.showDetail(id);
        setResult(result);
      } else {
        const { data: result } = await movieApi.movieDetail(id);
        setResult(result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  {
    console.log(document.getElementById("series"));
  }
  useEffect(getDetail, []);
  return loading ? (
    <>
      <Helmat>
        <title>Loading | Nomflex</title>
        <Loading />
      </Helmat>
    </>
  ) : (
    <Container>
      <Helmat>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflex
        </title>
      </Helmat>
      <Backdrop
        imgURL={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
      />
      <Content>
        <Cover
          imgURL={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substr(0, 4)
                : result.first_air_date
                ? result.first_air_date.substr(0, 4)
                : "null"}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>

            <Item>
              {result.genres && result.genres.length > 0 && (
                <>
                  <Divider>•</Divider>
                  {result.genres.map((genre, index) =>
                    index !== result.genres.length - 1
                      ? ` ${genre.name} /`
                      : ` ${genre.name}`
                  )}
                </>
              )}
            </Item>

            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <Item>
                  <IMDB href={`http://www.imdb.com/title/${result.imdb_id}`}>
                    IMDB
                  </IMDB>
                </Item>
              </>
            )}
            {console.log(result.production_companies)}
            {result.production_companies &&
              result.production_companies.length > 0 &&
              (result.production_companies[0].logo_path ? (
                <>
                  <Divider>•</Divider>
                  <CompanyLogo
                    imgURL={`https://image.tmdb.org/t/p/w500${result.production_companies[0].logo_path}`}
                  ></CompanyLogo>
                </>
              ) : result.production_companies[0].name ? (
                <>
                  <Divider>•</Divider>
                  <CompanyName>
                    {result.production_companies[0].name}
                  </CompanyName>
                </>
              ) : null)}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <VideoContainer>
            {result.videos.results.length > 0 && result.videos.results[0] && (
              <Video
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  result.videos.results[result.videos.results.length - 1].key
                }`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            )}

            {result.videos.results.length > 0 && result.videos.results[1] && (
              <Video
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  result.videos.results[result.videos.results.length - 2].key
                }`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            )}
          </VideoContainer>

          {result.seasons && result.seasons.length > 0 && (
            <SeriesContainer id="series">
              {result.seasons.map((movie) => (
                <div>
                  <SeriesTitle>{movie.name}</SeriesTitle>
                  {movie.poster_path ? (
                    <Series
                      imgURL={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    ></Series>
                  ) : (
                    <Series
                      imgURL={require("../assets/noPosterSmall.png").default}
                    ></Series>
                  )}
                </div>
              ))}
            </SeriesContainer>
          )}
        </Data>
      </Content>
    </Container>
  );
};
