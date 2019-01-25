import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { capitalize } from 'lodash';

import * as fromReducers from '../../reducers';
import * as fromSelectors from './preset-editor.selectors';
import { Preset } from 'src/app/models/preset.model';
import { AddPreset, UpdatePreset } from './preset-editor.actions';



@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit, OnDestroy {
  preset$: Observable<Preset>
  preset: Preset;
  presetSubscription: Subscription;
  editingTitle: boolean;
  editingRepetitions: boolean;

  @ViewChild('titleInput') private titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('repetitionsInput') private repetitionsInput: ElementRef<HTMLInputElement>;

  constructor(private store: Store<fromReducers.State>) {
    this.preset$ = this.store.pipe(select(fromSelectors.selectPreset(1)));

    this.presetSubscription = this.preset$
      .subscribe(preset => {

        if (!preset) {

          this.store.dispatch(new AddPreset({
            preset: {
              id: 1,
              title: '',
              exercisesIds: [],
              repetitions: 1
            }
          }));

        } else {
          this.preset = preset;
        }

      })

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.presetSubscription.unsubscribe();
  }

  onBlur(prop, val) {
    this.store.dispatch(new UpdatePreset({
      preset: {
        id: this.preset.id,
        changes: { [prop]: val }
      }
    }))
    let editingField = 'editing'+capitalize(prop);
    this[editingField] = false;
  }

  editProperty(prop) {
    let editingField = 'editing'+capitalize(prop);
    this[editingField] = true;
    setTimeout(() => this[prop+'Input'].nativeElement.focus(), 100)
  }

}
