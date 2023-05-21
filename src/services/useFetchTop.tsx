import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const useFetchTop = (contentLimit: number, page: number) => {
   const [fetchedTopData, setFetchedTopData] = useState<AnimeDataModel[]>([]);
   const [loadingTop, setLoadingTop] = useState<boolean>(false);
   const [errorTop, setErrorTop] = useState<string>('');

   useEffect(() => {
      const fetchTopAnimeData = async () => {
         setErrorTop('');
         try {
            setLoadingTop(true);
            const baseUrl = `https://api.jikan.moe/v4/top/anime?limit=${contentLimit}&page=${page}`;
            const listPopularAnime = await axios.get(baseUrl);
            const { data, pagination } = listPopularAnime.data;
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
            console.log('DATAAA: ', animeDataList);
            setFetchedTopData([...fetchedTopData, ...animeDataList]);
         } catch (fetchError: any) {
            console.group(fetchError);
            setErrorTop('No Results');
         } finally {
            setLoadingTop(false);
         }
      };
      fetchTopAnimeData();
   }, [contentLimit]);

   return { fetchedTopData, loadingTop, errorTop };
};

export default useFetchTop;
