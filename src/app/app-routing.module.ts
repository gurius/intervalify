import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresetEditorComponent }
  from './pages/preset-editor/preset-editor.component';
import { HomeComponent } from './pages/home/home.component';
import { StepperComponent } from './pages/stepper/stepper.component';
import { ExportComponent } from './pages/export/export.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, data: { animate: 'home' }
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'stepper', component: StepperComponent, data: { animate: 'stepper' }
  },
  {
    path: 'constructor', component: PresetEditorComponent, data: { animate: 'editor' }
  },
  {
    path: 'export', component: ExportComponent, data: { animate: 'export' }
  },
  {
    path: 'info', component: InfoComponent, data: { animate: 'info' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
