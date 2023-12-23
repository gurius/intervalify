import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Store, select } from "@ngrx/store";

import * as rootReducer from "../../root-reducer";
import { Exercise } from "src/app/models/exercise.model";
import { Countdown } from "src/app/models/countdown.model";
import * as countdonwSelectors from "../countdown/countdown.selectors";
import { CountdownService } from "src/app/helpers/countdown.service";
import { first } from "rxjs/operators";
import {
  DialogOptions,
  DialogTitleTypes,
} from "src/app/models/dialog-options.model";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from "@angular/forms";

@Component({
  selector: "jt-exercise-editor",
  templateUrl: "./exercise-editor.component.html",
  styleUrls: ["./exercise-editor.component.css"],
})
export class ExerciseEditorComponent implements OnInit, OnDestroy {
  exercise: Exercise;
  dialogOptions: DialogOptions;
  countdowns: Countdown[] = [];
  deletedCountdowns: number[] = [];
  exForm: UntypedFormGroup;

  ngOnInit(): void {
    if (this.dialogOptions.isNew) {
      this.addCoundown();
    } else {
      this.store
        .pipe(
          select(countdonwSelectors.allExerciseCountdowns(this.exercise.id)),
          first(),
        )
        .subscribe(
          (countdowns) =>
            (this.countdowns = countdowns.map((cd) => Object.assign({}, cd))),
        );
    }
  }

  ngOnDestroy(): void {}

  addCoundown() {
    const blank = this.cHelper.getBlank(this.exercise.id);
    this.exercise.countdownsIds.push(blank.id);
    this.countdowns.push(blank);
  }

  deleteCoundown(id) {
    const index = this.countdowns.findIndex((cn) => cn.id === id);
    if (index !== -1) {
      const cId = this.countdowns.splice(index, 1)[0].id;
      this.deletedCountdowns.push(cId);
    }
  }

  saveEx(): void {
    this.exForm;
    const presetRepetitions =
      this.exForm.value.atEndOnly || this.exForm.value.atStartOnly
        ? false
        : true;
    const data = {
      exercise: Object.assign({}, this.exercise, this.exForm.value, {
        presetRepetitions,
      }),
      countdowns: this.countdowns,
      deletedCountdowns: this.deletedCountdowns,
    };
    this.dialogReference.close(data);
  }

  static isNumFractional = (
    c: UntypedFormControl,
  ): null | { fractional: boolean } => {
    const n: number = c.value;
    const fractional: boolean = n - Math.floor(n) !== 0;
    return fractional ? { fractional } : null;
  };

  constructor(
    private dialogReference: MatDialogRef<ExerciseEditorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { exercise: Exercise; opts: DialogOptions },
    private store: Store<rootReducer.State>,
    private cHelper: CountdownService,
    private fb: UntypedFormBuilder,
  ) {
    this.exercise = Object.assign({}, this.data.exercise);
    this.dialogOptions = this.data.opts;

    this.exForm = fb.group({
      title: fb.control(this.exercise.title, [Validators.required]),
      repetitions: fb.control(this.exercise.repetitions, [
        Validators.required,
        Validators.min(1),
        ExerciseEditorComponent.isNumFractional,
      ]),
      color: fb.control(this.exercise.color),
      atStartOnly: fb.control(this.exercise.atStartOnly),
      atEndOnly: fb.control(this.exercise.atEndOnly),
    });
  }
}
