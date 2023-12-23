import { NgModule } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatListModule,
    DragDropModule,
    MatRippleModule,
    MatChipsModule,
    MatRadioModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatListModule,
    DragDropModule,
    MatRippleModule,
    MatChipsModule,
    MatRadioModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
})
export class MaterialModule {}
