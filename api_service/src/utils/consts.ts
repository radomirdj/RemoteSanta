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
    ADD_PAYMENT: {
      id: 'a38731bb-8b5d-426b-92d0-ca422080eb67',
      name: 'ADD_PAYMENT',
    },
    AUTOMATIC_POINTS: {
      id: '9de0888e-6193-409e-a308-3fc0257c3939',
      name: 'AUTOMATIC_POINTS',
    },
    INVITE_EMPLOYEES: {
      id: '764c104e-055d-453a-a061-60698581be15',
      name: 'INVITE_EMPLOYEES',
    },
    WATCH_TUTORIAL: {
      id: '7477296f-6919-442b-9ea5-7306f09ba028',
      name: 'WATCH_TUTORIAL',
    },
  },
  orgNegativeTransactions: [
    OrgTransactionTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
  ] as OrgTransactionTypeEnum[],
  userInviteImpotMessage: {
    EMAIL_EXISTS_FAIL: 'email exists',
  },
};
