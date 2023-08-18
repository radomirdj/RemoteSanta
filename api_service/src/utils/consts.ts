import { OrgTransactionTypeEnum } from '@prisma/client';

export default {
  platformBalanceSideId: '4b7e82dd-2f71-4be4-a55f-cc20b60c6eae',
  usCountryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
  adminRecepients: [
    'radomir.m.djokovic@gmail.com',
    'radomir@remotesanta.io',
    'djekovicjovana1@gmail.com',
    'jovana@remotesanta.io',
  ],
  orgCompletementSteps: {
    TALK_TO_A_SPECIALIST: {
      id: '4d4d62a7-3c0f-4433-b7bb-bc3e75da07a4',
      name: 'TALK_TO_A_SPECIALIST',
    },
    INVITE_EMPLOYEES: {
      id: 'f78f2566-7b93-4b57-9237-f25bab4ee308',
      name: 'INVITE_EMPLOYEES',
    },
    AUTOMATIC_POINTS: {
      id: '6b600e9f-2e22-42f8-8c29-20179c5d1a10',
      name: 'AUTOMATIC_POINTS',
    },
    PERSONAL_DETAILS: {
      id: '5afd1ac1-6d68-4801-a04c-720b23d2a073',
      name: 'PERSONAL_DETAILS',
    },
    BIRTHDAYS: {
      id: '2f123b4f-e28d-4bf0-add9-d4a79c998e19',
      name: 'BIRTHDAYS',
    },
    PURCHASE_POINTS: {
      id: '31e90020-bcfd-48a7-b28e-5ad083e0b19f',
      name: 'PURCHASE_POINTS',
    },
  },
  orgNegativeTransactions: [
    OrgTransactionTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
  ] as OrgTransactionTypeEnum[],
  userInviteImpotMessage: {
    EMAIL_EXISTS_FAIL: 'email exists',
  },
};
