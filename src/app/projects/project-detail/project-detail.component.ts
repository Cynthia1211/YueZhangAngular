import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MaterialModule} from '../../modules/material-ui.module';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private router = inject(Router);
  
  project: any = null;
  loadError = false;
  projectIds: string[] = [];
  currentProjectId = '';
  private routeSubscription?: Subscription;
  private unsubscribeProjects?: () => void;
  private unsubscribeProject?: () => void;

  get currentProjectIndex(): number {
    return this.projectIds.indexOf(this.currentProjectId);
  }

  get previousProjectId(): string | null {
    const index = this.currentProjectIndex;
    return index > 0 ? this.projectIds[index - 1] : null;
  }

  get nextProjectId(): string | null {
    const index = this.currentProjectIndex;
    return index >= 0 && index < this.projectIds.length - 1
      ? this.projectIds[index + 1]
      : null;
  }

  ngOnInit() {
    const projectsCol = collection(this.firestore, 'projectOpenHouse');
    this.unsubscribeProjects = onSnapshot(projectsCol, (snapshot: any) => {
      this.projectIds = snapshot.docs.map((projectDoc: any) => projectDoc.id).reverse();
    }, (error: any) => {
      console.error('Failed to load project navigation:', error);
    });

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentProjectId = id ?? '';
      this.project = null;
      this.loadError = false;
      this.unsubscribeProject?.();

      if (!id) {
        this.loadError = true;
        return;
      }

      const docRef = doc(this.firestore, 'projectOpenHouse', id);
      this.unsubscribeProject = onSnapshot(docRef, (snapshot: any) => {
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
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.unsubscribeProjects?.();
    this.unsubscribeProject?.();
  }

  navigateToProject(id: string | null): void {
    if (id) {
      void this.router.navigate(['/projects', id]);
    }
  }
}
