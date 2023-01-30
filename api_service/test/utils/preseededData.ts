export const users = [
  {
    id: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    cognitoSub: '821fc4f216c9',
    password: 'abcABC123',
    email: 'abc@example.com',
    firstName: 'Jon',
    lastName: 'Snow',
    gender: 'MALE',
    birthDate: new Date('1983-02-05T00:00:00.000Z'),
  },
  {
    id: 'd95d6e01-9fb8-4116-ae70-276aca88694a',
    cognitoSub: '276aca88694a',
    password: 'abcABC123',
    email: 'abc2@example.com',
    firstName: 'Eddard',
    lastName: 'Stark',
    gender: 'MALE',
    birthDate: new Date('1960-01-25T00:00:00.000Z'),
  },
  {
    id: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
    cognitoSub: '154fc5ce9d8b',
    password: 'abcABC123',
    email: 'abc3@example.com',
    firstName: 'Sansa',
    lastName: 'Stark',
    gender: 'FEMALE',
    role: 'USER_MANAGER',
    birthDate: new Date('1993-03-20T00:00:00.000Z'),
  },
  {
    id: '71bed16a-98d9-479b-b5f4-f934a2278aae',
    cognitoSub: 'f934a2278aae',
    password: 'abcABC123',
    email: 'abc4@example.com',
    firstName: 'Arya',
    lastName: 'Stark',
    gender: 'FEMALE',
    role: 'ADMIN',
    birthDate: new Date('1997-04-22T00:00:00.000Z'),
  },
  {
    id: 'c7f44075-8888-44a8-a897-f4a4db0d3050',
    cognitoSub: 'f4a4db0d3050',
    password: 'abcABC123',
    email: 'abc5@example.com',
    firstName: 'Tywin',
    lastName: 'Lannister',
    gender: 'MALE',
    role: 'USER_MANAGER',
    birthDate: new Date('1945-04-19T00:00:00.000Z'),
  },
];

export const user1 = users[0];
export const user1ActivePoints = 6400;
export const user1ReservedPoints = 3000;
export const user1ActiveBalanceSideId = '2d1b6de0-e182-43f8-b8ce-96baccb4ecd4';
export const user1ReservedBalanceSideId =
  'bbb32b33-2b0f-43f2-b7fb-fb8a6217d14b';

export const user3ActiveBalanceSideId = 'a6490a6e-253b-4aa0-810c-f7e5b3790138';
export const user3ReservedBalanceSideId =
  '7ed49c43-db63-4631-84ae-d07bc461bbbb';

export const user2 = users[1];
export const user2ActivePoints = 0;
export const user2ReservedPoints = 0;

export const user3Manager = users[2];
export const user3ActivePoints = 2400;
export const user3ReservedPoints = 0;

export const admin = users[3];

export const org2Manager = users[4];
export const org2ActivePoints = 0;
export const org2ReservedPoints = 0;

export const giftDates = [
  {
    id: '4b948270-696a-4a32-9c59-ffac4d7aa186',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    type: 'HOLIDAY',
    recurrenceType: 'YEARLY',
    enabled: true,
    firstAccuranceDate: new Date('2022-12-31:00:00.000Z'),
    title: 'New Year',
  },
  {
    id: '47797f0d-c1b9-4287-93cc-7e5e42292584',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    type: 'BIRTHDAY',
    recurrenceType: 'YEARLY',
    enabled: true,
    firstAccuranceDate: new Date('2022-11-24T00:00:00.000Z'),
  },
  {
    id: 'd7e7cc0d-4415-48ff-ad3f-0dc6c2cd6e38',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    type: 'OTHER',
    recurrenceType: 'MONTHLY',
    enabled: true,
    firstAccuranceDate: new Date('2022-12-01T00:00:00.000Z'),
    title: 'Sport Activities',
  },
  {
    id: '5794e680-ecb6-450c-8c1a-88ebd63b9e0a',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    type: 'OTHER',
    recurrenceType: 'NONE',
    enabled: true,
    firstAccuranceDate: new Date('2023-06-12T00:00:00.000Z'),
    title: 'Summer Party',
  },
  {
    id: 'e35b81c7-d772-4e97-8e2f-3c592065caf4',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    type: 'OTHER',
    recurrenceType: 'NONE',
    enabled: false,
    firstAccuranceDate: new Date('2023-02-12:00:00.000Z'),
    title: 'Winter Party',
  },
];

export const giftDate1 = giftDates[0];
export const giftDate2 = giftDates[1];
export const giftDate3 = giftDates[2];
export const giftDate4 = giftDates[3];
export const giftDate5 = giftDates[4];

export const giftCardIntegration1 = {
  id: '469cf71d-86a5-450e-afc7-76bc6996a3ad',
  priority: 10,
  website: 'https://giftoncard.eu',
  image:
    'https://publicintegrationimages.s3.eu-central-1.amazonaws.com/Multibrand.png',
  title: 'Multibrand',
  description: 'Jedna e kartica, na preko 500 lokacija širom Srbije.',
  constraintType: 'MIN_MAX',
  constraintJson: { MIN: 500, MAX: 100000 },
};

