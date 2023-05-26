import { useEffect, useState } from 'react';
import useFetchPopular from '../../services/useFetchPopular';
import AnimeList from './AnimeList';
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
      console.log('Pages: ', page);
   };

   return (
      <div className="space-y-4 w-full">
         {/* <div className="font-semibold flex justify-between items-center col-span-full w-full">
            <h1 className="">POPULAR THIS SEASON</h1>
            <button onClick={handleNextPopularPage}>Click</button>
         </div> */}
         {/* {!loadingPopular && errorPopular && <div>Error...</div>} */}
         {/* {errorPopular === '' && (
            <InfiniteScroll
               dataLength={popularAnimeData.length}
               next={handleNextPopularPage}
               hasMore={true}
               loader={null}
               scrollThreshold={0.8}
            > */}
         <AnimeList
            animeListData={popularAnimeData}
            loading={loadingPopular}
            error={errorPopular}
            handleNextPopularPage={handleNextPopularPage}
            hasMore={hasMore}
            page={page}
         />
         {/* {loadingPopular && <div>pop...</div>}
            </InfiniteScroll>
         )} */}
      </div>
   );
};

export default PopularAnime;
