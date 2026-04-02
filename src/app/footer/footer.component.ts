import { Component } from '@angular/core';
import { JsonGetService } from '../services/json-get.service';
import { Technologies } from '../classes/technologies';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [JsonGetService]
})
export class FooterComponent {

    constructor(private footer: JsonGetService){}
  
    jsonData:any
    url = '/data/portfolioData.json'
    usedTechnologies:Technologies[] = [];
  
    ngOnInit() { 
      this.footer.getDataFromUrl(this.url).subscribe((data:any) => {
        this.jsonData = data;
        this.usedTechnologies = this.jsonData.technologies;
      });
    }

}
