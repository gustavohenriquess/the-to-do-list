import { List } from "../domain/List";
import { User } from "../domain/User";

export class CreateListUseCase {
  static execute(userId: string, name: string) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("User not found");
    const list = List.create(name);

    user.addList(list);

    return;
  }
}
