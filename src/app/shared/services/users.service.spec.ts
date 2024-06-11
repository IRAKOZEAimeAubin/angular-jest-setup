import { UserInterface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let utilsService: UtilsService;
  const utilsServiceMock = {
    pluck: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, UtilsService],
      // providers: [
      //   UsersService,
      //   {
      //     provide: UtilsService,
      //     useValue: utilsServiceMock,
      //   },
      // ],
    });

    usersService = TestBed.inject(UsersService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('creates a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInterface = {
        id: '007',
        name: 'fooBar',
      };
      usersService.addUser(user);
      expect(usersService.users).toEqual([
        {
          id: '007',
          name: 'fooBar',
        },
      ]);
    });
  });

  describe('addUserToo', () => {
    it('should add a user', () => {
      const user: UserInterface = {
        id: '007',
        name: 'fooBar',
      };
      usersService.addUserToo(user);
      expect(usersService.users$.getValue()).toEqual([
        {
          id: '007',
          name: 'fooBar',
        },
      ]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users$.next([
        {
          id: '007',
          name: 'baz',
        },
      ]);
      usersService.removeUserToo('007');
      expect(usersService.users$.getValue()).toEqual([]);
    });
  });

  describe('removeUserToo', () => {
    it('should remove a user', () => {
      usersService.users = [
        {
          id: '007',
          name: 'baz',
        },
      ];
      usersService.removeUser('007');
      expect(usersService.users).toEqual([]);
    });
  });

  describe('getUserNames', () => {
    it('should get usernames', () => {
      jest.spyOn(utilsService, 'pluck');
      usersService.users = [
        {
          id: '007',
          name: 'baz',
        },
      ];
      usersService.getUserNames();
      expect(utilsService.pluck).toHaveBeenCalledWith(
        usersService.users,
        'name'
      );
      // utilsServiceMock.pluck.mockReturnValue(['foo']);
      // expect(usersService.getUserNames()).toEqual(['foo']);
    });
  });
});
