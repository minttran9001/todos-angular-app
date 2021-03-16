import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filter.model';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';
  private todos: Todo[] = [];
  private filteredTodos: Todo[] = [];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private _storageService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.todos =
      this._storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodos = [...this.todos.map((item) => ({ ...item }))];
    this.updateTodoData();
  }
  toggleTodoStatus(id: number, isCompleted: boolean) {
    const index = this.todos.findIndex((item) => item.id === id);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }
  updateToLocalStorage() {
    this._storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodoData();
  }
  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter((item) => !item.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter((item) => item.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos = this.todos;
        break;
    }
    if (isFiltering) {
      this.updateTodoData();
    }
  }
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.isCompleted);
    this.updateToLocalStorage();
  }
  addTodo(content: string) {
    const date = new Date(Date.now()).getTime();
    const todo = new Todo(date, content);
    this.todos.unshift(todo);
    this.updateToLocalStorage();
  }
  editTodoContent(id: number, content: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const editedTodo = this.todos[index];
    editedTodo.content = content;
    this.todos.splice(index, 1, editedTodo);
    this.updateToLocalStorage();
  }
  removeTodo(id:number){
    const index = this.todos.findIndex((todo)=> todo.id===id)
    this.todos.splice(index,1);
    this.updateToLocalStorage();
  }
  private updateTodoData() {
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
