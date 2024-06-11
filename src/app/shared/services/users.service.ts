import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  utilsService = inject(UtilsService);
  users: UserInterface[] = [];
  users$ = new BehaviorSubject<UserInterface[]>([]);

  addUser(user: UserInterface): void {
    this.users = [...this.users, user];
  }

  addUserToo(user: UserInterface): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user) => userId !== user.id);
    this.users = updatedUsers;
  }

  removeUserToo(userId: string): void {
    const updatedUsers = this.users$
      .getValue()
      .filter((user) => userId !== user.id);
    this.users$.next(updatedUsers);
  }

  getUserNames(): string[] {
    return this.utilsService.pluck(this.users, 'name');
  }
}
