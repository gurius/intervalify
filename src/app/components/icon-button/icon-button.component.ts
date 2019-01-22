import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jt-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  @Output() click = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.click.emit();
  }

}
