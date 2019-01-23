import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromReducers from '../../reducers';
import * as fromSelectors from './preset-editor.selectors';
import { Preset } from 'src/app/models/preset.model';



@Component({
  selector: 'jt-preset-editor',
  templateUrl: './preset-editor.component.html',
  styleUrls: ['./preset-editor.component.css']
})
export class PresetEditorComponent implements OnInit {
  presets$: Observable<Preset[]>

  constructor(private store: Store<fromReducers.State>) {
    this.presets$ = this.store.pipe(select(fromSelectors.selectAllPresets));
    this.presets$.subscribe(presets => {
      presets;
    })
  }

  ngOnInit() {
  }

}
