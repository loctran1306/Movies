import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

type props = {
  mediaType: string | undefined;
  id: string | undefined;
};
const Similar = ({ mediaType, id }: props) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
