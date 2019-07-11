import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

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
