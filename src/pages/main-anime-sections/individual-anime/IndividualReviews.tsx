import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useMemo, useState } from 'react';
import { ReviewIcons } from '../../../assets/ReviewIcons';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useCheckReso from '../../../utilities/useCheckReso';
import useFetchedAnimeReviews from '../../../services/anime/individual-anime/useFetchedAnimeReviews';
import { AnimeReviewsModel } from '../../../interface/anime/AnimeReviewsModel';
import { format } from 'fecha';

// url checker, read more state, show more reactions state

interface ReviewCardModel {
   isReviewRoute: boolean;
   resolutionWidth: number;
   review: AnimeReviewsModel;
}
interface ReactionCardListModel {
   sortedReactions: [string, number][];
}

const IndividualReviews: React.FC = () => {
   const { mal_id, anime_name } = useParams();
   const { resolutionWidth } = useCheckReso();
   const { pathname } = useLocation();
   const isReviewRoute = /\/reviews\/?$/.test(pathname);
   const maxReviews = isReviewRoute ? 20 : 2;
   const { reviewData } = useFetchedAnimeReviews(mal_id);
   const reviewDataList = reviewData?.pages;
   const reviewDataListLenth = reviewDataList?.[0].length;
   return reviewDataListLenth === 0 ? (
      <>{isReviewRoute && <NoReviews />}</>
   ) : (
      <div className="space-y-2">
         {isReviewRoute ? (
            ''
         ) : (
            <NavLink
               className="text-[#9FADBD] font-semibold text-sm"
               to={`/anime/${mal_id}/${anime_name}/reviews`}
            >
               Reviews
            </NavLink>
         )}
         {/* Review List */}
         <div className=" grid grid-cols-1 gap-4 w-full">
            {reviewDataList?.map((reviews: AnimeReviewsModel[]) =>
               reviews
                  .slice(0, maxReviews)
                  .map((review: AnimeReviewsModel, index: number) => (
                     <ReviewCard
                        key={index}
                        isReviewRoute={isReviewRoute}
                        resolutionWidth={resolutionWidth}
                        review={review}
                     />
                  ))
            )}
         </div>
      </div>
   );
};

const ReviewCard: React.FC<ReviewCardModel> = ({ isReviewRoute, review }) => {
   const maxText: number = isReviewRoute ? 200 : 100;
   const [maxTextLength, setMaxTextLength] = useState<number>(maxText);
   const isMaxEqual: boolean = maxTextLength === maxText;
   const reviewText = review.review;
   const convertedReactions = Object.entries(review.reactions).filter(
      ([key]) => key !== 'overall'
   );
   const sortedReactions = convertedReactions.sort((a, b) => {
      return b[1] - a[1];
   });
   const topReactions = sortedReactions.slice(0, 3).map((item) => item);
   const handleSetMaxText = () => {
      const timeoutId = setTimeout(() => {
         if (maxTextLength === maxText) {
            setMaxTextLength(10000);
         } else {
            setMaxTextLength(maxText);
         }
         clearTimeout(timeoutId);
      }, 300);
   };
   const handleFormattedDate = useMemo(() => {
      return (date: string | undefined) => {
         if (date) {
            const formattedDate = format(new Date(date), 'MM/DD/YY');
            return formattedDate;
         }
         return '';
      };
   }, []);
   return (
      <div
         className={` bg-[#14181d] text-[#676c75] grid grid-cols-[2.5rem_1fr] gap-2 text-sm p-2 rounded-sm w-full`}
      >
         <img
            className="object-fill aspect-[1/1] rounded-full w-10 "
            src={review.user.images.jpg.image_url}
            alt="reviewImg"
         />
         {/* Header */}
         <div
            className={`${
               isReviewRoute ? 'grid-cols-1' : 'grid-cols-[1fr_4rem]'
            } grid  justify-between gap-2 text-xs w-full`}
         >
            <div className=" flex flex-col justify-between ">
               {/* Header */}
               <div className="flex items-center justify-between gap-x-2">
                  <h1 className="text-sm font-semibold text-[#4fbdb5]">
                     {review.user.username}
                  </h1>
                  {isReviewRoute ? (
                     <span className="font-semibold">
                        {handleFormattedDate(review.date)}
                     </span>
                  ) : (
                     ''
                  )}
               </div>
               {/* Tags | Second Header */}
               <div className="text-xs flex flex-wrap grid-cols-2 items-center gap-x-2 gap-y-1">
                  {review.tags.map((item: number, index: number) => (
                     <span
                        key={index}
                        className="inline-flex items-center gap-x-1"
                     >
                        {reviewCardIcons.tag.icon} {item}
                     </span>
                  ))}
               </div>
               {/* Content */}
               <div className="mt-2 overflow-hidden leading-5">
                  {reviewText.substring(0, maxTextLength)}&nbsp;&nbsp;
                  {isMaxEqual ? (
                     ''
                  ) : (
                     <div className="py-2">
                        <span className="text-[#676c75] font-semibold">
                           Reviewer's Score: {review.score}/10
                        </span>
                     </div>
                  )}
                  {isMaxEqual ? (
                     ''
                  ) : (
                     <ReactionCardList sortedReactions={sortedReactions} />
                  )}
                  <button
                     className={`${
                        isMaxEqual
                           ? 'text-[#9FADBD]'
                           : 'text-[#676c75] hover:text-[#9FADBD] transition-all duration-150 ease-linear'
                     }  font-semibold text-xs`}
                     onClick={handleSetMaxText}
                  >
                     {isMaxEqual ? 'Read More' : 'Read Less'}
                  </button>
               </div>
            </div>
            {/* Reaction Section */}
            <div className="mb-auto flex gap-x-1 items-center whitespace-nowrap ">
               {/* top 3 reactions */}
               <div className="flex items-center">
                  {topReactions.map((item, index) => {
                     const reactionName = item[0] as keyof typeof ReviewIcons;
                     return (
                        <span key={index}>
                           {ReviewIcons[reactionName].icon}
                        </span>
                     );
                  })}
               </div>
               {/* Total */}
               <span className="">{review.reactions.overall}</span>
            </div>
         </div>
      </div>
   );
};

const ReactionCardList: React.FC<ReactionCardListModel> = ({
   sortedReactions,
}) => {
   return (
      <div className="bg-[#0d1116] flex flex-wrap sm:justify-center items-center gap-3  p-2 my-2 rounded-sm">
         {sortedReactions.map((reaction, index) => {
            const reactionName = reaction[0] as keyof typeof ReviewIcons;
            return (
               <div
                  key={index}
                  className="bg-[#14181d] font-semibold flex items-center p-2 px-4 gap-x-1 rounded-sm"
               >
                  <span className="">{ReviewIcons[reactionName].name}</span>
                  <span className="">{ReviewIcons[reactionName].icon}</span>
                  <span>{reaction[1]}</span>
               </div>
            );
         })}
      </div>
   );
};

const NoReviews: React.FC = () => {
   return (
      <div className="font-bold text-[#9FADBD] text-lg flex justify-center ">
         This Anime has no Reviews
      </div>
   );
};

const reviewCardIcons = {
   tag: {
      icon: (
         <Icon
            icon="mingcute:tag-fill"
            color="#676c75"
            width="12"
            height="12"
         />
      ),
   },
};

export default IndividualReviews;
