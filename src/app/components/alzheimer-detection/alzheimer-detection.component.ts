import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alzheimer-detection',
  standalone: true, // This marks the component as standalone
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './alzheimer-detection.component.html',
  styleUrls: ['./alzheimer-detection.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class AlzheimerDetectionComponent implements OnInit, OnDestroy {
  currentStep: number = 0;
  isRecording: boolean = false;
  audioUrl: string | null = null;
  analysisComplete: boolean = false;
  analysisResult: number | null = null;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];

  steps = ['Introduction', 'Recording', 'Analysis', 'Results'];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }

  startRecording(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.audioChunks = [];
        };
        this.mediaRecorder.start();
        this.isRecording = true;
      })
      .catch((error) => console.error('Error accessing microphone:', error));
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  analyzeAudio(): void {
    // Simulate analysis process
    this.currentStep = 2;
    setTimeout(() => {
      this.analysisComplete = true;
      this.analysisResult = Math.random() * 100; // Random result for demonstration
      this.currentStep = 3;
    }, 3000);
  }

  resetApplication(): void {
    this.currentStep = 0;
    this.isRecording = false;
    this.audioUrl = null;
    this.analysisComplete = false;
    this.analysisResult = null;
  }
}
