import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const fetchedUpcomingData = async (contentLimit: number, page: number) => {
   const baseUrl = `https://api.jikan.moe/v4/seasons/upcoming?limit=${contentLimit}&page=${page}`;
   const listUpcomingData = await axios.get(baseUrl);
   const { data } = listUpcomingData.data;
   const animeDataList = data.map((anime: AnimeDataModel) => {
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
   });
   return animeDataList;
};

const getFetchUpcoming = (contentLimit: number, page: number) => {
   return fetchedUpcomingData(contentLimit, page);
};

export default getFetchUpcoming;
