import { Component, signal, inject, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
import {
  TASK_STATUS_OPTIONS,
  taskStatusOptionsProvider,
} from '../task.model';

import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  // Task items inherit these options from the list's injector.
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('ALL');
  private taskService: TasksService = inject(TasksService);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  //Derive a value
  // tasks = this.taskService.tasks(); // computed(() => this.taskService.tasks());

  tasks = computed(() => {
    const filter = this.selectedFilter();
    const allTasks = this.taskService.allTasks();

    if (filter === 'ALL') {
      return allTasks;
    }

    console.log(filter);
    console.log(allTasks);

    return allTasks.filter((task) => task.status === filter);
  });

  constructor() {}

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
