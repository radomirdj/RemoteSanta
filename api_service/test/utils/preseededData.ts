export const users = [
  {
    id: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: '821fc4f216c9',
    password: 'abcABC123',
    email: 'jovanadjeko@gmail.com',
    firstName: 'Jon',
    lastName: 'Snow',
    gender: 'MALE',
    birthDate: new Date('1983-02-05T00:00:00.000Z'),
  },
  {
    id: 'd95d6e01-9fb8-4116-ae70-276aca88694a',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: '276aca88694a',
    password: 'abcABC123',
    email: 'jovanadjeko+1@gmail.com',
    firstName: 'Eddard',
    lastName: 'Stark',
    gender: 'MALE',
    birthDate: new Date('1960-01-25T00:00:00.000Z'),
  },
  {
    id: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: '154fc5ce9d8b',
    password: 'abcABC123',
    email: 'jovanadjeko+2@gmail.com',
    firstName: 'Sansa',
    lastName: 'Stark',
    gender: 'FEMALE',
    role: 'USER_MANAGER',
    birthDate: new Date('1993-03-20T00:00:00.000Z'),
  },
  {
    id: '71bed16a-98d9-479b-b5f4-f934a2278aae',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: 'f934a2278aae',
    password: 'abcABC123',
    email: 'jovanadjeko+3@gmail.com',
    firstName: 'Arya',
    lastName: 'Stark',
    gender: 'FEMALE',
    role: 'ADMIN',
    birthDate: new Date('1997-04-22T00:00:00.000Z'),
  },
  {
    id: 'c7f44075-8888-44a8-a897-f4a4db0d3050',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: 'f4a4db0d3050',
    password: 'abcABC123',
    email: 'jovanadjeko+4@gmail.com',
    firstName: 'Tywin',
    lastName: 'Lannister',
    gender: 'MALE',
    role: 'USER_MANAGER',
    birthDate: new Date('1945-04-19T00:00:00.000Z'),
  },
  {
    id: '3a4e4ddd-dee6-4132-886c-c7953f03c00b',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: 'c7953f03c00b',
    password: 'abcABC123',
    email: 'jovanadjeko+notcompleted@gmail.com',
    firstName: 'New',
    lastName: 'New',
    role: 'USER_MANAGER',
  },
  {
    id: 'ff9ea7ac-019f-4139-8d96-8ea1b35556c7',
    countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
    cognitoSub: '8ea1b35556c7',
    password: 'abcABC123',
    email: 'jovanadjeko+notcompletedbasic@gmail.com',
    firstName: 'NewB',
    lastName: 'NewB',
  },
];

export const user1 = users[0];
export const user1ActivePoints = 7600;
export const user1ReservedPoints = 9000;
export const user1ActiveBalanceSideId = '2d1b6de0-e182-43f8-b8ce-96baccb4ecd4';
export const user1ReservedBalanceSideId =
  'bbb32b33-2b0f-43f2-b7fb-fb8a6217d14b';

export const user3ActiveBalanceSideId = 'a6490a6e-253b-4aa0-810c-f7e5b3790138';
export const user3ReservedBalanceSideId =
  '7ed49c43-db63-4631-84ae-d07bc461bbbb';

export const userDeleted1ActiveBalanceSideId =
  '9b4e11c9-d57c-4b20-a689-706000479691';
export const userDeleted1ReservedBalanceSideId =
  'de836447-8b92-4dfd-b1df-00e716fb6f39';

export const user2 = users[1];
export const user2ActivePoints = 0;
export const user2ReservedPoints = 0;

export const user3Manager = users[2];
export const user3ActivePoints = 3600;
export const user3ReservedPoints = 0;

export const admin = users[3];

export const userDeleted1 = {
  id: '80629be5-c1f7-4fb8-90b7-c030194617e6',
  cognitoSub: 'c030194617e6',
  password: 'abcABC123',
  email: 'jovanadjeko+d1@gmail.com',
  firstName: 'NameDeleted',
  lastName: 'LastnameDeleted',
  gender: 'FEMALE',
  birthDate: new Date('1992-04-22T00:00:00.000Z'),
};

