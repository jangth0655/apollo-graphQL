import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const LIKE_MOVIE = gql`
  mutation LikeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const Movie = ({ id, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: {
      id: +id,
    },
  });

  return (
    <div>
      <Link to={`/${id}`}>{id}</Link>
      <button onClick={likeMovie}>{isLiked ? "UnLike" : "Liked"}</button>
    </div>
  );
};

export default Movie;
