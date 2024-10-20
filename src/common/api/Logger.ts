import { format } from 'date-fns';

interface IErrorDoc {
  version: string;
  message: string;
  created: string;
  userAgent: string;
}

const Slack = {
  sendMessageToErrorChannel: (message: string) => {
    fetch(`${process.env.SLACK_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        text: message
      })
    });
  }
};

const Logger = {
  log: (message: string) => {
    console.log(message);
  },
  debug: (message: string) => {
    Slack.sendMessageToErrorChannel(`SERVER debug : ${message}`);
  },
  info: (message: string) => {
    console.info(message);
  },
  warn: (message: string) => {
    console.warn(message);
  },
  error: (message: any) => {
    let errorDoc: any = {} as IErrorDoc;
    errorDoc.message = JSON.stringify(message);
    errorDoc.created = format(new Date(), 'yyyy-MM-dd  HH:mm:ss');
    errorDoc.message = errorDoc.message.substring(0, 2500);

    try {
      Slack.sendMessageToErrorChannel(
        `SERVER error : ${JSON.stringify(errorDoc)}`
      );
    } catch (e) {
      console.error('Logger error : ' + JSON.stringify(e));
    }
  }
};

export default Logger;
