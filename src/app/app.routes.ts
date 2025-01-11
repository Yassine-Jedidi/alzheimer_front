import { Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { ResultComponent } from './components/result/result.component';
import { LandingComponent } from './components/landing/landing.component';
import { AlzheimerDetectionComponent } from './components/alzheimer-detection/alzheimer-detection.component';

export const routes: Routes = [
    { path: '', component: AlzheimerDetectionComponent },
    { path: 'result', component: ResultComponent },
    { path: '**', redirectTo: '' }
];
