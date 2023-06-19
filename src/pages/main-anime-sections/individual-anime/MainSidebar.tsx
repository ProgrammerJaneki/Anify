import { Icon } from '@iconify/react/dist/iconify.js';
import { ReactNode, useMemo, useState, useContext } from 'react';
import ExternalSources from './ExternalSources';
import useCheckReso from '../../../utilities/useCheckReso';
import {
   IndividualAnimeContext,
   IndividualAnimeContextType,
} from '../../../utilities/contexts/IndividualAnimeContext';
import { format } from 'fecha';

interface InfoItemListModel {
   label: string;
   values: { name: string }[] | undefined;
}

interface InfoItemModel {
   label: string;
   value: unknown;
}

const MainSidebar: React.FC = () => {
   const [infoOpen, setInfoOpen] = useState<boolean>(false);
   const { fullAnimeData } = useContext(
      IndividualAnimeContext
   ) as IndividualAnimeContextType;
   const convertDuration = (duration: string | undefined) => {
      const numRegex = /\d+/;
      const matches = duration?.match(numRegex);
      const newDuration = matches ? matches[0] : null;
      return newDuration ? newDuration + ' episodes' : '';
   };
   const { resolutionWidth } = useCheckReso();
   const handleClick = () => {
      console.log(typeof fullAnimeData?.genres);
   };
   const handleFormattedData = useMemo(() => {
      return (airedDate: string | undefined) => {
         if (airedDate) {
            const formattedDate = format(new Date(airedDate), 'MMMM D, YYYY');
            return formattedDate;
         }
         return '';
      };
   }, []);

   return (
      <div className="grid sm:flex flex-col grid-cols-1 gap-4 w-full ">
         <div className="flex sm:flex-col gap-4 w-full ">
            <div className="bg-[#14181d] flex items-center gap-x-4 py-3 sm:py-2 px-4 rounded-sm w-full">
               <Icon
                  className="text-yellow-400"
                  icon="solar:star-bold"
                  width="16"
                  height="16"
               />
               <span
                  className="inline-block text-[#9FADBD] text-xs  font-semibold capitalize "
                  onClick={handleClick}
               >
                  #{fullAnimeData?.rank} Ranking
               </span>
            </div>
            <div className="bg-[#14181d] flex items-center gap-x-4 py-3 sm:py-2 px-4 rounded-sm w-full">
               <Icon
                  className="text-red-400"
                  icon="solar:heart-bold"
                  width="16"
                  height="16"
               />
               <span className="inline-block text-[#9FADBD] text-xs  font-semibold capitalize ">
                  #{fullAnimeData?.popularity} Popularity
               </span>
            </div>
         </div>
         {/* Anime Info Sidebar */}
         <div className="relative ">
            <div
               className={`${
                  resolutionWidth < 640 && infoOpen
                     ? 'h-auto'
                     : resolutionWidth > 640
                     ? 'h-auto'
                     : 'h-[105px]'
               } bg-[#14181d] flex flex-wrap sm:grid grid-cols-2 sm:grid-cols-1   gap-y-4 sm:gap-3  text-xs px-4 py-3 sm:py-4 w-full rounded-sm capitalize overflow-hidden `}
            >
               <InfoItem label="Type" value={fullAnimeData?.type} />
               <InfoItem label="Episodes" value={fullAnimeData?.episodes} />
               <InfoItem label="Status" value={fullAnimeData?.status} />
               <InfoItem label="Broadcast" value={fullAnimeData?.broadcast} />
               <InfoItem label="Season" value={fullAnimeData?.season} />
               <InfoItem
                  label="Start Date"
                  value={handleFormattedData(fullAnimeData?.aired.from)}
               />
               <InfoItem
                  label="End Date"
                  value={handleFormattedData(fullAnimeData?.aired.to)}
               />
               <InfoItem
                  label="Duration"
                  value={convertDuration(fullAnimeData?.duration)}
               />
               <InfoItemList label="Genres" values={fullAnimeData?.genres} />
               <InfoItem label="Rating" value={fullAnimeData?.rating} />
               <InfoItem label="Score" value={fullAnimeData?.score} />
               <InfoItem label="Scored By" value={fullAnimeData?.scored_by} />
               <InfoItem label="Members" value={fullAnimeData?.members} />
               <InfoItem label="Favorites" value={fullAnimeData?.favourites} />
               <InfoItem label="Romaji" value={fullAnimeData?.title} />
               <InfoItem label="English" value={fullAnimeData?.title_english} />
               <InfoItem
                  label="Japanese"
                  value={fullAnimeData?.title_japanese}
               />
               <InfoItem label="Source" value={fullAnimeData?.source} />
               <InfoItemList
                  label="Producers"
                  values={fullAnimeData?.producers}
               />
               <InfoItemList
                  label="Licensors"
                  values={fullAnimeData?.licensors}
               />
               <InfoItemList label="Studios" values={fullAnimeData?.studios} />
               <InfoItem label="Source" value={fullAnimeData?.source} />
            </div>
            <div className="absolute -bottom-10 text-center left-0 right-0 z-50">
               {resolutionWidth < 640 && (
                  <button
                     className="bg-[#14181d] text-[#9FADBD] -translate-y-7 p-2 z-50 rounded-full shadow-xl"
                     onClick={() => setInfoOpen(!infoOpen)}
                  >
                     {infoOpen ? (
                        <Icon icon="ep:arrow-up-bold" width="12" height="12" />
                     ) : (
                        <Icon
                           icon="ep:arrow-down-bold"
                           width="12"
                           height="12"
                        />
                     )}
                  </button>
               )}
            </div>
         </div>
         {resolutionWidth > 640 && (
            <ExternalSources fullAnimeData={fullAnimeData} />
         )}
      </div>
   );
};

const InfoItemList: React.FC<InfoItemListModel> = ({ label, values }) => {
   return (
      <div className="flex flex-col font-semibold mb-1 w-1/2 sm:w-auto">
         <span className="inline-block text-[#9FADBD] mb-1">{label}</span>
         {values?.map((item, index) => (
            <span key={index} className="text-[#676c75] leading-4">
               {item.name}
            </span>
         ))}
      </div>
   );
};

const InfoItem: React.FC<InfoItemModel> = ({ label, value }) => {
   let displayValue: ReactNode;
   if (typeof value === 'string' || typeof value === 'number') {
      displayValue = String(value);
   }
   return (
      <>
         {value ? (
            <div className="flex flex-col font-semibold w-1/2 sm:w-auto">
               <span className="inline-block text-[#9FADBD]">{label}</span>
               <span
                  className="text-[#676c75] leading-4"
               >
                  {displayValue}
               </span>
            </div>
         ) : (
            ''
         )}
      </>
   );
};

export default MainSidebar;
