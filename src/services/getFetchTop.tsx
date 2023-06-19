import axios from 'axios';
import { AnimeDataModel } from '../interface/AnimeDataModel';

const fetchedTopData = async (contentLimit: number, page: number) => {
   const baseUrl = `https://api.jikan.moe/v4/top/anime?limit=${contentLimit}&page=${page}`;
   const listTopData = await axios.get(baseUrl);
   const { data } = listTopData.data;
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

const getFetchTop = (contentLimit: number, page: number) => {
   return fetchedTopData(contentLimit, page);
};

export default getFetchTop;
