import { useSelector } from "../../store/store";
import "./Genres.scss";
type props = {
  idGenres: any;
};
const Genres = ({ idGenres }: props) => {
  const { genres } = useSelector((state) => state.configUrl);

  return (
    <div className="genres">
      {idGenres.map((g: any) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
