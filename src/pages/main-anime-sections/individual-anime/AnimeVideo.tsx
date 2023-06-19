import React from 'react';
import YouTube from 'react-youtube';
import { useAnimeData } from './IndividualAnime';

const opts = {
   width: '100%',
   playerVars: {
      autoplay: 0,
   },
};

const AnimeVideo: React.FC = () => {
   const { fullAnimeData } = useAnimeData();
   return (
      <div className="space-y-2 w-full">
         <h1 className="text-[#9FADBD] font-semibold text-sm ">Trailer</h1>
         <YouTube
            className="aspect-video rounded-sm "
            videoId={fullAnimeData?.trailer.youtube_id}
            opts={opts}
         />
      </div>
   );
};

export default AnimeVideo;
