export const SqsUserInvitesServiceMock = {
  inviteByEmailList: (userInviteSingleImportList, org, inviteSender) =>
    console.log(
      `------------------------QUEUE SQS MESSAGES ------------------\n ${userInviteSingleImportList} \n\n ${org}  \n\n ${inviteSender} \n------------------------QUEUE SQS MESSAGES------------\n`,
    ),
  inviteByEmailList2: (emailLiist) =>
    console.log(
      `------------------------QUEUE SQS MESSAGES ------------------\n ${emailLiist} \n------------------------QUEUE SQS MESSAGES------------\n`,
    ),
};
