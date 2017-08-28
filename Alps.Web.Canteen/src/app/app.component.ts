import { Component, OnInit } from '@angular/core';
import { UserService} from './user/user.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Hello World app';
    values: any;
    navbarCollapsed: boolean=true ;
    constructor(private userService: UserService) {

    }
    loginStatus: boolean;
    ngOnInit() {
        //var headers: Headers = new Headers();
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json');
        //headers.append('Access-Control-Allow-Origin', '*');

        //const options = new RequestOptions({ headers: headers });
        //this.http.get("/api/values").subscribe(data => { this.values = data.json(); })
        this.userService.loginState.subscribe(d => this.loginStatus=d);
    }
    logout() {
        this.userService.logout();
    }
  
}
