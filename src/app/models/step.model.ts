import { Countdown } from './countdown.model';

export interface Step extends Countdown {
  atStartOnly?: boolean;
  atEndOnly?: boolean;
  title: string;
  presetRepetitions: boolean;
  color: string;
}