export const userDeleted1ActivePoints = 0;
export const userDeleted1ReservedPoints = 3600;

export const userDeleted2 = {
  id: '710e4200-4d11-4d53-b41f-647c7320f5a2',
  cognitoSub: '647c7320f5a2',
  password: 'abcABC123',
  email: 'jovanadjeko+d2@gmail.com',
  firstName: 'NameDeleted2',
  lastName: 'LastnameDeleted2',
  gender: 'MALE',
  birthDate: new Date('1955-04-19T00:00:00.000Z'),
};

export const org2Manager = users[4];
export const org2ActivePoints = 0;
export const org2ReservedPoints = 0;

export const orgNonCompletedManager = users[5];
export const orgNonCompletedBasic = users[6];

export const userSrb = {
  id: 'c9c96ed0-6750-401e-aebd-1563c5933467',
  cognitoSub: '1563c5933467',
  password: 'abcABC123',
  email: 'jovanadjeko+srb@gmail.com',
  firstName: 'Mita',
  lastName: 'Bekrija',
  gender: 'MALE',
  birthDate: new Date('1945-04-19T00:00:00.000Z'),
};

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
  id: 'e6618cd2-1b20-462a-8328-be43cc999b46',
  priority: 10,
  website: 'https://www.1800flowers.com/',
  image: 'https://brandimagescards.s3.us-east-2.amazonaws.com/us_1800flow.png',
  title: '1-800 Flowers',
  description:
    '1-800-Flowers is a well-known floral and gift delivery service based in the United States. It is a popular brand that offers a wide range of products, including flowers, plants, gift baskets, and other gift items.',
  constraintType: 'LIST',
  constraintJson: [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 250, 300, 350,
    400, 450, 500,
  ],
};

export const giftCardIntegration2 = {
  id: '54075744-7bb0-400a-9b72-678c618e6c5b',
  priority: 20,
  website: 'https://www.ae.com/',
  image: 'https://brandimagescards.s3.us-east-2.amazonaws.com/aerie.png',
  title: 'Aerie',
  description:
    'Aerie is a clothing brand that specializes in lingerie, swimwear and loungewear for women. It is a subsidiary of American Eagle Outfitters and was launched in 2006 with the goal of offering comfortable, body-positive intimates for women of all sizes.',
  constraintType: 'LIST',
  constraintJson: [
    5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300,
  ],
};

export const giftCardIntegrationSrb = {
  id: '023bf681-121d-48a1-a550-da1f9b37abe3',
  priority: 30,
  website: 'https://www.n-sport.net',
  image:
    'https://publicintegrationimages.s3.eu-central-1.amazonaws.com/NSport.png',
  title: 'N Sport',
  description:
    'One of the leading distributors of the most famous sports and fashion brands. Recognizable for its three main sales multibrand concepts - N Sport, N Fashion and N Selection, which correspond to the active life of modern men and women.',
  constraintType: 'MIN_MAX',
  constraintJson: { MIN: 500, MAX: 100000 },
};

export const giftCardIntegrationIndia = {
  id: '73531d62-58dc-4891-9fb7-95be4f56106e',
  priority: 20,
  website: 'https://www.flipkart.com/',
  image: 'https://brandimagescards.s3.us-east-2.amazonaws.com/ind_flipkart.png',
  title: 'Flipkart',
  description:
    'Flipkart operates as a marketplace where sellers can list their products, and customers can browse and purchase items directly from the platform. It provides an online shopping experience and offers a wide selection of products from different brands.',
  constraintType: 'LIST',
  constraintJson: [
    25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 750, 800,
    900, 1000, 1500, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000,
    10000,
  ],
};

