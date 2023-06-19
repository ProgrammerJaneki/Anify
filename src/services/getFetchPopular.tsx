import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const fetchedPopularData = async (contentLimit: number, page: number) => {
   const baseUrl = `https://api.jikan.moe/v4/seasons/now?limit=${contentLimit}&page=${page}`;
   const listPopularData = await axios.get(baseUrl);
   const { data, _pagination } = listPopularData.data;
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

const getFetchPopular = (contentLimit: number, page: number) => {
   return fetchedPopularData(contentLimit, page);
};

export default getFetchPopular;
