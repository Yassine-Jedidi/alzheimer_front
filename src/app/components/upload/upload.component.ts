import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';
import { AudioRecordingService } from '../../service/audio-recording.service';

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
    .recording-controls {
      display: flex;
      gap: 10px;
      align-items: center;
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
    audio {
      margin-top: 10px;
    }
  `]
})
export class UploadComponent {
  selectedFile: File | null = null;
  isRecording: boolean = false;
  audioUrl: string | null = null;
  recordedBlob: Blob | null = null;

  constructor(
    private router: Router, 
    private predictionService: PredictionService,
    private audioRecordingService: AudioRecordingService  
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.audioUrl = URL.createObjectURL(this.selectedFile);
      this.recordedBlob = null;
    }
  }

  async startRecording() {
    this.isRecording = true;
    await this.audioRecordingService.startRecording();
  }

  async stopRecording() {
    this.isRecording = false;
    this.recordedBlob = await this.audioRecordingService.stopRecording();
    this.audioUrl = URL.createObjectURL(this.recordedBlob);
    this.selectedFile = null;
  }

  predict() {
    const audioData = this.selectedFile || this.recordedBlob;
    if (audioData) {
      this.predictionService.sendData(audioData).subscribe(result => {
        console.log(result);
        this.predictionService.storeResult(result);
        this.router.navigate(['/result'], { state: { result } });
      });
    }
  }

  get canPredict(): boolean {
    return !!(this.selectedFile || this.recordedBlob) && !this.isRecording;
  }

}