export const giftCardRequestList = [
  {
    id: '9794fc09-68ee-4f3d-ac3f-b5ea759021ca',
    createdById: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    ownerId: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
    giftCardIntegrationId: 'e6618cd2-1b20-462a-8328-be43cc999b46',
    amount: 3000,
    giftCardIntegrationCurrencyAmount: 30.0,
    status: 'PENDING',
  },
  {
    id: '17dd40fa-dff8-4b53-bdf1-a83ba1475e44',
    createdById: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    ownerId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    giftCardIntegrationId: '54075744-7bb0-400a-9b72-678c618e6c5b',
    amount: 6000,
    giftCardIntegrationCurrencyAmount: 60.0,
    status: 'PENDING',
  },
  {
    id: '4098665d-b252-43d7-b40e-3d8444ab4567',
    createdById: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    ownerId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    giftCardIntegrationId: '0618f276-3890-4877-9cff-d145133c187e',
    amount: 9000,
    giftCardIntegrationCurrencyAmount: 90.0,
    status: 'COMPLETED',
  },
  {
    id: '1804569e-6112-4519-82c3-6d40e754e035',
    createdById: userDeleted1.id,
    ownerId: user3Manager.id,
    giftCardIntegrationId: 'e6618cd2-1b20-462a-8328-be43cc999b46',
    amount: 3600,
    giftCardIntegrationCurrencyAmount: 36.0,
    status: 'PENDING',
  },
];

export const giftCardRequest1 = giftCardRequestList[0];
export const giftCardRequest2 = giftCardRequestList[1];
export const giftCardRequestFulfilled = giftCardRequestList[2];
export const giftCardRequest3 = giftCardRequestList[3];

export const org1 = {
  id: '752e05ce-4a81-4148-87c5-30832406d48c',
  name: 'Winterfell Inc.',
  pointsPerMonth: 1200,
  signupPoints: 2400,
  employeeNumber: 4,
};

export const org1Points = 6800;
export const org1BalanceSideId = 'dfd73aeb-32e6-463b-ae7a-d1ea63d4fcf3';
export const platformBalanceSideId = '4b7e82dd-2f71-4be4-a55f-cc20b60c6eae';

export const org2 = {
  id: '62b1828e-0b0f-4123-af61-531e7967134c',
  name: 'Casterly Rock Inc.',
  pointsPerMonth: 600,
  signupPoints: 2400,
  employeeNumber: 1,
};

export const org2Points = 25200;
export const org2BalanceSideId = '1c80baff-e523-4787-a94d-7edcf35216aa';

export const brokeOrgId = 'd5d4d9a2-7d77-43ba-bacd-b87504e5fae1';

export const orgNonCompleted = {
  id: 'a2811909-a87c-402e-8fc1-2f54e72532e2',
  name: 'Not Completed Org',
  pointsPerMonth: 0,
  signupPoints: 0,
  employeeNumber: 1,
};

export const claimPointsEvent1 = {
  id: 'e0c01322-f499-4f84-baac-af230e238d07',
  validTo: '2022-11-01T00:00:00.000Z',
  description: 'You don’t waste October sunshine.',
};

export const signupEvent = {
  id: '8cff81f0-44b0-4b32-bbac-c8c0be63521c',
  validTo: '2030-01-01T00:00:00.000Z',
  description: 'SIGN UP',
};

export const deleteUserEvent = {
  id: '08c1eb0b-94d9-456c-b6b0-6fa908d17a18',
  validTo: '2000-01-01T00:00:00.000Z',
  description: 'DELETE USER',
};

