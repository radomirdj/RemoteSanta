import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompletementStepDto } from './dtos/completement_step.dto';

@Injectable()
export class CompletementStepsService {
  constructor(private prisma: PrismaService) {}
  async getListByOrg(orgId: string): Promise<CompletementStepDto[]> {
    const stepListPromise = this.prisma.orgCompletementStep.findMany({
      orderBy: [
        {
          priority: 'asc',
        },
      ],
    });
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
