import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserRoles } from "../model/user-roles";

@Injectable({
    providedIn: "root"
})
export class userService {
    isLogIn: Observable<boolean>;
    islogedOut: Observable<boolean>;
    roles: Observable<UserRoles>

    constructor(private fauth: AngularFireAuth, private router: Router) {
        // fauth.idToken.subscribe(jwt => console.log("jwt", jwt))
        // fauth.authState.subscribe(auth => console.log("auth", auth))
        this.isLogIn = fauth.authState.pipe(map(user => !!user));
        this.islogedOut = this.isLogIn.pipe(map(isLogIn => !!isLogIn));
        this.roles = this.fauth.idTokenResult
            .pipe(
                map(token => <any>token?.claims ?? { admin: false })
            )
    }

    logout() {
        this.fauth.signOut()
        this.router.navigateByUrl('/login')
    }


}