import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  # query getMovie($id: Int)은 아폴로를 위한 것-아폴로가 변수의 type을 검사 도와준다.
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
  }
`;

const Container = styled.div`
  padding: 2rem;
  padding-right: 10rem;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 28px;
`;
const Poster = styled.div`
  width: 25%;
  height: 25%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id: +id,
    },
  });
  return data ? (
    <Container>
      <Column>
        <Title>{data?.movie.title}</Title>
        <Subtitle>English · 4.5</Subtitle>
        <Description>lorem ipsum lalalla </Description>
        <Title>{loading ? "Loading..." : data.movie.title}</Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data.movie.language} · {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      <Poster
        bg={data && data.movie ? data.movie.medium_cover_image : ""}
      ></Poster>
    </Container>
  ) : (
    ""
  );
};

export default Detail;
