import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Explore.scss";

import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import fetchDataFromAPI from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Select from "react-select";
import { dataAPItype } from "../../@types/dataAPI";

type filtersType = {
  sort_by?: string;
  with_genres?: any;
};
let filters: filtersType = {};

type filterType = {
  id: string;
  name: string;
};

type actionType = {
  action: string;
  option: filterType | undefined;
  name: string;
};

const sortbyData: filterType[] = [
  { id: "popularity.desc", name: "Popularity Descending" },
  { id: "popularity.asc", name: "Popularity Ascending" },
  { id: "vote_average.desc", name: "Rating Descending" },
  { id: "vote_average.asc", name: "Rating Ascending" },
  {
    id: "primary_release_date.desc",
    name: "Release Date Descending",
  },
  { id: "primary_release_date.asc", name: "Release Date Ascending" },
  { id: "original_title.asc", name: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState<dataAPItype>();
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState<filterType | null>(null);
  const [sortby, setSortby] = useState<filterType | null>(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromAPI(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results && data?.results) {
          setData({
            ...data,
            // eslint-disable-next-line no-unsafe-optional-chaining
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems: any, action: actionType) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.id;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onchange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
