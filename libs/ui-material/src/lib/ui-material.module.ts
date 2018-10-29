import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';

import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  exports: [MatProgressSpinnerModule, MatProgressBarModule, BidiModule]
})
export class UiMaterialModule {}
