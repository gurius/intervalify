export interface DialogOptions {
  title: DialogTitleType;
  isNew: boolean;
}

export enum DialogTitleTypes {
  NewExercise = 'new',
  EditExercise = 'edit'
}

export type DialogTitleType
  = DialogTitleTypes.EditExercise
  | DialogTitleTypes.NewExercise;
