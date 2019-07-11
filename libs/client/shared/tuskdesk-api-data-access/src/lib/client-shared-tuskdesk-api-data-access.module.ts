import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './company.service';
import { UserService } from './user.service';
import { TicketService } from './ticket.service';
import { ApiConfig } from './api-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [CompanyService, TicketService, UserService]
})
export class ClientSharedTuskdeskApiDataAccessModule {
  static forRoot(rootUrl: string = ''): ModuleWithProviders {
    return {
      ngModule: ClientSharedTuskdeskApiDataAccessModule,
      providers: [{ provide: ApiConfig, useValue: { rootUrl } }]
    };
  }
}
