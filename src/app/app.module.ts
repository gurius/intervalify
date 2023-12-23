import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { AppComponent } from "./pages/app/app.component";
import { reducers, metaReducers } from "./root-reducer";
import { environment } from "../environments/environment";
import { PresetEditorComponent } from "./pages/preset-editor/preset-editor.component";
import { HomeComponent } from "./pages/home/home.component";
import { EffectsModule } from "@ngrx/effects";
import { PresetEditorEffects } from "./pages/preset-editor/preset-editor.effects";
import { ExerciseEditorComponent } from "./components/exercise-editor/exercise-editor.component";
import { ExerciseEditorEffects } from "./components/exercise-editor/exercise-editor.effects";
import { CountdownComponent } from "./components/countdown/countdown.component";
import { CountdownEffects } from "./components/countdown/countdown.effects";
import { AutofocusInputDirective } from "./directives/autofocus-input.directive";
import { StepperComponent } from "./pages/stepper/stepper.component";
import { PresetsListComponent } from "./components/presets-list/presets-list.component";
import { BottomSheetMenuComponent } from "./components/bottom-sheet-menu/bottom-sheet-menu.component";
import { RepeatsIconComponent } from "./components/repeats-icon/repeats-icon.component";
import { RepeatWithPresetIconComponent } from "./components/repeat-with-preset-icon/repeat-with-preset-icon.component";
import { PresetRepeatsIconComponent } from "./components/preset-repeats-icon/preset-repeats-icon.component";
import { SpaceTriggerDirective } from "./directives/space-trigger.directive";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TextCopyComponent } from "./components/text-copy/text-copy.component";
import { ExportComponent } from "./pages/export/export.component";
import { InfoComponent } from "./pages/info/info.component";
import { HttpClientModule } from "@angular/common/http";
import { DeletionConfirmationComponent } from "./components/deletion-confirmation/deletion-confirmation.component";

@NgModule({
  declarations: [
    AppComponent,
    PresetEditorComponent,
    HomeComponent,
    ExerciseEditorComponent,
    CountdownComponent,
    AutofocusInputDirective,
    StepperComponent,
    PresetsListComponent,
    BottomSheetMenuComponent,
    RepeatsIconComponent,
    RepeatWithPresetIconComponent,
    PresetRepeatsIconComponent,
    SpaceTriggerDirective,
    TextCopyComponent,
    ExportComponent,
    InfoComponent,
    DeletionConfirmationComponent,
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
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forRoot([
      PresetEditorEffects,
      ExerciseEditorEffects,
      CountdownEffects,
    ]),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
