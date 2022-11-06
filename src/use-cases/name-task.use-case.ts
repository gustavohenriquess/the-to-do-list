import { User } from "../domain/User";

export class NameTaskUseCase {
  static execute(userId: string, listId: number, taskId: number, name: string) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("User not found");

    const list = user.getList(listId);
    if (!list) throw new Error("List not found");

    list.updateTaskName(taskId, name);
  }
}
