import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'jt-bottom-sheet-menu',
  templateUrl: './bottom-sheet-menu.component.html',
  styleUrls: ['./bottom-sheet-menu.component.css']
})
export class BottomSheetMenuComponent implements OnInit {

  constructor(private menuRef: MatBottomSheetRef<BottomSheetMenuComponent>) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.menuRef.dismiss();
  }

}
