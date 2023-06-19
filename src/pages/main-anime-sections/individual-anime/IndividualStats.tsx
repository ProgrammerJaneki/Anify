import React, { useEffect, useState } from 'react';
import { useAnimeData } from './IndividualAnime';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
} from 'chart.js';
import BarChart, {
   SampleDataModel,
} from '../../../components/anime-section/BarChart';
import useFetchedAnimeStats from '../../../services/individual-anime/useFetchedAnimeStats';
import { NavLink, useLocation } from 'react-router-dom';

interface SummaryStatsModel {
   label: string;
   data: number | undefined;
   color: string;
}

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip
   // Legend
);

const options = {
   responsive: true,
   scales: {
      x: {
         grid: {
            drawOnChartArea: false,
         },
      },
      y: {
         display: false,
         grid: {
            drawOnChartArea: false,
         },
      },
   },
   plugins: {
      tooltip: {
         callbacks: {
            label: (tooltipLabel: any) => {
               return (
                  tooltipLabel.dataset.data[tooltipLabel.dataIndex] + ' votes'
               );
            },
            title: (tooltipItem: any) => {
               return (tooltipItem.label = '');
            },
         },
         intersect: false,
         position: 'average',
         displayColors: false,
      },
   },
};

const IndividualStats = () => {
   const { mal_id, anime_name } = useAnimeData();
   const { statData } = useFetchedAnimeStats(mal_id);
   const { completed, watching, plan_to_watch, dropped, on_hold, total } =
      statData ?? {};
   const computePercentage = (value: number) => {
      const quotient = value / (total ?? 0);
      // console.log('value: ', quotient * 100);
      return quotient * 100;
   };
   const { pathname } = useLocation();
   const isStatsRoute = /\/stats\/?$/.test(pathname);
   const label = statData?.scores.map((score) => score.score * 10);
   const data = statData?.scores.map((score) => score.votes);
   const [scoreData, setScoreData] = useState<SampleDataModel>({
      labels: undefined,
      datasets: [
         {
            label: '',
            data: undefined,
            backgroundColor: [],
            borderRadius: 0,
         },
      ],
   });
   useEffect(() => {
      if (statData !== undefined) {
         setScoreData({
            labels: label,
            datasets: [
               {
                  label: 'Scores',
                  data: data,
                  backgroundColor: [
                     '#0000b3',
                     '#0010d9',
                     '#0020ff',
                     '#0040ff',
                     '#0060ff',
                     '#0080ff',
                     '#009fff',
                     '#00bfff',
                     '#00dfff',
                     '#00ffff',
                  ],
                  borderRadius: 5,
               },
            ],
         });
      }
   }, [statData]);

   return (
      <div className="text-[#ffff] w-full">
         <div className="flex flex-col gap-y-2 ">
            {/* <h1 className="text-[#9FADBD] font-semibold text-sm ">
               Summary Stats
            </h1> */}
            <NavLink
               className="text-[#9FADBD] font-semibold text-sm"
               to={`/anime/${mal_id}/${anime_name}/stats`}
            >
               Summary Stats
            </NavLink>
            <div className="bg-[#14181D] flex flex-col gap-y-4 text-xs rounded-sm">
               {/* Completed, Watching, Planning Pause, Dropped */}
               <div className="flex justify-center flex-wrap p-4 gap-2 gap-y-4">
                  <SummaryStats
                     color="#5dbb63"
                     label={'Watching'}
                     data={watching}
                  />
                  <SummaryStats
                     color="#0492c2"
                     label={'Planning'}
                     data={plan_to_watch}
                  />
                  <SummaryStats
                     color="#fc6a03"
                     label={'Paused'}
                     data={on_hold}
                  />
                  <SummaryStats
                     color="#9867c5"
                     label={'Completed'}
                     data={completed}
                  />
                  <SummaryStats
                     color="#bc544b"
                     label={'Dropped'}
                     data={dropped}
                  />
               </div>
               <div className="flex w-full overflow-hidden rounded-full">
                  <div
                     className="bg-[#5dbb63] h-2.5 "
                     style={{ width: `${computePercentage(watching ?? 0)}%` }}
                  ></div>
                  <div
                     className="bg-[#0492c2] h-2.5 "
                     style={{
                        width: `${computePercentage(plan_to_watch ?? 0)}%`,
                     }}
                  ></div>
                  <div
                     className="bg-[#fc6a03] h-2.5 "
                     style={{ width: `${computePercentage(on_hold ?? 0)}%` }}
                  ></div>
                  <div
                     className="bg-[#9867c5] h-2.5 "
                     style={{
                        width: `${computePercentage(completed ?? 0)}%`,
                     }}
                  ></div>
                  <div
                     className="bg-[#bc544b] h-2.5 "
                     style={{ width: `${computePercentage(dropped ?? 0)}%` }}
                  ></div>
               </div>
            </div>
         </div>
         {scoreData && isStatsRoute ? (
            <>
               <h1 className="text-[#9FADBD] font-semibold text-sm mt-6">
                  Score Stats
               </h1>
               <BarChart chartData={scoreData} options={options} />
            </>
         ) : (
            ''
         )}
      </div>
   );
};

const SummaryStats: React.FC<SummaryStatsModel> = ({ label, data, color }) => {
   return (
      <div className="space-y-2 mx-auto">
         <div
            style={{ backgroundColor: `${color}` }}
            className="text-center capitalize p-2 px-4 rounded-sm"
         >
            {label}
         </div>
         <h4 style={{ color: `${color}` }}>
            {data} <span className="text-[#676c75]">Users</span>
         </h4>
      </div>
   );
};

export default IndividualStats;
