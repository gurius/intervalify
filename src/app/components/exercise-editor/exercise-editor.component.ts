import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'jt-exercise-editor',
  templateUrl: './exercise-editor.component.html',
  styleUrls: ['./exercise-editor.component.css']
})
export class ExerciseEditorComponent implements OnInit {
  ngOnInit(): void { }
  exercise: Exercise;
  dialogOptions: { dialogTitle };

  constructor(
    private dialogReference: MatDialogRef<ExerciseEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercise, opts }
  ) {
    this.exercise = this.data.exercise;
    this.dialogOptions = this.data.opts;
  }


}
