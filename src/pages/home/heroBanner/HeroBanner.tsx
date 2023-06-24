import React, { useState, useEffect } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "../../../store/store";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  // Redux
  const { url } = useSelector((state) => state.configUrl);
  // Navigate
  const navigate = useNavigate();

  // Hooks
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      data && data.results[Math.floor(Math.random() * 20)].backdrop_path;
    if (bg) {
      setBackground(url.backdrop + bg);
    }
  }, [data, url.backdrop]);

  const handleQuerySearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, Tv shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleQuerySearch}
                type="text"
                placeholder="Search for a movie or tv show..."
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
