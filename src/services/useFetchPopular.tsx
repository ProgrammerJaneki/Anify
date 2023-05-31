import { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const useFetchPopular = (contentLimit: number, page: number) => {
   const [fetchedPopularData, setFetchedPopularData] = useState<
      AnimeDataModel[]
   >([]);
   const [loadingPopular, setLoadingPopular] = useState<boolean>(false);
   const [errorPopular, setErrorPopular] = useState<string>('');
   const [hasMore, setHasMore] = useState<boolean>(true);

   // I'll pass the value of the pageCount here

   useEffect(() => {
      const fetchPopularAnimeData = async () => {
         setErrorPopular('');
         try {
            setLoadingPopular(true);
            const baseUrl = `https://api.jikan.moe/v4/seasons/now?limit=${contentLimit}&page=${page}`;
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
            setTimeout(() => {
               setFetchedPopularData([...fetchedPopularData, ...animeDataList]);
               setLoadingPopular(false);
            }, 500);
         } catch (fetchError: any) {
            console.group(fetchError);
            setErrorPopular('No Results');
         }
      };
      fetchPopularAnimeData();
   }, [contentLimit, page]);

   return { fetchedPopularData, loadingPopular, errorPopular, hasMore };
};

export default useFetchPopular;
