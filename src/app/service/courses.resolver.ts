import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { CoursesService } from "./courses.service";

@Injectable({
    providedIn: 'root'
})
export class CoursesResolver implements Resolve<Course> {

    constructor(private CoursesService: CoursesService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        const coursUrl = route.paramMap.get("courseUrl");
        return this.CoursesService.findCourseByUrl(coursUrl)

    }

}