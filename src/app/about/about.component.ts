import { Component, OnInit } from '@angular/core';


import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/firestore';
import { COURSES, findLessonsForCourse } from './db-data';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    constructor(private db: AngularFirestore) {
    }

    async uploadData() {
        const coursesCollection = this.db.collection('courses');
        const courses = await this.db.collection('courses').get();
        for (let course of Object.values(COURSES)) {
            const newCourse = this.removeId(course);
            const courseRef = await coursesCollection.add(newCourse);
            const lessons = await courseRef.collection('lessons');
            const courseLessons = findLessonsForCourse(course['id']);
            console.log(`Uploading course ${course['description']}`);
            for (const lesson of courseLessons) {
                const newLesson = this.removeId(lesson);
                delete newLesson.courseId;
                await lessons.add(newLesson);
            }
        }
    }

    removeId(data: any) {
        const newData: any = { ...data };
        delete newData.id;
        return newData;
    }

    //query to get specifique course from the collection course
    onReadDoc() {
        this.db.doc("/courses/2UIWGR9LUv3xSRWXFR3T").snapshotChanges().subscribe(snap => {
            console.log(snap.payload.id);
            console.log(snap.payload.data());
        });
    }

    //query for all collection depends on 2 conditions (this need to do indexes to run normally )
    onReadcollection() {
        this.db.collection("courses", ref => ref.where("url", "==", "serverless-angular").where("seqNo", "<=", 10)).get().subscribe(snaps => {
            snaps.forEach(snap => {
                console.log(snap.id);
                console.log(snap.data());
            })
        })
    }

    //query to het all the information of collection lessons nested in the collection courses
    onReadcollectionGroup() {
        this.db.collectionGroup("lessons", ref => ref.where("seqNo", "==", 1)).get().subscribe(snaps => {
            snaps.forEach(snap => {
                console.log(snap.id);
                console.log(snap.data());
            })
        })
    }


}
















