import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const TopAnime = () => {
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const handleHoverEnter = () => {
      setIsHovered(true);
   };
   const handleHoverLeave = () => {
      setIsHovered(false);
   };

   return (
      <div className="grid grid-cols-3 md:grid-cols-4  gap-y-4 gap-x-8 w-ful">
         <h1 className="font-semibold col-span-full ">TOP ANIME</h1>
         <div
            className="group relative font-semibold  text-[#676c75] cursor-pointer"
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
         >
            {/* Modal */}
            {isHovered && (
               <div className="absolute left-full translate-x-4 top-1 bg-[#171d24] text-[#acbfd0] py-6 px-6 rounded-md w-[18rem]">
                  <div className="flex items-center justify-between">
                     <h1>Spring 2016</h1>
                     <div className="inline-flex items-center gap-x-1">
                        <Icon
                           icon="ph:star-fill"
                           color="#ffc107"
                           width="14"
                           height="14"
                        />
                        <h1>8.87</h1>
                     </div>
                  </div>
                  <div className="text-xs py-3">
                     <h1>MAPPA</h1>
                     <div className="flex gap-x-2">
                        <h1>TV Show</h1>&#x2022;
                        <h1>12 episodes</h1>
                     </div>
                  </div>
                  {/* Genre */}
                  <div className="text-xs text-[#ffff] mt-2 font-medium flex items-center flex-wrap gap-2">
                     <div className="bg-[#59dfd6] rounded-full py-1 px-4">
                        action
                     </div>
                     <div className="bg-[#59dfd6] rounded-full py-1 px-4">
                        adventure
                     </div>
                     <div className="bg-[#59dfd6] rounded-full py-1 px-4">
                        comedy
                     </div>
                  </div>
               </div>
            )}
            <div className="aspect-[5/7] ">
               <img
                  className="object-fill rounded-sm h-full w-full"
                  src="https:\/\/cdn.myanimelist.net\/images\/anime\/1075\/131925.jpg"
                  alt="img"
               />
            </div>
            <h2 className="group-hover:text-[#4fbdb5] pt-2 transition-all duration-100 ease-linear">
               Kimetsu no Yaiba: Katanakaji no Sato-hen
            </h2>
         </div>

         <div className="font-semibold space-y-2 text-[#676c75]">
            <div className="aspect-[5/7]">
               <img
                  className="object-fill rounded-sm h-full w-full"
                  src="https:\/\/cdn.myanimelist.net\/images\/anime\/1765\/135099.jpg"
                  alt="img"
               />
            </div>
            <h2>Kimetsu no Yaiba: Katanakaji no Sato-hen</h2>
         </div>
         <div className="font-semibold text-[#676c75]">
            <div className="aspect-[5/7]">
               <img
                  className="object-fill rounded-sm h-full w-full"
                  src="https:\/\/cdn.myanimelist.net\/images\/anime\/1765\/135099.jpg"
                  alt="img"
               />
            </div>
            <h2 className="pt-2">Kimetsu no Yaiba: Katanakaji no Sato-hen</h2>
         </div>
         <div className="font-semibold space-y-2 text-[#676c75]">
            <div className="aspect-[5/7]">
               <img
                  className="object-fill rounded-sm h-full w-full"
                  src="https:\/\/cdn.myanimelist.net\/images\/anime\/1765\/135099.jpg"
                  alt="img"
               />
            </div>
            <h2>Kimetsu no Yaiba: Katanakaji no Sato-hen</h2>
         </div>
      </div>
   );
};

export default TopAnime;
