import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    DragDropModule
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
    DragDropModule
  ]
})
export class MaterialModule { }
