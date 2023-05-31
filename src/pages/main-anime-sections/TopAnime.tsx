import { useEffect, useState } from 'react';
import useFetchTop from '../../services/useFetchTop';
import AnimeList from '../../components/anime-section/AnimeList';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import InfiniteScroll from 'react-infinite-scroll-component';

const PopularAnime = () => {
   const [contentLimit, setContentLimit] = useState<number>(25);
   const [page, setPage] = useState<number>(1);
   const [topAnimeData, setTopAnimeData] = useState<AnimeDataModel[]>([]);
   const { fetchedTopData, loadingTop, errorTop, hasMore } = useFetchTop(
      contentLimit,
      page
   );

   useEffect(() => {
      setTopAnimeData(fetchedTopData);
   }, [fetchedTopData]);
   const handleNextTopData = () => {
      setPage(page + 1);
   };

   return (
      <div className="space-y-4 py-6 w-full">
         <InfiniteScroll
            dataLength={topAnimeData.length}
            next={handleNextTopData}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={1}
         >
            <AnimeList
               animeListData={topAnimeData}
               loading={loadingTop}
               error={errorTop}
               skeletonAmount={25}
               page={page}
            />
         </InfiniteScroll>
      </div>
   );
};

export default PopularAnime;
