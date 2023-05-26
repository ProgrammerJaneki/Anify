import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';
import { FilterModel } from '../interface/FilterModel';

const useFetchFilteredAnime = (
   animeName: string,
   updatedFilteredGenre: string,
   updatedFilteredYear: string,
   updatedFilteredStatus: string,
   page: number
) => {
   const [fetchedFilteredData, setFetchedFilteredData] = useState<
      AnimeDataModel[]
   >([]);
   const [loadingFiltered, setLoadingFiltered] = useState<boolean>(false);
   const [filteredError, setFilteredError] = useState<string>('');
   const [hasMore, setHasMore] = useState<boolean>(true);
   // Create a separate useEffect for search

   useEffect(() => {
      const fetchPopularAnimeData = async () => {
         // console.log('Fetch: ', updatedFilteredGenre, updatedFilteredYear);
         // setFetchedFilteredData([]);
         setFilteredError('');
         try {
            setLoadingFiltered(true);
            // const baseUrl = `https://api.jikan.moe/v4/seasons/now?limit=${contentLimit}&page=${page}`;
            // const baseUrl = `https://api.jikan.moe/v4/anime?q=${animeName}&genres=${updatedFilteredGenre}&start_date=${updatedFilteredYear}&order_by=members&sort=desc&page=1`;
            // const baseUrl = `https://api.jikan.moe/v4/anime?q=${animeName}&genres=${updatedFilteredGenre}&start_date=${updatedFilteredYear}&order_by=members&sort=desc&page=1`;
            const genreQueryParam =
               updatedFilteredGenre === ''
                  ? ''
                  : `&genres=${updatedFilteredGenre}`;
            const yearQueryParam =
               updatedFilteredYear === ''
                  ? ''
                  : `&start_date=${updatedFilteredYear}`;
            const statusQueryParam =
               updatedFilteredStatus === ''
                  ? ''
                  : `&status=${updatedFilteredStatus}`;
            // console.log('GENRE: ', updatedFilteredGenre);
            const baseUrl = `https://api.jikan.moe/v4/anime?q=${animeName}&${genreQueryParam}${yearQueryParam}${statusQueryParam}&order_by=members&sort=desc&page=${page}`;
            console.log('Url: ', baseUrl);
            const listPopularAnime = await axios.get(baseUrl);
            console.log('Page: ', page);
            const { data, pagination } = listPopularAnime.data;
            setHasMore(pagination.has_next_page);
            const animeDataList = await Promise.all(
               data.map(async (anime: AnimeDataModel) => {
                  const animeData: AnimeDataModel = {
                     mal_id: anime.mal_id,
                     images: { jpg: { image_url: anime.images.jpg.image_url } },
                     title: anime.title,
                     title_japanese: anime.title_japanese,
                     type: anime.type,
                     episodes: anime.episodes,
                     genres: anime.genres,
                     score: anime.score,
                     season: anime.season,
                     studios: anime.studios,
                     year: anime.year,
                  };
                  return animeData;
               })
            );
            if (page === 1) {
               setTimeout(() => {
                  setFetchedFilteredData(animeDataList);
                  setLoadingFiltered(false);
               }, 500);
            } else {
               setTimeout(() => {
                  setFetchedFilteredData([
                     ...fetchedFilteredData,
                     ...animeDataList,
                  ]);
                  setLoadingFiltered(false);
               }, 500);
            }
            console.log('Old Data: ', fetchedFilteredData);
            console.log('New Data: ', animeDataList);
         } catch (fetchError: any) {
            console.group('Error: ', fetchError);
            setFilteredError('No Results');
         }
      };
      fetchPopularAnimeData();
   }, [
      animeName,
      updatedFilteredGenre,
      updatedFilteredYear,
      updatedFilteredStatus,
      page,
   ]);

   return { fetchedFilteredData, loadingFiltered, filteredError, hasMore };
};

export default useFetchFilteredAnime;
