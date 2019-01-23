import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresetEditorComponent } from './pages/preset-editor/preset-editor.component';
import { HomeComponent } from './pages/home/home.component';

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
