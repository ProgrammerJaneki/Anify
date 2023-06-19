import { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useCheckReso from '../../../utilities/useCheckReso';
import MainSidebar from './MainSidebar';
import { useOutletContext } from 'react-router-dom';
import { FullAnimeDataModel } from '../../../interface/FullAnimeDataModel';
import { IndividualAnimeContext } from '../../../utilities/contexts/IndividualAnimeContext';
import { AnimeCharactersModel } from '../../../interface/AnimeCharactersModel';
import useFetchedFullAnimeInfo from '../../../services/individual-anime/useFetchedFullAnimeInfo';
import useFetchedAnimePictures from '../../../services/individual-anime/useFetchedAnimePictures';

interface AnimeDataContextModel {
   mal_id: string | undefined;
   anime_name: string | undefined;
   fullAnimeData: FullAnimeDataModel | undefined;
   characterData: AnimeCharactersModel[] | undefined;
}

const IndividualAnime = () => {
   const { mal_id, anime_name } = useParams();
   const { resolutionWidth } = useCheckReso();
   const [showContent, setShowContent] = useState<boolean>(false);
   const { pathname } = useLocation();
   const isMainRoute = /^\/anime\/\d+\/[^/]+\/$/.test(pathname);

   const { fullAnimeData, isFullInfoSuccess } = useFetchedFullAnimeInfo(mal_id);
   const { animePictureData } = useFetchedAnimePictures(mal_id);
   const contextProps = {
      mal_id,
      anime_name,
      fullAnimeData,
      isFullInfoSuccess
   };
   return (
      <div className="w-full ">
         <div className="relative w-full ">
            <div
               className=" bg-no-repeat bg-cover bg-center mt-0 sm:mt-[-58px] w-full h-[210px] sm:h-[350px] "
               style={{
                  backgroundImage: `url('${animePictureData?.large_image_url}')`,
               }}
            >
               <div className="w-full h-full"></div>
            </div>
         </div>
         <div className="bg-[#14181d] grid place-items-center px-4 w-full">
            <div className="relative w-full max-w-4xl">
               <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-6 md:gap-x-12 gap-y-4 pb-8 w-full h-full sm:min-h-[250px] ">
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-1 gap-2 mt-[-110px] sm:mt-[-125px] max-h-[350px] sm:max-w-[200px] ">
                     <img
                        className="mt-4 max-w-[100px] sm:max-w-full rounded-sm"
                        src={fullAnimeData?.images.jpg.image_url}
                        alt=""
                     />
                     <div className="w-full grid content-end sm:h-9">
                        <div className="bg-[#59dfd6] text-[#ffffff] font-semibold flex items-center justify-center text-sm rounded-sm p-2 ">
                           {fullAnimeData?.status}
                        </div>
                     </div>
                  </div>
                  <div className="py-4  overflow-x-hidden">
                     <h1 className="text-[#9FADBD] font-semibold text-lg sm:text-xl">
                        {fullAnimeData?.title}
                        <br />
                     </h1>
                     {resolutionWidth > 640 ? (
                        <div className="group space-y-0 sm:space-y-4 ">
                           <h2 className="text-[#9FADBD] font-semibold text-sm py-2 block sm:hidden">
                              Description
                           </h2>
                           <p
                              className={`${
                                 showContent
                                    ? 'overflow-y-visible'
                                    : 'sm:max-h-[200px] md:max-h-[170px] overflow-y-hidden'
                              } text-[#676c75] relative leading-relaxed text-sm text-ellipsis  `}
                           >
                              {fullAnimeData?.synopsis}
                              {!showContent ? (
                                 <span
                                    className="bg-[#0d1116] text-sm opacity-0 group-hover:opacity-60  absolute bottom-0 left-0 right-0 py-1  whitespace-nowrap z-50 cursor-pointer text-center text-[#c9d7d7] transition-all duration-300 ease-linear"
                                    onClick={() => setShowContent(true)}
                                 >
                                    Read More
                                 </span>
                              ) : (
                                 <span
                                    className="block  left-0 right-0 whitespace-nowrap z-50 cursor-pointer font-medium text-center text-[#9FADBD] py-1 transition-all duration-300 ease-linear"
                                    onClick={() => setShowContent(false)}
                                 >
                                    Read Less
                                 </span>
                              )}
                           </p>
                        </div>
                     ) : (
                        ''
                     )}
                     <TabLinks />
                  </div>
               </div>
            </div>
         </div>

         <IndividualAnimeContext.Provider value={{ ...contextProps }}>
            <div className="grid place-items-center p-4 mt-2 sm:mt-4 w-full h-full">
               <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 md:gap-x-12 max-w-4xl w-full">
                  {resolutionWidth < 640 && !isMainRoute ? '' : <MainSidebar />}
                  <Outlet context={{ ...contextProps }} />
               </div>
            </div>
         </IndividualAnimeContext.Provider>
      </div>
   );
};

const TabLinks = () => {
   const { mal_id, anime_name } = useParams();
   return (
      <div className="flex justify-between items-end text-sm text-[#676c75] font-semibold pt-6 snap-x snap-mandatory sm:scrollbar-thin scrollbar-thumb-[#676c75] scrollbar-track-rounded-md overflow-x-auto ">
         <NavLink
            to={`/anime/${mal_id}/${anime_name}/`}
            // to="/anime/:mal_id/:anime_name/overview"
            className={({ isActive }) =>
               `py-4 pr-4 pl-0 sm:pl-4 snap-start ${
                  isActive
                     ? 'text-[#9FADBD]'
                     : 'hover:text-[#9FADBD] transition-all duration-150 ease-linear '
               }`
            }
         >
            Overview
         </NavLink>
         <NavLink
            to={`/anime/${mal_id}/${anime_name}/characters`}
            className={({ isActive }) =>
               `snap-start p-4 ${
                  isActive
                     ? 'text-[#9FADBD]'
                     : 'hover:text-[#9FADBD] transition-all duration-150 ease-linear '
               }`
            }
         >
            Characters
         </NavLink>
         <NavLink
            to={`/anime/${mal_id}/${anime_name}/staff`}
            className={({ isActive }) =>
               `snap-start p-4 ${
                  isActive
                     ? 'text-[#9FADBD]'
                     : 'hover:text-[#9FADBD] transition-all duration-150 ease-linear '
               }`
            }
         >
            Staff
         </NavLink>
         <NavLink
            to={`/anime/${mal_id}/${anime_name}/reviews`}
            className={({ isActive }) =>
               `snap-start p-4 ${
                  isActive
                     ? 'text-[#9FADBD]'
                     : 'hover:text-[#9FADBD] transition-all duration-150 ease-linear '
               }`
            }
         >
            Reviews
         </NavLink>
         <NavLink
            to={`/anime/${mal_id}/${anime_name}/stats`}
            className={({ isActive }) =>
               `snap-start p-4 ${
                  isActive
                     ? 'text-[#9FADBD]'
                     : 'hover:text-[#9FADBD] transition-all duration-150 ease-linear '
               }`
            }
         >
            Stats
         </NavLink>
      </div>
   );
};

export function useAnimeData() {
   return useOutletContext<AnimeDataContextModel>();
}

export default IndividualAnime;
