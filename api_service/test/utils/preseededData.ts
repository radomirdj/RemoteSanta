export const users = [
  {
    id: '69a89ce4-5f3e-403f-8fa2-821fc4f216c9',
    cognitoSub: '821fc4f216c9',
    password: 'abcABC123',
    email: 'abc@example.com',
    firstName: 'Jon',
    lastName: 'Snow',
  },
  {
    id: 'd95d6e01-9fb8-4116-ae70-276aca88694a',
    cognitoSub: '276aca88694a',
    password: 'abcABC123',
    email: 'abc2@example.com',
    firstName: 'Eddard',
    lastName: 'Stark',
  },
  {
    id: '25752f92-defd-4bb5-9553-154fc5ce9d8b',
    cognitoSub: '154fc5ce9d8b',
    password: 'abcABC123',
    email: 'abc3@example.com',
    firstName: 'Sansa',
    lastName: 'Stark',
  },
  {
    id: '71bed16a-98d9-479b-b5f4-f934a2278aae',
    cognitoSub: 'f934a2278aae',
    password: 'abcABC123',
    email: 'abc4@example.com',
    firstName: 'Arya',
    lastName: 'Stark',
  },
];
export const user1 = users[0];
export const user2 = users[1];
export const user3 = users[2];

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
