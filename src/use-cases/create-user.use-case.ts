import { User } from "../domain/User";

export class CreateUserUseCase {
  static execute(name: string) {
    const user = User.create(name);

    return user.id;
  }
}
