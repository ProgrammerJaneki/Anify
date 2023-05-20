import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPopular = (dataLimit: number, page: number) => {
   const [fetchPopularData, setFetchPopularData] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<boolean>(false);

   useEffect(() => {
      const fetchPopularAnimeData = async () => {
         const baseUrl = `https://api.jikan.moe/v4/seasons/now?limit=${dataLimit}&page=${page}`;
         const listPopularAnime = await axios.get(baseUrl);
         const { data, pagination } = listPopularAnime.data;
         console.log('LIST: ', data);
         setFetchPopularData(data);
      };
      fetchPopularAnimeData();
   }, []);

   return { fetchPopularData, loading, error };
};

export default useFetchPopular;
