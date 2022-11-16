import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    createUser(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user); 
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });

    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({ id });
        if(!user) throw new NotFoundException('User Not Found');
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id });
        if(!user) throw new NotFoundException('User Not Found');
        return this.repo.remove(user);
    }
}
