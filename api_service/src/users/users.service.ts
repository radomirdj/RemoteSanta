import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma, UserRoleEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dtos/user.dto';

export const orgDefaultJoin = {
  country: true,
};

export const userDefaultJoin = {
  org: {
    include: orgDefaultJoin,
  },
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUserTransactional(tx, data: Prisma.UserCreateInput): Promise<User> {
    return tx.user.create({
      data,
    });
  }

  setCognitoSubTransactional(tx, id: string, cognitoSub): Promise<User> {
    return tx.user.update({ where: { id }, data: { cognitoSub } });
  }

  // createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }

  findById(id: string): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: userDefaultJoin,
    });
  }

  findDbBasicUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findBySub(cognitoSub: string): Promise<User | null> {
    const userList = await this.prisma.user.findMany({
      where: { cognitoSub },
      include: userDefaultJoin,
    });
    if (!userList.length) return null;
    return userList[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const userList = await this.prisma.user.findMany({
      where: { email },
      include: userDefaultJoin,
    });
    if (!userList.length) return null;
    return userList[0];
  }

  async findByCognitoId(cognitoSub: string): Promise<User | null> {
    if (!cognitoSub) return null;

    const userList = await this.prisma.user.findMany({
      where: { cognitoSub },
      include: userDefaultJoin,
    });
    if (!userList.length) return null;
    return userList[0];
  }

  async findByOrg(orgId: string, additionaWhere = {}): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      where: { orgId, ...additionaWhere },
      include: userDefaultJoin,
    });
  }

  async findManagersByOrg(orgId: string): Promise<UserDto[]> {
    return this.findByOrg(orgId, { userRole: UserRoleEnum.USER_MANAGER });
  }

  async update(id: string, attrs: Prisma.UserUpdateInput) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return this.prisma.user.update({ where: { id }, data: attrs });
  }

  //   async remove(id: string) {
  //     const user = await this.findOne(id);
  //     if (!user) throw new NotFoundException('User Not Found');
  //     return this.prisma.user.delete({ where: { id } });
  //   }
}
