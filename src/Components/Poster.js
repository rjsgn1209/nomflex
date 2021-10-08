import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Container = styled.div``;

const Img = styled.div`
  background-image: url(${(props) => props.bgURL});
  height: 200px;
  background-size: cover;
  border-radius: 5px;
  background-position: center center;
  transition: opecity 0.1s linear;
`;

const Rating = styled.span`
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opecity 0.1s linear;
`;

const ImgContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
  &:hover {
    ${Img} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  font-size: 14px;
  display: block;
  margin-bottom: 5px;

  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const Year = styled.span`
  font-size: 12px;
  opacity: 0.6;
`;

const Poster = ({ title, id, imgURL, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
    <Container>
      <ImgContainer>
        <Img
          bgURL={
            imgURL
              ? `https://image.tmdb.org/t/p/w300/${imgURL}`
              : require("../assets/noPosterSmall.png").default
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating} / 10
        </Rating>
      </ImgContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imgURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
