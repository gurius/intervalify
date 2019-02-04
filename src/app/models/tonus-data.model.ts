import { Preset } from './preset.model';
import { Countdown } from './countdown.model';
import { Exercise } from './exercise.model';

export interface TonusData {
  presets?: Array<Preset>;
  exercises?: Array<Exercise>;
  countdowns?: Array<Countdown>;
}
