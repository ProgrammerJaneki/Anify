import { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const useFetchFilteredAnime = (
   animeName: string,
   updatedFilteredGenre: string,
   updatedFilteredYear: string,
   updatedFilteredStatus: string,
   updatedFilteredSeason: string,
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
         setFilteredError('');
         try {
            setLoadingFiltered(true);
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
            // const secUrl = `https://api.jikan.moe/v4/seasons/${yearQueryParam}/${filteredSeason}`
            const baseUrl =
               updatedFilteredSeason.length > 0
                  ? `https://api.jikan.moe/v4/seasons/${updatedFilteredYear}/${updatedFilteredSeason}?page=${page}`
                  : `https://api.jikan.moe/v4/anime?q=${animeName}${genreQueryParam}${yearQueryParam}${statusQueryParam}&page=${page}`;

            // const baseUrl =
            // `https://api.jikan.moe/v4/anime?q=${animeName}${genreQueryParam}${yearQueryParam}${statusQueryParam}&page=${page}`
            const listPopularAnime = await axios.get(baseUrl);
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
         } catch (fetchError: any) {
            setFilteredError('No Results');
         }
      };
      fetchPopularAnimeData();
   }, [
      animeName,
      updatedFilteredGenre,
      updatedFilteredYear,
      updatedFilteredStatus,
      updatedFilteredSeason,
      page,
   ]);

   return { fetchedFilteredData, loadingFiltered, filteredError, hasMore };
};

export default useFetchFilteredAnime;
