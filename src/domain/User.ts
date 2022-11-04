import { randomUUID } from "crypto";
import { List } from "./List";

const users: Map<string, user> = new Map();

export class User {
  protected _user: user;
  protected readonly _id: string;

  constructor(_user: user, _id?: string) {
    this._user = _user;
    this._id = _id || this.generateId();

    users.set(this._id, _user);
  }
  static create(name: string, id?: string) {
    return new this({ name, lists: [] }, id);
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
    // const id = randomUUID().slice(-4);
    const id = randomUUID();
    while (hasUser(id)) {
      this.generateId();
    }

    return id;
  }

  addList(list: List) {
    this._user.lists.push(list);
  }

  getList(index: number) {
    return this._user.lists[index];
  }

  deleteList(index: number) {
    this._user.lists.splice(index, 1);
  }
}

type user = {
  name: string;
  lists: List[];
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
