import { useQuery } from '@tanstack/react-query';
import { FullAnimeDataModel } from '../../interface/FullAnimeDataModel';
import axios from 'axios';
import { AnimeStatsModel } from '../../interface/AnimeStatsModel';

const fetchedFullAnimeData = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/full`;
   const getAnimeInfoData = await axios.get(baseUrl);
   const { data } = getAnimeInfoData.data;
   const fullAnimeData: FullAnimeDataModel = {
      mal_id: data.mal_id,
      title: data.title,
      title_english: data.title_english,
      title_japanese: data.title_japanese,
      images: data.images,
      trailer: data.trailer,
      synopsis: data.synopsis,
      season: data.season,
      year: data.year,
      broadcast: data.broadcast.string,
      type: data.type,
      source: data.source,
      episodes: data.episodes,
      status: data.status,
      aired: data.aired,
      duration: data.duration,
      rating: data.rating,
      score: data.score,
      scored_by: data.scored_by,
      popularity: data.popularity,
      rank: data.rank,
      members: data.members,
      favourites: data.favorites,
      genres: data.genres,
      producers: data.producers,
      licensors: data.licensors,
      studios: data.studios,
      relations: data.relations,
      external: data.external,
      streaming: data.streaming,
   };
   return fullAnimeData;
};

const useFetchedFullAnimeInfo = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: fullAnimeData,
      isFetching: isFullInfoFetching,
      isSuccess: isFullInfoSuccess,
   } = useQuery({
      queryKey: ['fullAnimeInfo', mal_id],
      queryFn: () => fetchedFullAnimeData(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });

   return { fullAnimeData, isFullInfoFetching, isFullInfoSuccess };
};

export default useFetchedFullAnimeInfo;
