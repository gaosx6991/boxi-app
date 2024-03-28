type SenderInfo = {
  senderName: string;
  shipperPhoneNumber: string;
  senderAddress: string;
};

type RecipientInfo = {
  recipientName: string;
  phoneNumber: string;
  recipientAddress: string;
  postalZip: string;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Register: undefined;
  Login: {type: 'Email' | 'Phone Number'};
  BottomTabNavigator: undefined;
  CreateOrder: undefined;
  OnProgressPickup: {senderInfo: SenderInfo; recipientInfo: RecipientInfo};
};

export interface MillisecondTimestamp {
  readonly value: number;
}
