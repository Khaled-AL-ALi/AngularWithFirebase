import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { CoursesResolver } from './service/courses.resolver';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const adminOnly = () => hasCustomClaim("admin")

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGardPipe: adminOnly
    }

  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGardPipe: adminOnly
    }

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent,
    resolve: {
      course: CoursesResolver
    },
    canActivate: [AngularFireAuthGuard],
    data: {
      authGardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
