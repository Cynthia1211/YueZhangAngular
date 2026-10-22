import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material-ui.module';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Projects } from '../classes/projects';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,MaterialModule, FormsModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit{
  private firestore: Firestore = inject(Firestore);

  myProjects: Projects[] = [];

  ngOnInit() {
    const projectsCol = collection(this.firestore, 'projectOpenhouse');
    
    // const q = query(projectsCol, orderBy('id'));

    onSnapshot(projectsCol, (snapshot: any) => {
      this.myProjects = snapshot.docs.map((doc: any) => {
        const data = doc.data() as Projects;
        return {
          ...data,
          id: data.id || doc.id  // 优先使用字段里的 id，没有就用文档自带 ID
        };
      });
    }, (error: any) => {
      console.error('failed to load projects:', error);
    });
  }
}
