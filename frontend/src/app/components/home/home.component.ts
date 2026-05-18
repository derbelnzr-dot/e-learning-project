import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TndCurrencyPipe } from '../../pipes/tnd-currency.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TndCurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('demoVideo') demoVideoEl!: ElementRef<HTMLElement>;

  categories = [
    { name: 'Web Development', icon: 'code', color: '#6366f1', count: 24 },
    { name: 'Data Science', icon: 'analytics', color: '#f59e0b', count: 18 },
    { name: 'Cyber Security', icon: 'security', color: '#ef4444', count: 12 },
    { name: 'Mobile Apps', icon: 'smartphone', color: '#10b981', count: 15 },
    { name: 'Design', icon: 'palette', color: '#ec4899', count: 20 },
    { name: 'Business', icon: 'business_center', color: '#8b5cf6', count: 16 }
  ];

  courses = [
    { title: 'Complete Angular Masterclass', instructor: 'Sarah Johnson', rating: 4.8, students: 12450, price: 279, level: 'All Levels', category: 'Development' },
    { title: 'Python for Data Science', instructor: 'Mike Chen', rating: 4.7, students: 8750, price: 232, level: 'Beginner', category: 'Data Science' },
    { title: 'Ethical Hacking Essentials', instructor: 'Alex Rivera', rating: 4.9, students: 6320, price: 310, level: 'Intermediate', category: 'Security' },
    { title: 'React & Next.js Bootcamp', instructor: 'Emily Park', rating: 4.6, students: 15400, price: 263, level: 'All Levels', category: 'Development' },
    { title: 'UI/UX Design Fundamentals', instructor: 'David Kim', rating: 4.5, students: 4200, price: 170, level: 'Beginner', category: 'Design' },
    { title: 'Machine Learning A-Z', instructor: 'Dr. Lisa Wang', rating: 4.8, students: 9800, price: 341, level: 'Advanced', category: 'Data Science' }
  ];

  testimonials = [
    { name: 'James Wilson', role: 'Software Developer', text: 'This platform completely changed my career. The courses are well-structured and the instructors are top-notch.', avatar: 'JW', rating: 5 },
    { name: 'Maria Garcia', role: 'Data Analyst', text: 'I learned more in 3 months than I did in a year of self-study. The hands-on projects made all the difference.', avatar: 'MG', rating: 5 },
    { name: 'Ahmed Hassan', role: 'Student', text: 'Affordable, high-quality education. The cyber security course helped me land my first job in tech.', avatar: 'AH', rating: 5 }
  ];

  heroStats = [
    { value: '50K+', label: 'Active Students' },
    { value: '200+', label: 'Expert Courses' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '30+', label: 'Expert Instructors' }
  ];

  videoStats = [
    { value: '200+', label: 'Courses', icon: 'menu_book', color: '#6366f1' },
    { value: '50K+', label: 'Students', icon: 'people', color: '#10b981' },
    { value: '30+', label: 'Instructors', icon: 'person', color: '#f59e0b' },
    { value: '15K+', label: 'Certificates', icon: 'verified', color: '#ec4899' }
  ];

  scrollToVideo(): void {
    if (this.demoVideoEl) {
      this.demoVideoEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
