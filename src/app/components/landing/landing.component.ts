import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [UploadComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
