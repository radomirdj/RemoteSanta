import { OrgTransactionTypeEnum } from '@prisma/client';

export default {
  platformBalanceSideId: '4b7e82dd-2f71-4be4-a55f-cc20b60c6eae',
  adminRecepients: [
    'radomir.m.djokovic@gmail.com',
    'radomir@remotesanta.io',
    'djekovicjovana1@gmail.com',
    'jovana@remotesanta.io',
  ],
  orgNegativeTransactions: [
    OrgTransactionTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
  ] as OrgTransactionTypeEnum[],
};
