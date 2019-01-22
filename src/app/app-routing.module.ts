import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresetEditorComponent } from './containers/preset-editor/preset-editor.component';
import { HomeComponent } from './containers/home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'constructor', component: PresetEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
