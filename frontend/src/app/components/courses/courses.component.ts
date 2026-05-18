import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TndCurrencyPipe } from '../../pipes/tnd-currency.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TndCurrencyPipe
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  searchQuery = '';
  selectedCategory = 'All';
  selectedLevel = 'All';
  selectedSort = 'popular';

  categories = ['All', 'Development', 'Data Science', 'Security', 'Design', 'Business', 'Marketing'];
  levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  allCourses = [
    { title: 'Complete Angular Masterclass', instructor: 'Sarah Johnson', rating: 4.8, students: 12450, price: 279, level: 'All Levels', category: 'Development', duration: '42h' },
    { title: 'Python for Data Science', instructor: 'Mike Chen', rating: 4.7, students: 8750, price: 232, level: 'Beginner', category: 'Data Science', duration: '36h' },
    { title: 'Ethical Hacking Essentials', instructor: 'Alex Rivera', rating: 4.9, students: 6320, price: 310, level: 'Intermediate', category: 'Security', duration: '28h' },
    { title: 'React & Next.js Bootcamp', instructor: 'Emily Park', rating: 4.6, students: 15400, price: 263, level: 'All Levels', category: 'Development', duration: '48h' },
    { title: 'UI/UX Design Fundamentals', instructor: 'David Kim', rating: 4.5, students: 4200, price: 170, level: 'Beginner', category: 'Design', duration: '24h' },
    { title: 'Machine Learning A-Z', instructor: 'Dr. Lisa Wang', rating: 4.8, students: 9800, price: 341, level: 'Advanced', category: 'Data Science', duration: '52h' },
    { title: 'AWS Cloud Practitioner', instructor: 'James Brown', rating: 4.7, students: 7600, price: 248, level: 'Beginner', category: 'Development', duration: '20h' },
    { title: 'Digital Marketing 101', instructor: 'Sophie Turner', rating: 4.4, students: 5100, price: 139, level: 'All Levels', category: 'Marketing', duration: '18h' },
    { title: 'Business Strategy & Management', instructor: 'Robert Chen', rating: 4.6, students: 3800, price: 201, level: 'Intermediate', category: 'Business', duration: '30h' },
    { title: 'Flutter Mobile Development', instructor: 'Anna Kowalski', rating: 4.7, students: 6900, price: 217, level: 'Intermediate', category: 'Development', duration: '34h' },
    { title: 'Photoshop Masterclass', instructor: 'Maria Santos', rating: 4.5, students: 4500, price: 155, level: 'Beginner', category: 'Design', duration: '22h' },
    { title: 'Node.js Backend Development', instructor: 'Tom Wilson', rating: 4.8, students: 8200, price: 248, level: 'Advanced', category: 'Development', duration: '38h' }
  ];

  get filteredCourses() {
    let filtered = [...this.allCourses];

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(c => c.category === this.selectedCategory);
    }

    if (this.selectedLevel !== 'All') {
      filtered = filtered.filter(c => c.level === this.selectedLevel);
    }

    switch (this.selectedSort) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        break;
    }

    return filtered;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
