export interface AnimeStatsModel {
   watching: number;
   completed: number;
   on_hold: number;
   dropped: number;
   plan_to_watch: number;
   total: number;
   scores: { score: number; votes: number; percentage: number }[];
}
