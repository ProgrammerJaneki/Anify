import React, { useState } from 'react';
import { useAnimeData } from './IndividualAnime';
import useFetchedAnimeStaff from '../../../services/individual-anime/useFetchedAnimeStaff';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ColorRing } from 'react-loader-spinner';
import { AnimatePresence, motion } from 'framer-motion';

const IndividualStaff = () => {
   const { mal_id } = useAnimeData();
   const { staffData } = useFetchedAnimeStaff(mal_id);
   const { pathname } = useLocation();
   const [maxItem, setMaxItem] = useState<number>(20);
   const hasMore = maxItem <= (staffData?.length ?? 0);
   const isStaffRoute = /\/staff\/?$/.test(pathname);

   const MAX_LENGTH = isStaffRoute ? maxItem : 6;
   const handleLoadMore = () => {
      // setIsLoading(true);
      const staffTimeout = setTimeout(() => {
         setMaxItem((prevVal) => prevVal + 20);

         clearTimeout(staffTimeout);
      }, 1000);
   };
   return (
      <AnimatePresence>
         <div className="space-y-2 font-semibold text-sm text-[#9FADBD]">
            {!isStaffRoute ? <h1>Staff</h1> : ''}
            <InfiniteScroll
               dataLength={maxItem}
               next={handleLoadMore}
               hasMore={hasMore && isStaffRoute}
               loader={
                  <div className="flex justify-center mt-2">
                     <ColorRing
                        visible={true}
                        height={50}
                        width={50}
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                           '#4fbdb5',
                           '#4fbdb5',
                           '#4fbdb5',
                           '#4fbdb5',
                           '#4fbdb5',
                        ]}
                     />
                  </div>
               }
            >
               <div className="font-semibold grid sm:grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#676C75] shadow-lg">
                  {staffData?.slice(0, MAX_LENGTH).map((item, index) => (
                     <motion.div
                        key={index}
                        className="bg-[#14181D] flex gap-x-2 rounded-r-sm"
                        animate="open"
                        initial="close"
                        exit="close"
                        variants={StaffCardVariant}
                     >
                        <img
                           className="w-[70px] aspect-[5/6] object-cover rounded-l-sm"
                           src={item.person.images.jpg.image_url}
                           alt=""
                        />
                        <div className="flex flex-col justify-between py-2">
                           <h1>{item.person.name}</h1>
                           <h1>{item.positions}</h1>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </InfiniteScroll>
         </div>
      </AnimatePresence>
   );
};

const StaffCardVariant = {
   open: {
      scale: 1,
      transition: {
         duration: 0.2,
      },
   },
   close: {
      scale: 0.9,
   },
};

export default IndividualStaff;
