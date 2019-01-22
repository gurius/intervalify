import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
