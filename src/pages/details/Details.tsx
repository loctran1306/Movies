import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Recommendation from "./carousel/Recommendation";
import Similar from "./carousel/Similar";
import Cast from "./cast/Cast";
import DetailsBanner from "./detailBanner/DetailBanner";
import VideosSection from "./videoSection/VideoSection";

const Details = () => {
  const { mediaType, id: movieId } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${movieId}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${movieId}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={movieId} />
      <Recommendation mediaType={mediaType} id={movieId} />
    </div>
  );
};

export default Details;
