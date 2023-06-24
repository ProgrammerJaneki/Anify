import axios from 'axios';
import { AnimeStatsModel } from '../../../interface/anime/AnimeStatsModel';
import { useQuery } from '@tanstack/react-query';

const fetchedAnimeStats = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/statistics`;
   const getAnimeStatsData = await axios.get(baseUrl);
   const { data } = getAnimeStatsData.data;
   const animeStatData: AnimeStatsModel = {
      watching: data.watching,
      completed: data.completed,
      on_hold: data.on_hold,
      dropped: data.dropped,
      plan_to_watch: data.plan_to_watch,
      total: data.total,
      scores: data.scores,
   };

   return animeStatData;
};

const useFetchedAnimeStats = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: statData,
      isFetching: isStatFetching,
      isSuccess: isStatSuccess,
   } = useQuery<AnimeStatsModel>({
      queryKey: ['animeStatData', mal_id],
      queryFn: () => fetchedAnimeStats(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });
   return { statData, isStatFetching, isStatSuccess };
};

export default useFetchedAnimeStats;
