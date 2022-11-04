import { User } from "../domain/User";

export class CreateTaskUseCase {
  static execute(userId: string, listId: number, name: string) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("User not found");

    const list = user.getList(listId);
    list.addTask(name);

    return;
  }
}
