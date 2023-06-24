import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

type props = {
  mediaType: string | undefined;
  id: string | undefined;
};
const Recommendation = ({ mediaType, id }: props) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
