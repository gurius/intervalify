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
import { MatBottomSheet, MatBottomSheetRef, MatIconRegistry } from '@angular/material';
import { BottomSheetMenuComponent } from 'src/app/components/bottom-sheet-menu/bottom-sheet-menu.component';
import { DomSanitizer } from '@angular/platform-browser';
import { OpenMenuBtn, CloseMenuBtn } from './menu-btn.actions';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'jt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('duckToggle', [
      transition(':enter', [
        style({ transform: 'translateY(7rem)' }),
        animate('0.3s ease-in', style({ transform: '*' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(7rem)' }))
      ])
    ]),
    trigger('btnTrigger', [
      transition('menu => close', [
        animate('0.2s ease-in', style({ transform: 'rotateZ(0.25turn)' })),
      ]),
      transition('close => menu', [
        style({ transform: 'rotateZ(0.25turn)'}),
        animate('0.2s ease-in', style({ transform: '*' })),
      ])
    ]),
  ]

})
export class AppComponent {
  title = 'intervalify';
  // showNav$: Observable<boolean>
  visibleNav: boolean;
  menuRef: MatBottomSheetRef<BottomSheetMenuComponent, any>;
  aoSubs: Subscription;
  adSubs: Subscription;
  l: string;
  btnAppearanceState$: Observable<string>;
  btnVisibilityState$: Observable<boolean>;

  constructor(
    private store: Store<fromRedusers.State>,
    private stepper: StepperService,
    private menu: MatBottomSheet,
    @Inject(LOCALE_ID) locale: string,
    private mIRegiser: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    mIRegiser.addSvgIcon('presets-list',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/preset_list.svg')
    );
    mIRegiser.addSvgIcon('resting-man-green',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/resting-man-green.svg')
    );
    mIRegiser.addSvgIcon('green-flag-black-grip',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/green-flag-black-grip.svg')
    );
    mIRegiser.addSvgIcon('crossed-flag',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/crossed-flag.svg')
    );
    mIRegiser.addSvgIcon('resting-man-green',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/resting-man-green.svg')
    );
    mIRegiser.addSvgIcon('icon-512x512',
      domSanitizer
        .bypassSecurityTrustResourceUrl('assets/images/icon-512x512.svg')
    );
    // this.showNav$ = store.pipe(select(fromRedusers.getShowNav));
    // this.showNav$.subscribe(sn => this.visibleNav = sn);

    this.btnAppearanceState$ = store.pipe(select(fromRedusers.getMenuBtnAppearance));
    this.btnVisibilityState$ = store.pipe(select(fromRedusers.getMenuBtnVisibility));

    this.store.dispatch(new RequestPresets());
    this.store.dispatch(new RequestExercises());
    this.store.dispatch(new RequestCountdowns());
    this.l = locale;
  }

  openMenu(): void {
    this.menuRef = this.menu.open(BottomSheetMenuComponent);

    this.aoSubs = this.menuRef.afterOpened().subscribe(() => {
      this.store.dispatch(new OpenNav());
      this.store.dispatch(new OpenMenuBtn());
      this.aoSubs.unsubscribe();
    });

    this.adSubs = this.menuRef.afterDismissed().subscribe(() => {
      this.store.dispatch(new CloseNav());
      this.store.dispatch(new CloseMenuBtn());
      this.adSubs.unsubscribe();
    })
  }


}
