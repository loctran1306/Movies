import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SearchResult.scss";
import fetchDataFromAPI from "../../utils/api";
import { dataAPItype } from "../../@types/dataAPI";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = () => {
  const [data, setData] = useState<dataAPItype | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  console.log("data", data);

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data && data?.results.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data?.total_results > 1 ? "results" : "result"
              } of '${query}'`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data.results.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner initial={true} />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      fromSearch={true}
                      mediaType=""
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
