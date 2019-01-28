import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CloseNav, OpenNav } from './app.actions';
import * as fromRedusers from '../../root-reducer';
import { RequestPresets } from '../preset-editor/preset-editor.actions';
import { RequestExercises }
  from 'src/app/components/exercise-editor/exercise-editor.actions';

@Component({
  selector: 'jt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'justimer';
  showNav$: Observable<boolean>
  visibleNav: boolean;

  constructor(private store: Store<fromRedusers.State>) {
    this.showNav$ = store.pipe(select(fromRedusers.getShowNav));
    this.showNav$.subscribe(sn => this.visibleNav = sn);
    this.store.dispatch(new RequestPresets());
    this.store.dispatch(new RequestExercises());
  }

  onClick() {
    if (this.visibleNav) {
      this.store.dispatch(new CloseNav());
    } else {
      this.store.dispatch(new OpenNav());
    }
  }
}
