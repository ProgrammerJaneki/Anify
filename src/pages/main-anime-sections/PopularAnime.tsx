import { useEffect, useState } from 'react';
import useFetchPopular from '../../services/useFetchPopular';
import AnimeList from '../../components/anime-section/AnimeList';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import InfiniteScroll from 'react-infinite-scroll-component';

const PopularAnime = () => {
   const [contentLimit, setContentLimit] = useState<number>(25);
   const [page, setPage] = useState<number>(1);
   const [popularAnimeData, setPopularAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const { fetchedPopularData, loadingPopular, errorPopular, hasMore } =
      useFetchPopular(contentLimit, page);

   useEffect(() => {
      // setTimeout(() => {
      setPopularAnimeData(fetchedPopularData);
      // }, 500);
      // console.log('Error: ', errorPopular);
      // console.log('Data: ', fetchedPopularData);
   }, [fetchedPopularData]);
   const handleNextPopularPage = () => {
      setPage(page + 1);
   };

   return (
      <div className="space-y-4 py-6 w-full">
         <div>Click</div>
         <InfiniteScroll
            dataLength={popularAnimeData.length}
            next={handleNextPopularPage}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={1}
         >
            <AnimeList
               animeListData={popularAnimeData}
               loading={loadingPopular}
               error={errorPopular}
               skeletonAmount={25}
               page={page}
            />
         </InfiniteScroll>
      </div>
   );
};

export default PopularAnime;
