import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "jt-deletion-confirmation",
  templateUrl: "./deletion-confirmation.component.html",
  styleUrls: ["./deletion-confirmation.component.css"],
})
export class DeletionConfirmationComponent implements OnInit {
  title: string;
  object: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { object: string; title: string },
  ) {
    this.object = data.object;
    this.title = data.title;
  }

  ngOnInit() {}
}
