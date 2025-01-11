import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: "./upload.component.html",
  styles: [`
    .upload-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    input[type="file"] {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private router: Router, private predictionService: PredictionService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  predict() {
    console.log(this.selectedFile);
    if (this.selectedFile) {
      this.predictionService.sendData(this.selectedFile).subscribe(result => {
        console.log(result);
        this.predictionService.storeResult(result);
        this.router.navigate(['/result'], { state: { result } });
      });
    }
  }

}
