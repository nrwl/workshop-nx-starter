import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LogService } from './log.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [LogService]
})
export class LogsBackendModule {}
