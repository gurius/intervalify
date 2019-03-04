import { Component, OnInit } from '@angular/core';
import { PresetService } from 'src/app/helpers/preset.service';
import { Observable } from 'rxjs';
import { Preset } from 'src/app/models/preset.model';

@Component({
  selector: 'jt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  presets: Observable<Preset[]>;


  ngOnInit() {
    this.presets = this.pHelper.getAllPresets();
  }

  constructor(private pHelper: PresetService) { }

}
