import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useCheckReso from '../../utilities/useCheckReso';

const IndividualAnime = () => {
   const { mal_id } = useParams();
   return (
      <div className="flex justify-center items-center gap-y-8 w-full ">
         <span>ONGOING</span>
      </div>
   );
};

export default IndividualAnime;