export const giftCardIntegration2 = {
  id: '3ada6b27-f579-4297-9042-2d46b89b594e',
  priority: 20,
  website: 'https://www.sportvision.rs',
  image:
    'https://www.supernova-kranj.si//fileadmin/shared/logos/Sport_Vision.png',
  title: 'Sport Vision',
  description:
    'U odlično opremljenim prodavnicama čekaju vas odlična usluga i najkvalitetniji brendovi (Nike, Adidas,Champion,Umbro,Ellesse,Lonsdale,Slayenger,SergioTacchini,Converse,Karrimor,Slazenger and others).Lokacije u celoj Srbiji.',
  constraintType: 'MIN_MAX',
  constraintJson: { MIN: 500, MAX: 100000 },
};

export const giftCardRequestList = [
  {
    id: '9794fc09-68ee-4f3d-ac3f-b5ea759021ca',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    giftCardIntegrationId: '469cf71d-86a5-450e-afc7-76bc6996a3ad',
    amount: 1000,
    status: 'PENDING',
  },
  {
    id: '17dd40fa-dff8-4b53-bdf1-a83ba1475e44',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    giftCardIntegrationId: '3ada6b27-f579-4297-9042-2d46b89b594e',
    amount: 2000,
    status: 'PENDING',
  },
  {
    id: '4098665d-b252-43d7-b40e-3d8444ab4567',
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    giftCardIntegrationId: 'df7d81e9-d70f-4d0c-8f99-6db378c6f89c',
    amount: 3000,
    status: 'COMPLETED',
  },
];

export const giftCardRequest1 = giftCardRequestList[0];
export const giftCardRequest2 = giftCardRequestList[1];
export const giftCardRequestFulfilled = giftCardRequestList[2];

export const org1 = {
  id: '752e05ce-4a81-4148-87c5-30832406d48c',
  name: 'Winterfell Inc.',
  pointsPerMonth: 1200,
  employeeNumber: 4,
};

export const org1Points = 9200;
export const org1BalanceSideId = 'dfd73aeb-32e6-463b-ae7a-d1ea63d4fcf3';
export const platformBalanceSideId = '4b7e82dd-2f71-4be4-a55f-cc20b60c6eae';

export const org2 = {
  id: '62b1828e-0b0f-4123-af61-531e7967134c',
  name: 'Casterly Rock Inc.',
  pointsPerMonth: 600,
  employeeNumber: 1,
};

export const org2Points = 0;

export const claimPointsEvent1 = {
  id: 'e0c01322-f499-4f84-baac-af230e238d07',
  validTo: '2022-11-01T00:00:00.000Z',
  description: 'You don’t waste October sunshine.',
};

export const userInvite1 = {
  id: '51f87502-14b9-4b13-b892-7b9dc122e9d3',
  code: 'ABCDEF',
  email: 'email@invite.com',
  status: 'ACTIVE',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
  orgName: org1.name,
};

export const userInviteCompleted = {
  id: 'd693784f-a2db-4e45-84b3-bfd696643fc2',
  code: 'ABCDEG',
  email: 'email2@invite.com',
  status: 'COMPLETED',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
  orgName: org1.name,
};

export const userInviteCanceled = {
  id: '6a357870-d513-4fa1-a804-f9f961cfe7c1',
  code: 'ABCDEA',
  email: 'email3@invite.com',
  status: 'CANCELED',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
  orgName: org1.name,
};

export const userInviteOrg2 = {
  id: 'd4435ad3-35f7-47b6-ba8b-5f7e5e4db3d9',
  code: 'BBCDEF',
  email: 'email@2invite.com',
  status: 'ACTIVE',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: '62b1828e-0b0f-4123-af61-531e7967134c',
  orgName: org1.name,
};

export const claimPointsEvent10Id = 'e545e477-d10a-48da-9c1f-919cb456e64a';

export const lastClaimPointsEvent = {
  id: 'ec8dc7a8-0ed3-4815-bd0d-d2073005625e',
  validTo: '2054-01-01T00:00:00.000Z',
  description: 'Make December to remember.',
  title: 'December-2053.',
  claimPointsEventFulfillment: {
    id: 'b6b47e55-5213-441f-87db-c7e32bd5b70e',
    amount: 1200,
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    createdAt: '2022-12-26T09:44:19.183Z',
  },
};

export const org1Transactions = [
  {
    id: '4a49457a-774d-4443-8da5-692748000beb',
    orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
    type: 'ORG_TO_EMPLOYEES',
    totalAmount: 2400,
    event: {
      description: 'Make December to remember.',
    },
  },
  {
    id: 'ca16d572-9640-4470-8c8a-af3bb3fd42b6',
    orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
    type: 'ADMIN_TO_ORG',
    totalAmount: 24000,
  },
];
