import React, { useReducer } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAnimeData } from './IndividualAnime';
import { AnimeCharactersModel } from '../../../interface/AnimeCharactersModel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ColorRing } from 'react-loader-spinner';
import DropDown from '../../../components/anime-section/DropDown';
import useFetchedAnimeCharacters from '../../../services/individual-anime/useFetchedAnimeCharacters';
import { AnimatePresence, motion } from 'framer-motion';

interface VoiceActorSectionModel {
   item: AnimeCharactersModel;
   activeLang: string;
}
interface CharacterSectionModel {
   item: AnimeCharactersModel;
}

enum FilterActionType {
   SelectLanguage = 'SELECT_LANGUAGE',
   ToggleFilter = 'TOGGLE_FILTER',
   IncreaseMaxItems = 'INCREASE_MAX_ITEMS',
   EnabledLoading = 'ENABLE_LOADING',
}

interface State {
   selectedLanguage: string;
   showDropDown: boolean;
   maxItem: number;
   loadingList: boolean;
}

interface FilterAction {
   type: FilterActionType;
   payload?: any;
}

const initialFilterState: State = {
   selectedLanguage: 'japanese',
   showDropDown: false,
   maxItem: 20,
   loadingList: false,
};

const IndividualCharacters: React.FC = () => {
   // Data
   const { mal_id, anime_name } = useAnimeData();
   const { characterData } = useFetchedAnimeCharacters(mal_id);
   const languageList: string[] = [
      'japanese',
      'english',
      'spanish',
      'french',
      'italian',
      'german',
   ];
   // Route related
   const { pathname } = useLocation();
   const isCharRoute = /\/characters\/?$/.test(pathname);

   // Reducer related
   const [state, dispatch] = useReducer(reducer, initialFilterState);
   const { selectedLanguage, showDropDown, maxItem } = state;
   const MAX_LENGTH = isCharRoute ? maxItem : 6;
   const hasMore = maxItem <= (characterData?.length ?? 0);
   const handleLanguageSelect = (language: string) => {
      dispatch({
         type: FilterActionType.SelectLanguage,
         payload: language,
      });
   };
   const toggleDropDown = () => {
      dispatch({ type: FilterActionType.ToggleFilter });
   };
   const handleLoadMore = () => {
      dispatch({ type: FilterActionType.EnabledLoading });
      const charTimeout = setTimeout(() => {
         dispatch({
            type: FilterActionType.IncreaseMaxItems,
         });
         clearTimeout(charTimeout);
      }, 1000);
   };
   // Props
   const dropDownProps = {
      selectedLanguage,
      showDropDown,
      languageList,
      toggleDropDown,
      handleLanguageSelect,
   };
   return (
      <AnimatePresence>
         <div className="space-y-2 ">
            <div className="flex items-center font-semibold text-sm text-[#9FADBD] ">
               {isCharRoute ? (
                  <DropDown {...dropDownProps} />
               ) : (
                  <NavLink
                     className="text-[#9FADBD] font-semibold text-sm"
                     to={`/anime/${mal_id}/${anime_name}/characters`}
                  >
                     Characters
                  </NavLink>
               )}
            </div>
            <InfiniteScroll
               dataLength={maxItem}
               next={handleLoadMore}
               hasMore={hasMore && isCharRoute}
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
               <div className="font-semibold grid third-md:grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#676C75] shadow-lg">
                  {characterData?.slice(0, MAX_LENGTH).map((item, index) => (
                     <motion.div
                        key={item.character.name + index}
                        className="bg-[#14181d] grid grid-cols-2 gap-x-2 rounded-sm w-full"
                        animate="open"
                        initial="close"
                        exit="close"
                        variants={CharacterCardVariant}
                     >
                        <CharacterSection item={item} />
                        <VoiceActorSection
                           item={item}
                           activeLang={selectedLanguage}
                        />
                     </motion.div>
                  ))}
               </div>
            </InfiniteScroll>
         </div>
      </AnimatePresence>
   );
};

// Reducer
const reducer = (state: State, action: FilterAction): State => {
   const { payload, type } = action;
   switch (type) {
      case FilterActionType.SelectLanguage:
         return {
            ...state,
            selectedLanguage: payload,
            showDropDown: true,
         };
      case FilterActionType.ToggleFilter:
         return {
            ...state,
            showDropDown: !state.showDropDown,
         };
      case FilterActionType.IncreaseMaxItems:
         return {
            ...state,
            maxItem: state.maxItem + 25,
            loadingList: false,
         };
      case FilterActionType.EnabledLoading:
         return {
            ...state,
            loadingList: true,
         };
      default:
         return state;
   }
};

const CharacterSection: React.FC<CharacterSectionModel> = ({ item }) => {
   return (
      <div className="flex gap-x-2 place-content-start">
         <img
            className="w-[70px] aspect-[5/6] object-cover rounded-l-sm"
            src={item.character.images.jpg.image_url}
            alt=""
         />
         <div className="flex flex-col justify-between py-2">
            <h1>{item.character.name} </h1>
            <h1>{item.role}</h1>
         </div>
      </div>
   );
};
// Create component for voice actors
const VoiceActorSection: React.FC<VoiceActorSectionModel> = ({
   item,
   activeLang,
}) => {
   // const activeLang = 'japanese';
   const activeVA = item.voice_actors.find(
      (ac) => ac.language.toLowerCase() === activeLang
   );
   return (
      <div className="flex gap-x-2 place-content-end">
         <div className="flex flex-col justify-between text-right py-2">
            <h1>{activeVA?.person.name}</h1>
            <h1>{activeVA?.language}</h1>
         </div>
         {activeVA?.person.images && (
            <img
               className="w-[70px] aspect-[5/6] object-cover rounded-r-sm"
               src={activeVA?.person?.images?.jpg.image_url}
               alt=""
            />
         )}
      </div>
   );
};

const CharacterCardVariant = {
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

export default IndividualCharacters;
