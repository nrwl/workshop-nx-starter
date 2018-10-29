import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';

import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatToolbarModule,
    BidiModule
  ]
})
export class UiMaterialModule {}
