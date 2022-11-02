import { randomUUID } from "crypto";
import { List } from "./List";

const users: Map<string, user> = new Map();

export class User {
  protected readonly _user: user;
  protected readonly _id: string;

  constructor(_user: user, _id?: string) {
    this._user = _user;
    this._id = _id || this.generateId();

    users.set(this._id, _user);
  }
  static create(user: user, id?: string) {
    return new this(user, id);
  }

  static selectUser(id: string) {
    const user = users.get(id);
    if (!user) return null;
    return new this(user, id);
  }

  get lists() {
    return this._user.lists || [];
  }
  get id() {
    return this._id;
  }

  private generateId() {
    const id = randomUUID().slice(-4);
    while (hasUser(id)) {
      this.generateId();
    }

    return id;
  }
}

type user = {
  name: string;
  lists?: List[];
};

export function hasUser(userId: string) {
  return users.has(userId);
}

export function hasList(userId: string, listId: number) {
  const user = users.get(userId);
  if (!user) return false;

  if (user && user.lists && user.lists[listId]) return true;

  return false;
}