export const orgSendToUserEvent = {
  id: '1b3a930b-adb4-4ffb-b6b4-0859c15903fc',
  validTo: '2000-01-01T00:00:00.000Z',
  description: 'ORG SEND POINTS TO EMPLOYEE',
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

export const userInviteBrokeOrg = {
  id: '0c73fd19-b4e8-4abc-b0af-48eed8c62309',
  code: 'BBFDEF',
  email: 'email@brokeorg.com',
  status: 'ACTIVE',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: 'd5d4d9a2-7d77-43ba-bacd-b87504e5fae1',
  orgName: 'Broke Org - With No Points',
};

export const userInviteManager = {
  id: 'a3755551-f4da-47a5-9643-ff2aa845be1a',
  code: 'BBCWEF',
  email: 'manager@brokeorg.com',
  status: 'ACTIVE',
  userRole: 'USER_MANAGER',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: 'd5d4d9a2-7d77-43ba-bacd-b87504e5fae1',
  orgName: 'Broke Org - With No Points',
};

export const userInviteDoubleEmail = {
  id: '48fca279-ad29-4bc2-99a1-f8bff742a743',
  code: 'BBCAEF',
  email: 'jovanadjeko+1@gmail.com',
  status: 'ACTIVE',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
  orgId: '62b1828e-0b0f-4123-af61-531e7967134c',
  orgName: org1.name,
};

export const userInviteImportJob1 = {
  id: '88976852-9494-4a9c-bd2a-68b700297697',
  orgId: '62b1828e-0b0f-4123-af61-531e7967134c',
  createdById: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
};

export const userInviteSingleImportList = [
  {
    id: '1c6f5c26-249e-4631-b0e7-f81622cbad8d',
    status: 'PENDING',
    email: 'email+1@queued.com',
    userInviteImportJobId: '88976852-9494-4a9c-bd2a-68b700297697',
  },
  {
    id: '5670d0ba-e2b7-41e9-ba99-c3a57f1b0b09',
    status: 'PENDING',
    email: 'email+2@queued.com',
    userInviteImportJobId: '88976852-9494-4a9c-bd2a-68b700297697',
  },
  {
    id: '27eb82a6-4dd5-48a0-b2e0-e536f2f40253',
    status: 'SUCCESS',
    email: 'email+3@queued.com',
    userInviteImportJobId: '88976852-9494-4a9c-bd2a-68b700297697',
  },
  {
    id: 'bbbab702-b7ec-462d-beef-80c43d77713f',
    status: 'FAIL',
    email: 'email+4@queued.com',
    userInviteImportJobId: '88976852-9494-4a9c-bd2a-68b700297697',
  },
  {
    id: '51792344-0b0f-4748-9738-b909cced3002',
    status: 'FAIL',
    failureReason: 'email exists',
    email: 'email+5@queued.com',
    userInviteImportJobId: '88976852-9494-4a9c-bd2a-68b700297697',
  },
];

export const userInviteSingleImportPedning = userInviteSingleImportList[0];
export const userInviteSingleImportSuccess = userInviteSingleImportList[2];
export const userInviteSingleImportFail = userInviteSingleImportList[3];
export const userInviteSingleImportEmailExists = userInviteSingleImportList[4];

export const claimPointsEvent10Id = 'e545e477-d10a-48da-9c1f-919cb456e64a';

export const lastClaimPointsEvent = {
  id: 'ec8dc7a8-0ed3-4815-bd0d-d2073005625e',
  validTo: '2054-01-01T00:00:00.000Z',
  description: 'Make December to remember!',
  title: 'December 2053',
  claimPointsEventFulfillment: {
    id: 'b6b47e55-5213-441f-87db-c7e32bd5b70e',
    amount: 2400,
    userId: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    createdAt: '2022-12-26T09:44:19.183Z',
  },
};

export const org1Transactions = [
  {
    id: '4a49457a-774d-4443-8da5-692748000beb',
    orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
    type: 'ORG_TO_EMPLOYEES_BY_EVENT',
    totalAmount: -4800,
    event: {
      description: 'Make December to remember!',
    },
  },
  {
    id: 'ca16d572-9640-4470-8c8a-af3bb3fd42b6',
    orgId: '752e05ce-4a81-4148-87c5-30832406d48c',
    type: 'ADMIN_TO_ORG',
    totalAmount: 39600,
  },
];
