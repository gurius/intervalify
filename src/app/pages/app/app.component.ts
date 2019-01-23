import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CloseNav, OpenNav } from './app.actions';
import * as fromRedusers from '../../reducers';

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
  }

  onClick() {
    if (this.visibleNav){
      this.store.dispatch(new CloseNav());
    } else {
      this.store.dispatch(new OpenNav());
    }
  }
}
