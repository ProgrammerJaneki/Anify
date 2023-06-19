import { useEffect, useState } from 'react';
import AnimeList from '../../components/anime-section/AnimeList';
import getFetchUpcoming from '../../services/getFetchUpcoming';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCheckReso from '../../utilities/useCheckReso';
import { useInfiniteQuery } from '@tanstack/react-query';

const UpcomingAnime = () => {
   const [page, _setPage] = useState<number>(1);
   const [totalLength, setTotalLength] = useState<number>(0);
   const { resolutionWidth } = useCheckReso();
   const responsiveSkeletonAmount = resolutionWidth < 640 ? 6 : 25;
   const { data, fetchNextPage, hasNextPage, isFetching, isError } =
      useInfiniteQuery({
         queryKey: ['upcomingInfiniteList', 25],
         queryFn: ({ pageParam = 1 }) => getFetchUpcoming(25, pageParam),
         cacheTime: 5000,
         getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 25 ? allPages.length + 1 : undefined;
         },
         refetchOnWindowFocus: false,
      });
   const handleNextPage = () => {
      fetchNextPage();
   };
   useEffect(() => {
      const TOTAL_LENGTH = data?.pages.reduce(
         (accumulator, item) => accumulator + item.length,
         0
      );
      setTotalLength(TOTAL_LENGTH);
   });

   return (
      <div className="space-y-4 py-6 w-full">
         <InfiniteScroll
            dataLength={totalLength}
            next={handleNextPage}
            hasMore={!!hasNextPage}
            loader={null}
            scrollThreshold={1}
         >
            <AnimeList
               animeListData={data?.pages}
               loading={isFetching}
               skeletonAmount={responsiveSkeletonAmount}
               page={page}
            />
         </InfiniteScroll>
      </div>
   );
};

export default UpcomingAnime;
