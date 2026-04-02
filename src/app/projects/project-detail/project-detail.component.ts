import { Component, inject, OnInit } from '@angular/core';
import {MaterialModule} from '../../modules/material-ui.module';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  
  project: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const docRef = doc(this.firestore, 'projects', `${id}`);

      onSnapshot(docRef, (snapshot: any) => {
        if (snapshot.exists()) {
          this.project = snapshot.data();
        }
      });
    }
  }
}