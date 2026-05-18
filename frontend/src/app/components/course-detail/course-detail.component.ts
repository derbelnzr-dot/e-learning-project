import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TndCurrencyPipe } from '../../pipes/tnd-currency.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    TndCurrencyPipe
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  course = {
    title: 'Complete Angular Development Course',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 12450,
    duration: '42 hours',
    lectures: 285,
    level: 'All Levels',
    description: 'Master Angular framework from basics to advanced concepts. Build real-world applications with hands-on projects, learn reactive patterns, state management, and modern frontend architecture.',
    price: 279,
    image: 'assets/course-angular.jpg',
    category: 'Development',
    chapters: [
      { title: 'Introduction to Angular', duration: '2h 15m', lectures: 8, free: true },
      { title: 'TypeScript Fundamentals', duration: '3h 30m', lectures: 12, free: true },
      { title: 'Components & Directives', duration: '4h 45m', lectures: 18, free: false },
      { title: 'Services & Dependency Injection', duration: '3h 20m', lectures: 14, free: false },
      { title: 'Routing & Navigation', duration: '4h 10m', lectures: 16, free: false },
      { title: 'Forms & Validation', duration: '5h 00m', lectures: 20, free: false },
      { title: 'RxJS & State Management', duration: '6h 30m', lectures: 22, free: false },
      { title: 'Testing Angular Applications', duration: '4h 00m', lectures: 15, free: false },
      { title: 'Deployment & Production', duration: '2h 30m', lectures: 10, free: false },
      { title: 'Capstone Project', duration: '6h 00m', lectures: 25, free: false }
    ]
  };

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  get totalDuration(): string {
    const total = this.course.chapters.reduce((acc, ch) => {
      const h = parseInt(ch.duration.split('h')[0]);
      const m = parseInt(ch.duration.split('h ')[1]?.replace('m', '') || '0');
      return acc + h * 60 + m;
    }, 0);
    const hrs = Math.floor(total / 60);
    const mins = total % 60;
    return `${hrs}h ${mins > 0 ? mins + 'm' : ''}`;
  }

  get totalLectures(): number {
    return this.course.chapters.reduce((acc, ch) => acc + ch.lectures, 0);
  }
}
