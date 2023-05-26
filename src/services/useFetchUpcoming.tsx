import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const useFetchUpcoming = (contentLimit: number, page: number) => {
   const [fetchedUpcomingData, setFetchedUpcomingData] = useState<
      AnimeDataModel[]
   >([]);
   const [loadingUpcoming, setLoadingUpcoming] = useState<boolean>(false);
   const [errorUpcoming, setErrorUpcoming] = useState<string>('');

   useEffect(() => {
      const fetchUpcomingData = async () => {
         setErrorUpcoming('');
         try {
            setLoadingUpcoming(true);
            const baseUrl = `https://api.jikan.moe/v4/seasons/upcoming?limit=${contentLimit}&page=${page}`;
            const listUpcomingAnime = await axios.get(baseUrl);
            const { data, pagination } = listUpcomingAnime.data;
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
            setFetchedUpcomingData([...fetchedUpcomingData, ...animeDataList]);
         } catch (fetchError: any) {
            console.group(fetchError);
            setErrorUpcoming('No Results');
         } finally {
            setLoadingUpcoming(false);
         }
      };
      fetchUpcomingData();
   }, [contentLimit, page]);

   return { fetchedUpcomingData, loadingUpcoming, errorUpcoming };
};

export default useFetchUpcoming;
