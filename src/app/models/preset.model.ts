export interface Preset {
  id: number;
  title: string;
  exercisesIds: Array<number | string>;
  repetitions: number;
  default: boolean;
}
