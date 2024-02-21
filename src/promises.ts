import { Platform } from 'react-native';
import type { Payload, AsyncSendMessage } from './NativeWearConnectivity';
import { WearConnectivity } from './index';
import { LIBRARY_NAME, IOS_NOT_SUPPORTED_WARNING } from './constants';

/*
  New promise based system
 */
const sendMessage: AsyncSendMessage = (message) => {
  return new Promise<string>((resolve, reject) => {
    const json: Payload = { ...message, event: 'message' };
    return WearConnectivity.sendMessage(
      json,
      (reply: string) => resolve(reply),
      (err: string) => reject(err)
    );
  });
};

const sendMessageMock: AsyncSendMessage = () => {
  return new Promise<string>((_, reject) => {
    console.warn(LIBRARY_NAME + 'message' + IOS_NOT_SUPPORTED_WARNING);
    reject(LIBRARY_NAME + 'message' + IOS_NOT_SUPPORTED_WARNING);
  });
};

let sendMessageExport: AsyncSendMessage = sendMessageMock;
if (Platform.OS !== 'ios') {
  sendMessageExport = sendMessage;
}

export { sendMessageExport as sendMessageAsync };
