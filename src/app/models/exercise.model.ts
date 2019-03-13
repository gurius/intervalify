export interface Exercise {
  id: number;
  title: string;
  color: string;
  countdownsIds: Array<number>;
  seqNo: number;
  repetitions: number;
  atStartOnly: boolean;
  atEndOnly: boolean;
  presetRepetitions: boolean;
  belongsToPresets: number[];
}
