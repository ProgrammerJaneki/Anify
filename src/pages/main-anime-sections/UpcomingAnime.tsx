import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import AnimeList from '../../components/anime-section/AnimeList';
import useFetchUpcoming from '../../services/useFetchUpcoming';
import InfiniteScroll from 'react-infinite-scroll-component';

const UpcomingAnime = () => {
   const [contentLimit, setContentLimit] = useState<number>(25);
   const [page, setPage] = useState<number>(1);
   const [upcomingAnimeData, setUpcomingAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const { fetchedUpcomingData, loadingUpcoming, errorUpcoming, hasMore } =
      useFetchUpcoming(contentLimit, page);

   useEffect(() => {
      setUpcomingAnimeData(fetchedUpcomingData);
   }, [fetchedUpcomingData]);
   const handleNextUpcomingData = () => {
      setPage(page + 1);
   };

   return (
      <div className="space-y-4 py-6 w-full">
         <InfiniteScroll
            dataLength={upcomingAnimeData.length}
            next={handleNextUpcomingData}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={1}
         >
            <AnimeList
               animeListData={upcomingAnimeData}
               loading={loadingUpcoming}
               error={errorUpcoming}
               skeletonAmount={25}
               page={page}
            />
         </InfiniteScroll>
      </div>
   );
};

export default UpcomingAnime;
