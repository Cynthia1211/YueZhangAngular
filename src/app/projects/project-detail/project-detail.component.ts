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
  loadError = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const docRef = doc(this.firestore, 'projectOpenHouse', `${id}`);

      onSnapshot(docRef, (snapshot: any) => {
        if (snapshot.exists()) {
          this.project = snapshot.data();
        } else {
          this.loadError = true;
          console.error(`Project document '${id}' was not found in 'projectOpenHouse'.`);
        }
      }, (error: any) => {
        this.loadError = true;
        console.error('Failed to load project detail from projectOpenHouse:', error);
      });
    } else {
      this.loadError = true;
    }
  }
}
