export interface Countdown {
  id: number;
  type: CountdownType;
  minutes: number;
  seconds: number;
  seqNo: number;
  belongsToExercises: number[];
}

export type CountdownType = 'rest' | 'work';
