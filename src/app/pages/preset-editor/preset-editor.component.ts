import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromReducers from '../../reducers';
import * as fromSelectors from './preset-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { AddPreset, UpdatePreset } from './preset-editor.actions';



@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit {
  preset$: Observable<Preset>
  preset: Preset;

  constructor(private store: Store<fromReducers.State>) {
    this.preset$ = this.store.pipe(select(fromSelectors.selectPreset(1)));
    this.preset$.subscribe(preset => {
      if (!preset) {

        this.store.dispatch(new AddPreset({
          preset: {
            id: 1,
            title: '',
            exercisesIds: [],
            repetitions: 0,
            default: true
          }
        }));

      } else {
        this.preset = preset;
      }
    })
  }

  ngOnInit() { }

  onBlur(title) {
    this.store.dispatch(new UpdatePreset({
      preset: {
        id: this.preset.id,
        changes: { title }
      }
    }))
    return true;
  }

}
