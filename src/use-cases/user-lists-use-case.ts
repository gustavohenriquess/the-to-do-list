import { User } from "../domain/User";

export class UserListsUseCase {
  static execute(userId: string) {
    const user = User.selectUser(userId);
    if (!user) throw new Error("User not found");

    return user.lists;
  }
}
