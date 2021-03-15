import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoContent: string = ' ';
  constructor(private _todoService: TodoService) {}

  onSubmit() {
    if (this.todoContent.trim() === '') {
      return ;
    }
    this._todoService.addTodo(this.todoContent);
    this.todoContent = '';
  }
  ngOnInit(): void {}
}
