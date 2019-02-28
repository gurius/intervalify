import { Countdown } from './countdown.model';

export interface Step extends Countdown {
  title: string;
  presetRepetitions: boolean;
  color: string;
}
