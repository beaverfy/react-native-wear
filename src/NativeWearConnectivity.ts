import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// Messages
export type Payload = {};
export type ReplyCallback = (reply: string) => void;
export type ErrorCallback = (err: string) => void;

export type SendMessage = (
  message: Payload,
  replyCb: ReplyCallback,
  errCb: ErrorCallback
) => void;

export type AsyncSendMessage = (message: Payload) => Promise<string>;

export interface Spec extends TurboModule {
  sendMessage: SendMessage;
}

export default TurboModuleRegistry.getEnforcing<Spec>('WearConnectivity');
