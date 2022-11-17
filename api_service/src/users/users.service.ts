import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    createUser(email: string, password: string): Promise<User> {
        return this.prisma.user.create({ data: {
            email,
            password,
            admin: true
        }});
    }

    findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    find(email: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { email }
        })
    }

    async update(id: string, attrs: Prisma.UserUpdateInput) {
        const user = await this.findOne( id );
        if(!user) throw new NotFoundException('User Not Found');
        return this.prisma.user.update(
            { where: { id },
            data: attrs
        })
    }

    async remove(id: string) {
        const user = await this.findOne( id );
        if(!user) throw new NotFoundException('User Not Found');
        return this.prisma.user.delete({ where: { id } });
    }
}
