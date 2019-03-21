import { Component, LOCALE_ID, Inject } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CloseNav, OpenNav } from './app.actions';
import * as fromRedusers from '../../root-reducer';
import { RequestPresets } from '../preset-editor/preset-editor.actions';
import { RequestExercises }
  from 'src/app/components/exercise-editor/exercise-editor.actions';
import { RequestCountdowns }
  from 'src/app/components/countdown/countdown.actions';
import { StepperService } from '../stepper/stepper.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { BottomSheetMenuComponent } from 'src/app/components/bottom-sheet-menu/bottom-sheet-menu.component';

@Component({
  selector: 'jt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intervalify';
  showNav$: Observable<boolean>
  visibleNav: boolean;
    menuRef: MatBottomSheetRef<BottomSheetMenuComponent, any>;
    aoSubs: Subscription;
    adSubs: Subscription;
    l: string;

  constructor(
    private store: Store<fromRedusers.State>,
    private stepper: StepperService,
    private menu: MatBottomSheet,
    @Inject(LOCALE_ID) locale: string
  ) {
    this.showNav$ = store.pipe(select(fromRedusers.getShowNav));
    this.showNav$.subscribe(sn => this.visibleNav = sn);
    this.store.dispatch(new RequestPresets());
    this.store.dispatch(new RequestExercises());
    this.store.dispatch(new RequestCountdowns());
    this.l = locale;
  }

  openMenu(): void {
    this.menuRef = this.menu.open(BottomSheetMenuComponent);

    this.aoSubs = this.menuRef.afterOpened().subscribe(() => {
      this.store.dispatch(new OpenNav());
      this.aoSubs.unsubscribe();
    });

    this.adSubs = this.menuRef.afterDismissed().subscribe(() => {
      this.store.dispatch(new CloseNav());
      this.adSubs.unsubscribe();
    })
  }


}
