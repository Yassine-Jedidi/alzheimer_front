import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  result: any = '';
  final_result: any = '';

  constructor(private router: Router, private predictionService: PredictionService) {}

  ngOnInit() {
    this.result = this.predictionService.getResult();
    if (this.result["res3"] == "control") {
      this.final_result = "The patient is not suffering from Alzheimer's Disease";
    } else {
      this.final_result = "The patient is suffering from Alzheimer's Disease";
    }
    this.result["res4"] = (parseFloat(this.result["res4"]) * 100).toFixed(2);
    console.log(this.result);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
