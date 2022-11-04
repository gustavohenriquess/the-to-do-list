import { User } from "../domain/User";

export class ListTasksUseCase {
  static execute(userId: string, listId: number) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("User not found");

    const list = user.lists[listId];

    return list.tasks;
  }
}
