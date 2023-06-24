import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import "../trending/Trending.scss";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState<string>("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const handleChangeTab = (tab: string) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTab
          dataTab={["Movies", "Tv shows"]}
          onChangeTab={handleChangeTab}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
