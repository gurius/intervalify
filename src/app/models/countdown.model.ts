export interface Countdown {
  id: number;
  type: CountdownType;
  minutes: number;
  seconds: number;
  seqNo: number;
  belongsToExercises: number[];
}


export enum CountdownTypes {
  Rest = 'rest',
  Work = 'work'
}

export type CountdownType = CountdownTypes.Rest | CountdownTypes.Work;
