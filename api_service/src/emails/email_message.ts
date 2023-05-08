interface SQSEmailMessage {
  templateName: string;
  to: string | string[];
  data: any;
  attachment: { filename: string; buffer };
}
