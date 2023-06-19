import { useEffect, useState } from 'react';
import AnimeList from '../../components/anime-section/AnimeList';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCheckReso from '../../utilities/useCheckReso';
import { useInfiniteQuery } from '@tanstack/react-query';
import getFetchPopular from '../../services/getFetchPopular';
import ErrorMessage from '../../utilities/ErrorMessage';

const PopularAnime = () => {
   const [contentLimit, _setContentLimit] = useState<number>(25);
   const [totalLength, setTotalLength] = useState<number>(0);
   const { resolutionWidth } = useCheckReso();
   const responsiveSkeletonAmount = resolutionWidth < 640 ? 6 : 25;
   const { data, fetchNextPage, hasNextPage, isFetching, isError } =
      useInfiniteQuery({
         queryKey: ['popularInfiniteList', contentLimit],
         queryFn: ({ pageParam = 1 }) =>
            getFetchPopular(contentLimit, pageParam),
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
         {isError ? (
            <ErrorMessage />
         ) : (
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
               />
            </InfiniteScroll>
         )}
      </div>
   );
};

export default PopularAnime;
