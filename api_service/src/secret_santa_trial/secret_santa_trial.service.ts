import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailsService } from '../emails/emails.service';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SecretSantaTrialService {
  constructor(
    private prisma: PrismaService,
    private emailsService: EmailsService,
    private usersService: UsersService,
  ) {}

  async activateSecretSantaTrial(user: UserDto) {
    if (user.org.isSecretSantaTrialActivated) return;
    const userList = await this.usersService.findByOrg(user.org.id);
    const userListLength = userList.length;
    const emailParamList = userList.map((userValue, index) => {
      const secretSantaTo = userList[(index + 1) % userListLength];
      return {
        email: userValue.email,
        firstName: userValue.firstName,
        lastName: userValue.lastName,
        id: userValue.id,
        firstNameSecretSantaTo: secretSantaTo.firstName,
        lastNameSecretSantaTo: secretSantaTo.lastName,
        idSecretSantaTo: secretSantaTo.id,
        countryIdSecretSantaTo: secretSantaTo.countryId,
      };
    });

    await Promise.all(
      emailParamList.map((emailParam) =>
        this.emailsService.secretSantaTrialActivated(
          [emailParam.email],
          emailParam.firstName,
          emailParam.firstNameSecretSantaTo,
          emailParam.lastNameSecretSantaTo,
          emailParam.idSecretSantaTo,
          emailParam.countryIdSecretSantaTo,
        ),
      ),
    );

    await this.prisma.org.update({
      where: {
        id: user.org.id,
      },
      data: {
        isSecretSantaTrialActivated: true,
      },
    });
  }
}
