import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "jt-text-copy",
  templateUrl: "./text-copy.component.html",
  styleUrls: ["./text-copy.component.css"],
})
export class TextCopyComponent implements OnInit {
  link: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogReference: MatDialogRef<TextCopyComponent>,
    private sBar: MatSnackBar,
  ) {
    this.link = data.link;
  }

  copy(link): void {
    link.select();
    document.execCommand("copy");
    this.dialogReference.close();
    this.sBar.open("copied", "ok!", {
      duration: 2000,
      panelClass: "saved-notify",
    });
  }

  ngOnInit() {}
}
