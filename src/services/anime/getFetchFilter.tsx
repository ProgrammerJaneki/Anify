import axios from 'axios';
import { AnimeDataModel } from '../../interface/anime/AnimeDataModel';

// Filters

const fetchedFiltered = async (
   animeName: string,
   updatedFilteredGenre: string,
   updatedFilteredYear: string,
   updatedFilteredStatus: string,
   updatedFilteredSeason: string,
   page: number
) => {
   // converting strings into route params
   const genreQueryParam =
      updatedFilteredGenre === '' ? '' : `&genres=${updatedFilteredGenre}`;
   const yearQueryParam =
      updatedFilteredYear === ''
         ? ''
         : `&start_date=${updatedFilteredYear}-01-01`;
   const statusQueryParam =
      updatedFilteredStatus === '' ? '' : `&status=${updatedFilteredStatus}`;
   // Checks if season filter isn't empty
   const baseUrl =
      updatedFilteredSeason.length > 0
         ? `https://api.jikan.moe/v4/seasons/${updatedFilteredYear}/${updatedFilteredSeason}?page=${page}`
         : `https://api.jikan.moe/v4/anime?q=${animeName}${genreQueryParam}${yearQueryParam}${statusQueryParam}&page=${page}`;

   // const baseUrl = `https://api.jikan.moe/v4/top/anime?limit=${contentLimit}&page=${page}`;
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

const getFetchFilter = (
   animeName: string,
   updatedFilteredGenre: string,
   updatedFilteredYear: string,
   updatedFilteredStatus: string,
   updatedFilteredSeason: string,
   page: number
) => {
   return fetchedFiltered(
      animeName,
      updatedFilteredGenre,
      updatedFilteredYear,
      updatedFilteredStatus,
      updatedFilteredSeason,
      page
   );
   // return fetchedFiltered(contentLimit, page);
};

export default getFetchFilter;
