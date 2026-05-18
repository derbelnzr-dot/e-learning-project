import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { label: 'Enrolled Courses', value: 6, icon: 'menu_book', color: '#6366f1' },
    { label: 'Completed', value: 3, icon: 'check_circle', color: '#10b981' },
    { label: 'Hours Learned', value: '128', icon: 'schedule', color: '#f59e0b' },
    { label: 'Certificates', value: 2, icon: 'verified', color: '#8b5cf6' }
  ];

  enrolledCourses = [
    { title: 'Complete Angular Masterclass', instructor: 'Sarah Johnson', progress: 78, rating: 4.8, category: 'Development' },
    { title: 'Python for Data Science', instructor: 'Mike Chen', progress: 45, rating: 4.7, category: 'Data Science' },
    { title: 'Ethical Hacking Essentials', instructor: 'Alex Rivera', progress: 92, rating: 4.9, category: 'Security' },
    { title: 'UI/UX Design Fundamentals', instructor: 'David Kim', progress: 15, rating: 4.5, category: 'Design' },
    { title: 'AWS Cloud Practitioner', instructor: 'James Brown', progress: 60, rating: 4.7, category: 'Development' },
    { title: 'React & Next.js Bootcamp', instructor: 'Emily Park', progress: 33, rating: 4.6, category: 'Development' }
  ];

  overallProgress = Math.round(
    this.enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / this.enrolledCourses.length
  );

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  }
}
