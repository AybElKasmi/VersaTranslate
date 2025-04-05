import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app/app.component';  // Import AppComponent
import { appConfig } from './app/app.config';  // Import appConfig (if any)

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,  // Ensure HttpClientModule is provided here
    provideHttpClient(),  // Ensure HttpClient is provided for API calls
    ...appConfig.providers,  // If you have any custom providers in appConfig
  ],
}).catch((err) => console.error(err));
