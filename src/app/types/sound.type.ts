export enum Sound {
  Kwak = 'kwak',
  End = 'end',
  Bip = 'bip',
  ExEnd = 'ex_end',
  Finish = 'finish'
}

export type SoundType
  = Sound.Bip
  | Sound.ExEnd
  | Sound.Finish;
