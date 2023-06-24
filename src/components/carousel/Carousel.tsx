import { useRef } from "react";

import "./Carousel.scss";

import { MovieType } from "../../@types/dataAPI";

import {
  BsFillArrowDownLeftCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

import dayjs from "dayjs";

import Img from "../lazyLoadImage/Img";

import { useNavigate } from "react-router-dom";
import PosterFallBack from "../../assets/no-poster.png";
import { useSelector } from "../../store/store";
import CircleRating from "../circleRating/CircleRating";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Genres from "../genres/Genres";

type props = {
  data: MovieType[] | undefined;
  loading: string | boolean | null;
  endpoint: string | undefined;
  title?: string;
};
const Carousel = ({ data, loading, endpoint, title }: props) => {
  const carouselContainer = useRef<HTMLDivElement>(null);

  const { url } = useSelector((state) => state.configUrl);
  const navigate = useNavigate();

  // navigation
  const navigation = (dir: string) => {
    console.log("dir", dir);

    const container = carouselContainer.current;

    if (container) {
      const scrollAmount =
        dir === "left"
          ? container?.scrollLeft - (container?.offsetWidth + 20)
          : container?.scrollLeft + (container?.offsetWidth + 20);

      container?.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // loading
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton "></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowDownLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowDownRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallBack;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onDoubleClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1) || 0} />
                    <Genres idGenres={item.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
