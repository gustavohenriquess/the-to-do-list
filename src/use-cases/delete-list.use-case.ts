import { hasList, User } from "../domain/User";

export class DeleteListUseCase {
  static execute(userId: string, listId: number) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("Account not found");
    if (!hasList(userId, listId)) throw new Error("List not found");
    user.deleteList(listId);
    return;
  }
}
