import { Component, OnInit, Input } from "@angular/core";

import { Preset } from "src/app/models/preset.model";
import { PresetService } from "src/app/helpers/preset.service";
import { Router } from "@angular/router";
import { DeletionConfirmationComponent } from "../deletion-confirmation/deletion-confirmation.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "jt-presets-list",
  templateUrl: "./presets-list.component.html",
  styleUrls: ["./presets-list.component.css"],
})
export class PresetsListComponent implements OnInit {
  @Input() presets: Preset[];

  newPreset: Preset;

  addPreset() {
    this.newPreset = this.pHelper.getBlank();
    this.pHelper.addPreset(this.newPreset);
    this.router.navigate(["/constructor"], {
      queryParams: { pId: this.newPreset.id },
    });
  }

  deletePreset(preset) {
    const dref = this.dialog.open(DeletionConfirmationComponent, {
      autoFocus: false,
      data: {
        object: "preset",
        title: preset.title,
      },
    });

    const drefSubs = dref.afterClosed().subscribe((data) => {
      if (!data) return;

      this.pHelper.deletePreset(preset);
      drefSubs.unsubscribe();
    });
  }

  onSwipeLeft(pId, event) {
    this.router.navigate(["/stepper"], { queryParams: { pId } });
  }

  onSwipeRight(pId, event) {
    this.router.navigate(["/constructor"], { queryParams: { pId } });
  }

  ngOnInit() {}
  constructor(
    private pHelper: PresetService,
    private router: Router,
    private dialog: MatDialog,
  ) {}
}
