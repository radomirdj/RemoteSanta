import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompletementStepDto } from './dtos/completement_step.dto';
import consts from '../utils/consts';

@Injectable()
export class CompletementStepsService {
  constructor(private prisma: PrismaService) {}
  getCompletementStepFullList() {
    return this.prisma.orgCompletementStep.findMany({
      orderBy: [
        {
          priority: 'asc',
        },
      ],
    });
  }

  async setAllStepsNotCompleted(tx, orgId: string) {
    const stepList = await this.getCompletementStepFullList();
    const stepIdList = stepList.map((step) => step.id);
    const data = stepIdList.map((stepId) => ({
      orgId,
      orgCompletementStepId: stepId,
      completed: false,
    }));
    return tx.orgCompletementStepStatus.createMany({
      data,
    });
  }

  async updateOrgCompletementStatus(
    orgId: string,
    stepId: string,
    completed: boolean,
  ) {
    const [completementStepStatusList, completementStep] = await Promise.all([
      this.prisma.orgCompletementStepStatus.findMany({
        where: {
          orgId,
          orgCompletementStepId: stepId,
        },
      }),
      this.prisma.orgCompletementStep.findUnique({
        where: {
          id: stepId,
        },
      }),
    ]);
    if (!completementStep)
      throw new NotFoundException('Completement Step Not Found');

    if (!completementStepStatusList.length) {
      return this.prisma.orgCompletementStepStatus.create({
        data: {
          org: {
            connect: {
              id: orgId,
            },
          },
          orgCompletementStep: {
            connect: {
              id: stepId,
            },
          },
          completed,
        },
      });
    }
    return this.prisma.orgCompletementStepStatus.update({
      where: { id: completementStepStatusList[0].id },
      data: {
        completed,
      },
    });
  }

  async updateOrgSignupBonus(orgId: string, signupPoints: number) {
    await this.updateOrgCompletementStatus(
      orgId,
      consts.orgCompletementSteps.AUTOMATIC_POINTS.id,
      true,
    );
    await this.prisma.org.update({
      where: {
        id: orgId,
      },
      data: {
        signupPoints,
      },
    });
  }

  async getListByOrg(orgId: string): Promise<CompletementStepDto[]> {
    const stepListPromise = this.getCompletementStepFullList();
    const stepStatusListPromise =
      this.prisma.orgCompletementStepStatus.findMany({
        where: {
          orgId,
        },
        include: {
          orgCompletementStep: true,
        },
      });
    const [stepList, stepStatusList] = await Promise.all([
      stepListPromise,
      stepStatusListPromise,
    ]);
    return stepList.map((step) => {
      const stepStatusFound = stepStatusList.find(
        (stepStatus) => stepStatus.orgCompletementStep.id === step.id,
      );
      let completed = true;
      if (stepStatusFound) completed = stepStatusFound.completed;
      return {
        id: step.id,
        completed,
        name: step.name,
      } as CompletementStepDto;
    });
  }
}
