import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';
import React from 'react';
import { NavLink } from 'react-router-dom';
import tinycolor from 'tinycolor2';
import { FullAnimeDataModel } from '../../../interface/anime/FullAnimeDataModel';
import {
   ExternalIcons,
   StreamingIcons,
} from '../../../assets/ExternalStreamingIcons';

interface SidebarModel {
   fullAnimeData: FullAnimeDataModel | undefined;
}

interface ExternalSourcesModel {
   item: { name: string; url: string };
}

const ExternalSources: React.FC<SidebarModel> = ({ fullAnimeData }) => {
   return (
      <div className="bg-transparent grid gap-2 text-[0.7rem] sm:text-xs w-full capitalize">
         <h1 className="text-[#9FADBD] text-xs font-semibold w-full">
            External & Streaming Links
         </h1>
         <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full">
            {fullAnimeData?.external?.map((item, index) => {
               return <External key={index} item={item} />;
            })}
            {fullAnimeData?.streaming?.map((item, index) => {
               return <Streaming key={index} item={item} />;
            })}
         </ul>
      </div>
   );
};

const External: React.FC<ExternalSourcesModel> = ({ item }) => {
   const randomColor = tinycolor.random().darken(10).toHexString();
   let externalIcon;
   switch (item.name.toLowerCase()) {
      case 'wikipedia':
         externalIcon = ExternalIcons.wikipedia;
         break;
      case 'official site':
         externalIcon = ExternalIcons.official;
         break;
      default:
         externalIcon = {
            icon: (
               <Icon
                  icon="dashicons:admin-site-alt2"
                  color="#ffff"
                  width="16"
                  height="16"
               />
            ),
            color: randomColor,
         };
   }
   return (
      <motion.li
         className="bg-[#14181d] truncate text-[#9FADBD]  font-semibold gap-x-4 p-1  rounded-sm capitalize w-full"
         whileHover={{
            backgroundColor: externalIcon.color,
            color: '#FFF',
         }}
         transition={{ duration: 0.3 }}
      >
         <NavLink className="flex items-center gap-x-2 " to={item.url}>
            <div
               className=" p-2 sm:p-1 aspect-square rounded-[3px] "
               style={{
                  backgroundColor: externalIcon.color,
                  color: randomColor,
               }}
            >
               {externalIcon.icon}
            </div>
            {item.name}
         </NavLink>
      </motion.li>
   );
};

const Streaming: React.FC<ExternalSourcesModel> = ({ item }) => {
   const randomColor = tinycolor.random().darken(10).toHexString();
   let streamingIcon;
   switch (item.name.toLowerCase()) {
      case 'netflix':
         streamingIcon = StreamingIcons.netflix;
         break;
      case 'crunchyroll':
         streamingIcon = StreamingIcons.crunchyroll;
         break;
      case 'bilibili global':
         streamingIcon = StreamingIcons.bilibili;
         break;
      default:
         streamingIcon = {
            icon: (
               <Icon
                  icon="dashicons:admin-site-alt2"
                  color="#ffff"
                  width="16"
                  height="16"
               />
            ),
            color: randomColor,
         };
   }
   return (
      <motion.li
         className="bg-[#14181d] text-[#9FADBD] font-semibold gap-x-4 p-1  rounded-sm capitalize w-full"
         whileHover={{
            backgroundColor: streamingIcon.color,
            color: '#FFF',
         }}
         transition={{ duration: 0.3 }}
      >
         <NavLink className="truncate flex items-center gap-x-2" to={item.url}>
            <div
               className="p-2 sm:p-1 aspect-square rounded-[3px] "
               style={{
                  backgroundColor: streamingIcon.color,
                  color: randomColor,
               }}
            >
               {streamingIcon.icon}
            </div>
            {item.name}
         </NavLink>
      </motion.li>
   );
};

export default ExternalSources;
