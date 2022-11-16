import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity'

let service: AuthService;
let fakeUsersService : Partial<UsersService>;

describe('AuthService', () => {
    beforeEach(async () => {
        const users: User[] = [
            { email: 'asdf@asdf.com', password: 'asdf' } as User
        ];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers);
            },
            createUser: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 10000), email, password} as User;
                users.push(user);
                return Promise.resolve(user);
            } 
        };
    
        const module = await Test.createTestingModule({
            providers: [AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile();
    
        service = module.get(AuthService);
    })
    it('Can create instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('Check if password is hashed', async () => {
        const user = await service.signup('ab@ab.com', 'asdf');
        expect(user.password).not.toEqual('asdf');

        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    }); 

    it('throws an error if user signs up with email that is in use', async () => {
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
          BadRequestException,
        );
      });

      it('throws if signin is called with an unused email', async () => {
        await expect(
          service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
      });

    //   Need to hash password
    //   it('signin works', async () => {
    //       const user = await service.signin('asdf@asdf.com', 'asdf');
    //       expect(user).toBeDefined();
    //   });  
});
