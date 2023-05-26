import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../../interface/AnimeDataModel';
import useFetchFilteredAnime from '../../services/useFetchFilteredAnime';
import AnimeList from './AnimeList';
import { FilterModel } from '../../interface/FilterModel';

interface filteredAnimModel {
   debouncedSearchQuery: string;
   filteredGenre: FilterModel[];
   filteredYear: FilterModel[];
   filteredStatus: FilterModel[];
}

const FilteredAnime = ({
   debouncedSearchQuery,
   filteredGenre,
   filteredYear,
   filteredStatus,
}: filteredAnimModel) => {
   const [filteredAnimeData, setFilteredAnimeData] = useState<AnimeDataModel[]>(
      []
   );
   const [page, setPage] = useState<number>(1);
   const updatedFilteredGenre = filteredGenre.map((item) => item.id).join(',');
   const updatedFilteredYear =
      filteredYear.length > 0 ? filteredYear[0].name : '';
   const updatedFilteredStatus =
      filteredStatus.length > 0 ? filteredStatus[0].name : '';
   // console.log('genre: ', updatedFilteredGenre, 'year: ', updatedFilteredYear);

   const { fetchedFilteredData, loadingFiltered, filteredError, hasMore } =
      useFetchFilteredAnime(
         debouncedSearchQuery,
         updatedFilteredGenre,
         updatedFilteredYear,
         updatedFilteredStatus,
         page
      );

   useEffect(() => {
      setFilteredAnimeData(fetchedFilteredData);
   }, [fetchedFilteredData]);
   useEffect(() => {
      setPage(1);
      console.log('Current Page: ', page);
   }, [debouncedSearchQuery, filteredGenre, filteredYear, filteredStatus]);
   const handleNextFilteredPage = () => {
      setPage(page + 1);
      console.log('Pages: ', page);
   };
   return (
      <div className="space-y-4 w-full">
         <AnimeList
            animeListData={filteredAnimeData}
            loading={loadingFiltered}
            error={filteredError}
            handleNextPopularPage={handleNextFilteredPage}
            hasMore={hasMore}
            page={page}
         />
         {/* {loadingFiltered && <div>Loading...</div>}
         {!loadingFiltered &&
            (filteredAnimeData.length > 0 ? (
               <AnimeList
                  animeListData={filteredAnimeData}
                  loading={loadingFiltered}
                  error={filteredError}
                  handleNextPopularPage={handleNextFilteredPage}
               />
            ) : (
               <div>No Results</div>
            ))} */}
      </div>
   );
};

export default FilteredAnime;
