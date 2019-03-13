import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CloseNav, OpenNav } from './app.actions';
import * as fromRedusers from '../../root-reducer';
import { RequestPresets } from '../preset-editor/preset-editor.actions';
import { RequestExercises }
  from 'src/app/components/exercise-editor/exercise-editor.actions';
import { RequestCountdowns }
  from 'src/app/components/countdown/countdown.actions';
import { StepperService } from '../stepper/stepper.service';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetMenuComponent } from 'src/app/components/bottom-sheet-menu/bottom-sheet-menu.component';

@Component({
  selector: 'jt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'justimer';
  showNav$: Observable<boolean>
  visibleNav: boolean;

  constructor(
    private store: Store<fromRedusers.State>,
    private stepper: StepperService,
    private menu: MatBottomSheet
  ) {
    this.showNav$ = store.pipe(select(fromRedusers.getShowNav));
    this.showNav$.subscribe(sn => this.visibleNav = sn);
    this.store.dispatch(new RequestPresets());
    this.store.dispatch(new RequestExercises());
    this.store.dispatch(new RequestCountdowns());
  }

  openMenu(): void {
    this.menu.open(BottomSheetMenuComponent);
  }

  onClick() {
    if (this.visibleNav) {
      this.store.dispatch(new CloseNav());
    } else {
      this.store.dispatch(new OpenNav());
    }
  }
}
