import { useContext } from 'react';
import AnimeRelations from './AnimeRelations';
import IndividualCharacters from './IndividualCharacters';
import IndividualStaff from './IndividualStaff';
import useCheckReso from '../../../utilities/useCheckReso';
import {
   IndividualAnimeContext,
   IndividualAnimeContextType,
} from '../../../utilities/contexts/IndividualAnimeContext';
import IndividualStats from './IndividualStats';
import AnimeVideo from './AnimeVideo';
import AnimeReco from './AnimeReco';
import IndividualReviews from './IndividualReviews';

const IndividualOverview = () => {
   const { resolutionWidth } = useCheckReso();
   const { fullAnimeData, isFullInfoSuccess } = useContext(
      IndividualAnimeContext
   ) as IndividualAnimeContextType;
   const thisBool = false;
   return (
      <div className="text-[#676c75] flex flex-col gap-y-6 sm:gap-y-8 w-full">
         {/* Relations */}
         {isFullInfoSuccess ? (
            <>
               <AnimeRelations />
               {resolutionWidth < 640 ? (
                  <div className="space-y-2">
                     <h2 className="text-[#9FADBD] font-semibold text-xs sm:text-sm block sm:hidden">
                        Description
                     </h2>
                     <div className="bg-[#14181d] p-4 group space-y-0 sm:space-y-4 rounded-sm">
                        <p className="text-[#676c75] relative leading-relaxed text-sm text-ellipsis">
                           {fullAnimeData?.synopsis}
                        </p>
                     </div>
                  </div>
               ) : (
                  ''
               )}
               <IndividualCharacters />
               <IndividualStaff />
               <IndividualStats />
               <AnimeVideo />
               <AnimeReco />
               <IndividualReviews />
            </>
         ) : (
            ''
         )}
      </div>
   );
};

export default IndividualOverview;
