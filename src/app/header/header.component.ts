import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonGetService } from '../services/json-get.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [JsonGetService]
})
export class HeaderComponent {

  constructor(private http: HttpClient) {}
    
      profileData:any

      ngOnInit() {
        this.http.get('http://13.59.131.70:8080/api/profile').subscribe(data => {
            this.profileData = data; // 把 API 返回的数据赋值给你的变量
          });
      }
  
}
