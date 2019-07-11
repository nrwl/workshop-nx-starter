import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@tuskdesk-suite/client/reporting/feature').then(
              module => module.ClientReportingFeatureModule
            ),
          pathMatch: 'full'
        }
      ],
      { initialNavigation: 'enabled' }
    )
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
