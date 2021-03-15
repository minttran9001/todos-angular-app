import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasTodos$:Observable<boolean> = new Observable<boolean>();
  constructor(private _todoService : TodoService){

  }
  ngOnInit(){
    this._todoService.fetchFromLocalStorage()
    this.hasTodos$ = this._todoService.length$.pipe(map(length => length > 0))
  }
}
