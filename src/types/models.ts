export class Task {
  static _id: number = Math.floor(Math.random() * 500) + 1;
  title: string;
  isCompleted: boolean;
  id: number;
  deleted: boolean;

  constructor(title: string) {
    this.title = title;
    this.isCompleted = false;
    this.id = Task._id++;
    this.deleted = false;
  }
}
