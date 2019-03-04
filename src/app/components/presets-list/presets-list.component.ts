import { Component, OnInit, Input } from '@angular/core';

import { Preset } from 'src/app/models/preset.model';
import { PresetService } from 'src/app/helpers/preset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jt-presets-list',
  templateUrl: './presets-list.component.html',
  styleUrls: ['./presets-list.component.css']
})
export class PresetsListComponent implements OnInit {
  @Input() presets: Preset[];

  newPreset: Preset;

  addPreset() {
    this.newPreset = this.pHelper.getBlank();
    this.pHelper.addPreset(this.newPreset);
    this.router.navigate(['/constructor'], { queryParams: { pId: this.newPreset.id } });
  }

  deletePreset(preset){
    this.pHelper.deletePreset(preset);
  }
  ngOnInit() { }
  constructor(
    private pHelper: PresetService,
    private router: Router
  ) { }

}
