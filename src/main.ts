import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { PacienteApiService } from './app/features/pacientes/infrastructure/services/paciente-api.service';
import { PACIENTE_REPOSITORY } from './app/features/pacientes/infrastructure/tokens/paciente-injection.token';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: PACIENTE_REPOSITORY, useClass: PacienteApiService },
    PacienteApiService,
  ]
});
