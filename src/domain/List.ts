export class List {
  protected _props: list;

  constructor(props: list) {
    this._props = props;
  }

  static create(name: string) {
    return new this({ name, tasks: [] });
  }

  addTask(name: string) {
    this._props.tasks.push({ name, done: false });
  }

  deleteTask(index: number) {
    this._props.tasks.splice(index, 1);
  }

  doneTask(index: number) {
    this._props.tasks[index].done = !this._props.tasks[index].done;
  }

  updateTaskName(index: number, name: string) {
    this._props.tasks[index].name = name;
  }

  get name() {
    return this._props.name;
  }
  get tasks() {
    return this._props.tasks;
  }
}

export type list = {
  name: string;
  tasks: Task[];
};

type Task = {
  name: string;
  done: boolean;
};
