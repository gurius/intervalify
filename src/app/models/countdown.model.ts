export interface Countdown {
  id: string;
  type: CountdownType;
  value: number;
  seqNo: number;
}

export type CountdownType = 'rest' | 'work';
