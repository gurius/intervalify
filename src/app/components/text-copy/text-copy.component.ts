import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'jt-text-copy',
  templateUrl: './text-copy.component.html',
  styleUrls: ['./text-copy.component.css']
})
export class TextCopyComponent implements OnInit {
  link: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.link = data.link;
  }

  copy(link): void {
    link.select();
    document.execCommand("copy");
  }

  ngOnInit() {
  }

}
