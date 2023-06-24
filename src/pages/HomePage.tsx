import { useEffect } from "react";
import { useDispatch, useSelector } from "../store/store";
import { getHomeMoviesList } from "../store/slices/home";

function HomePage() {
  const dispatch = useDispatch();
  const { homeMoviesList, page, totalPage, totalResult } = useSelector(
    (state) => state.homeMovies
  );
  console.log("home", homeMoviesList, page, totalPage, totalResult);

  useEffect(() => {
    dispatch(getHomeMoviesList);
  }, [dispatch]);
  return <>Ahahiahai</>;
}

export default HomePage;
