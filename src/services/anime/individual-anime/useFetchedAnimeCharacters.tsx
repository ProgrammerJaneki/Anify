import axios from 'axios';
import { AnimeCharactersModel } from '../../../interface/anime/AnimeCharactersModel';
import { useQuery } from '@tanstack/react-query';

const fetchedAnimeCharacters = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/characters`;
   const getAnimeCharsData = await axios.get(baseUrl);
   const { data } = getAnimeCharsData.data;
   const animeCharDataList = data.map((char: AnimeCharactersModel) => {
      const animeCharsData: AnimeCharactersModel = {
         character: char.character,
         role: char.role,
         voice_actors: char.voice_actors,
      };
      return animeCharsData;
   });
   return animeCharDataList;
};

const useFetchedAnimeCharacters = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: characterData,
      isFetching: isCharactersFetching,
      isSuccess: isCharacterSuccess,
   } = useQuery<AnimeCharactersModel[]>({
      queryKey: ['charactersData', convertedId],
      queryFn: () => fetchedAnimeCharacters(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
   });

   return { characterData, isCharactersFetching, isCharacterSuccess };
};

export default useFetchedAnimeCharacters;
