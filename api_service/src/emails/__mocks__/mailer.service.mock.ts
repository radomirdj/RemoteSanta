export const MailerServiceMock = {
  sendMail: (data) =>
    console.log(
      `------------------------Send Email ------------------\n ${data} \n------------------------Send Email End------------\n`,
    ),
};
