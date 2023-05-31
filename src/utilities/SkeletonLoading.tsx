import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

interface SkeletonModel {
   amount: number;
}

const SkeletonLoading = ({ amount }: SkeletonModel) => {
   const numCards = Array(amount).fill(1);

   return (
      <>
         {/* <div>Hey</div> */}
         {numCards.map((_card, index) => (
            <SkeletonTheme
               key={index}
               baseColor="#313131"
               highlightColor="#525252"
            >
               <AnimatePresence>
                  <motion.div
                     key={index}
                     className=""
                     initial="close"
                     animate="open"
                     exit="close"
                     variants={SkeletonVariant}
                  >
                     <div className="aspect-[5/7] ">
                        <div className="object-fill rounded-md h-full w-full">
                           <Skeleton width={'100%'} height={'100%'} />
                        </div>
                     </div>
                     <h2 className="text-sm group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear ">
                        <Skeleton width={'100%'} height={20} />
                     </h2>
                  </motion.div>
               </AnimatePresence>
            </SkeletonTheme>
         ))}
      </>
   );
};
const SkeletonVariant = {
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
export default SkeletonLoading;
