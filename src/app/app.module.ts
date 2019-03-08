import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserAnimationsModule }
  from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './pages/app/app.component';
import { reducers, metaReducers } from './root-reducer';
import { environment } from '../environments/environment';
import { IconButtonComponent }
  from './components/icon-button/icon-button.component';
import { PresetEditorComponent }
  from './pages/preset-editor/preset-editor.component';
import { HomeComponent } from './pages/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { PresetEditorEffects }
  from './pages/preset-editor/preset-editor.effects';
import { ExerciseEditorComponent }
  from './components/exercise-editor/exercise-editor.component';
import { ExerciseEditorEffects }
  from './components/exercise-editor/exercise-editor.effects';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CountdownEffects } from './components/countdown/countdown.effects';
import { AutofocusInputDirective } from './directives/autofocus-input.directive';
import { StepperComponent } from './pages/stepper/stepper.component';
import { PresetsListComponent } from './components/presets-list/presets-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    PresetEditorComponent,
    HomeComponent,
    ExerciseEditorComponent,
    CountdownComponent,
    AutofocusInputDirective,
    StepperComponent,
    PresetsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 10 })
      : [],
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    EffectsModule.forRoot([
      PresetEditorEffects,
      ExerciseEditorEffects,
      CountdownEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExerciseEditorComponent]
})
export class AppModule { }
