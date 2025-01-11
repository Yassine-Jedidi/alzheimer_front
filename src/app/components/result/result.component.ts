import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: `
    <div class="result-container">
      <h2>Prediction Result</h2>
      <p>{{ final_result}}</p>
      <p>confidence : {{ result["res4"] }}</p>
      <button (click)="goBack()">Go Back</button>
    </div>
  `,
  styles: [`
    .result-container {
      text-align: center;
    }
    h2 {
      color: #333;
    }
    p {
      font-size: 18px;
      margin: 20px 0;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ResultComponent {
  result: any = '';
  final_result: any = '';

  constructor(private router: Router,private predictionService: PredictionService) {}

  ngOnInit() {
    this.result=this.predictionService.getResult();
    if (this.result["res3"] == "control"){
      this.final_result = "The patient is not suffering from Alzheimer's Disease";  
      
    }else{
      this.final_result = "The patient is suffering from Alzheimer's Disease";
    }
    console.log(this.result);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
