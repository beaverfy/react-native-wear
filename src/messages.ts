import { Platform } from 'react-native';
import type { SendMessage, Payload } from './NativeWearConnectivity';
import { WearConnectivity } from './index';
import { LIBRARY_NAME, IOS_NOT_SUPPORTED_WARNING } from './constants';

/*
  New promise based system
 */
const sendMessage: SendMessage = (message) => {
  return new Promise<Payload>((resolve, reject) => {
    const json: Payload = { ...message, event: 'message' };
    return WearConnectivity.sendMessage(
      json,
      (reply: Payload) => resolve(reply),
      (err: string) => reject(err)
    );
  });
};

const sendMessageMock: SendMessage = () => {
  return new Promise<{}>((_, reject) => {
    console.warn(LIBRARY_NAME + 'message' + IOS_NOT_SUPPORTED_WARNING);
    reject(LIBRARY_NAME + 'message' + IOS_NOT_SUPPORTED_WARNING);
  });
};

let sendMessageExport: SendMessage = sendMessageMock;
if (Platform.OS !== 'ios') {
  sendMessageExport = sendMessage;
}

export { sendMessageExport as sendMessage };
