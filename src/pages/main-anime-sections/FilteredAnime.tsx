import { useState, useEffect, useContext } from 'react';
import getFetchFilter from '../../services/getFetchFilter';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';
import AnimeList from '../../components/anime-section/AnimeList';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorMessage from '../../utilities/ErrorMessage';

const FilteredAnime = () => {
   // States
   const [totalLength, setTotalLength] = useState<number>(0);
   // Context
   const {
      debouncedSearchQuery,
      filteredGenre,
      filteredYear,
      filteredStatus,
      filteredSeason,
   } = useContext(SearchFilterContext) as SearchFilterContextType;
   // Query
   const updatedFilteredGenre = filteredGenre.map((item) => item.id).join(',');
   const updatedFilteredYear =
      filteredYear.length > 0 ? filteredYear[0].name : '';
   const updatedFilteredStatus =
      filteredStatus.length > 0 ? filteredStatus[0].name : '';
   const updatedFilteredSeason =
      filteredSeason.length > 0 ? filteredSeason[0].name : '';

   const { data, fetchNextPage, hasNextPage, isFetching, isError } =
      useInfiniteQuery({
         queryKey: [
            'filteredAnime',
            debouncedSearchQuery,
            updatedFilteredGenre,
            updatedFilteredYear,
            updatedFilteredStatus,
            updatedFilteredSeason,
         ],
         queryFn: ({ pageParam = 1 }) =>
            getFetchFilter(
               debouncedSearchQuery,
               updatedFilteredGenre,
               updatedFilteredYear,
               updatedFilteredStatus,
               updatedFilteredSeason,
               pageParam
            ),
         cacheTime: 0,
         refetchOnWindowFocus: false,
         getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 25 ? allPages.length + 1 : undefined;
         },
      });
   const handleNextPage = () => {
      fetchNextPage();
   };
   useEffect(() => {
      const TOTAL_LENGTH = data?.pages.reduce(
         (accu, item) => accu + item.length,
         0
      );
      setTotalLength(TOTAL_LENGTH);
   }, [data?.pages]);

   return (
      <div className="space-y-4 pt-6 w-full">
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
                  skeletonAmount={25}
               />
            </InfiniteScroll>
         )}
      </div>
   );
};

export default FilteredAnime;
