import React, { useState, useEffect, useContext } from 'react';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import useFetchFilteredAnime from '../../services/useFetchFilteredAnime';
import AnimeList from '../../components/anime-section/AnimeList';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
   SearchFilterContext,
   SearchFilterContextType,
} from '../../utilities/contexts/SearchFilterContext';

const FilteredAnime = () => {
   // States
   const [filteredAnimeData, setFilteredAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const [page, setPage] = useState<number>(1);
   // Context
   const {
      debouncedSearchQuery,
      filteredGenre,
      filteredYear,
      filteredStatus,
      filteredSeason,
   } = useContext(SearchFilterContext) as SearchFilterContextType;

   const updatedFilteredGenre = filteredGenre.map((item) => item.id).join(',');
   const updatedFilteredYear =
      filteredYear.length > 0 ? filteredYear[0].name : '';
   const updatedFilteredStatus =
      filteredStatus.length > 0 ? filteredStatus[0].name : '';
   const updatedFilteredSeason =
      filteredSeason.length > 0 ? filteredSeason[0].name : '';

   const { fetchedFilteredData, loadingFiltered, filteredError, hasMore } =
      useFetchFilteredAnime(
         debouncedSearchQuery,
         updatedFilteredGenre,
         updatedFilteredYear,
         updatedFilteredStatus,
         updatedFilteredSeason,
         page
      );

   useEffect(() => {
      setFilteredAnimeData(fetchedFilteredData);
   }, [fetchedFilteredData]);
   useEffect(() => {
      setPage(1);
   }, [debouncedSearchQuery, filteredGenre, filteredYear, filteredStatus]);
   const handleNextFilteredPage = () => {
      setPage(page + 1);
   };
   return (
      <div className="space-y-4 pt-6 w-full">
         <InfiniteScroll
            dataLength={filteredAnimeData.length}
            next={handleNextFilteredPage}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={1}
         >
            <AnimeList
               animeListData={filteredAnimeData}
               loading={loadingFiltered}
               error={filteredError}
               skeletonAmount={25}
               page={page}
            />
         </InfiniteScroll>
      </div>
   );
};

export default FilteredAnime;
