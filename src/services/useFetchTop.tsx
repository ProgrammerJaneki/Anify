import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const useFetchTop = (contentLimit: number, page: number) => {
   const [fetchedTopData, setFetchedTopData] = useState<AnimeDataModel[]>([]);
   const [loadingTop, setLoadingTop] = useState<boolean>(false);
   const [errorTop, setErrorTop] = useState<string>('');
   const [hasMore, setHasMore] = useState<boolean>(true);
   useEffect(() => {
      const fetchTopAnimeData = async () => {
         setErrorTop('');
         try {
            setLoadingTop(true);
            const baseUrl = `https://api.jikan.moe/v4/top/anime?limit=${contentLimit}&page=${page}`;
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
               setFetchedTopData([...fetchedTopData, ...animeDataList]);
               setLoadingTop(false);
            }, 500);
         } catch (fetchError: any) {
            setErrorTop('No Results');
         }
      };
      fetchTopAnimeData();
   }, [contentLimit, page]);

   return { fetchedTopData, loadingTop, errorTop, hasMore };
};

export default useFetchTop;
