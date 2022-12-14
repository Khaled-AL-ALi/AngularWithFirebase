import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CoursesService } from '../service/courses.service';
import { userService } from '../service/user.sercice';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;

  beginnersCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private router: Router, private CoursesService: CoursesService, public user: userService) {

  }

  ngOnInit() {
    this.reloadCourses()
  }

  reloadCourses() {
    this.beginnersCourses$ = this.CoursesService.loadCourcesByCategory("BEGINNER");
    this.advancedCourses$ = this.CoursesService.loadCourcesByCategory("ADVANCED");
  }


}
