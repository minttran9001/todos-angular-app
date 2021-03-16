import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filter.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    {
      type: Filter.All,
      label: 'All',
      isActive: true,
    },
    {
      type: Filter.Active,
      label: 'Active',
      isActive: false,
    },
    {
      type: Filter.Completed,
      label: 'Completed',
      isActive: false,
    },
  ];
  length = 0;
  hasComplete$: Observable<boolean> = new Observable<boolean>();
  destroy$: Subject<null> = new Subject<null>();
  constructor(private _todoService: TodoService) {}

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this._todoService.filterTodos(type)
  }
  clearCompleted(){
    this._todoService.clearCompleted()
  }
  private setActiveFilterBtn(type: Filter) {
    this.filterButtons.map((btn) => {
      btn.isActive = btn.type === type;
    });
  }
  ngOnInit(): void {
    this.hasComplete$ = this._todoService.todos$.pipe(
      map((todos) => todos.some((t) => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this._todoService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length) => {
        this.length = length;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
