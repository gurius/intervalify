import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { PresetService } from "src/app/helpers/preset.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "jt-bottom-sheet-menu",
  templateUrl: "./bottom-sheet-menu.component.html",
  styleUrls: ["./bottom-sheet-menu.component.css"],
})
export class BottomSheetMenuComponent implements OnInit, OnDestroy {
  constructor(
    private menuRef: MatBottomSheetRef<BottomSheetMenuComponent>,
    private pHelper: PresetService,
    private router: Router,
  ) {}

  ngOnInit() {}
  ngOnDestroy(): void {}
  addPreset(): void {
    this.menuRef.dismiss();
    const newPreset = this.pHelper.getBlank();
    this.pHelper.addPreset(newPreset);
    this.router.navigate(["/constructor"], {
      queryParams: { pId: newPreset.id },
    });
  }

  openLink(): void {
    this.menuRef.dismiss();
  }
}
