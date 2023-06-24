import { AnimeReviewsModel } from '../../../interface/anime/AnimeReviewsModel';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchedAnimeReviews = async (mal_id: number) => {
   const baseUrl = `https://api.jikan.moe/v4/anime/${mal_id}/reviews`;
   const getAnimeReviewsData = await axios.get(baseUrl);
   const { data } = getAnimeReviewsData.data;
   const animeReviewsDataList = data.map((review: AnimeReviewsModel) => {
      const animeReviewData: AnimeReviewsModel = {
         mal_id: review.mal_id,
         type: review.type,
         reactions: review.reactions,
         date: review.date,
         review: review.review,
         score: review.score,
         tags: review.tags,
         user: review.user,
      };
      return animeReviewData;
   });
   return animeReviewsDataList;
};

const useFetchedAnimeReviews = (mal_id: string | undefined) => {
   const convertedId = Number(mal_id);
   const {
      data: reviewData,
      fetchNextPage: fetchNextReview,
      isFetching: isReviewFetching,
      isSuccess: isReviewSuccess,
      isError: isReviewError,
   } = useInfiniteQuery<AnimeReviewsModel[]>({
      queryKey: ['reviewInfiniteList', convertedId],
      queryFn: () => fetchedAnimeReviews(convertedId),
      refetchOnWindowFocus: false,
      cacheTime: 5000,
      getNextPageParam: (lastPage, allPages) => {
         return lastPage.length === 20 ? allPages.length + 1 : undefined;
      },
   });
   return {
      reviewData,
      fetchNextReview,
      isReviewFetching,
      isReviewSuccess,
      isReviewError,
   };
};

export default useFetchedAnimeReviews;
