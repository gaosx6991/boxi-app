import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Input from '../../../components/Input.tsx';
import {
  validateAddress,
  validateName,
  validatePhoneNumber,
  validatePostalCode,
} from '../../../utils/validate.ts';
import {PACKAGE_SIZE} from './PackageSizeItem.tsx';
import ItemType, {ITEM_TYPE, itemTypes} from './ItemType.tsx';
import PrimaryButton from '../../../components/PrimaryButton.tsx';
import {PAGE} from '../common.ts';
import PackageSize, {packageSizes} from './PackageSize.tsx';
import Info from './Info.tsx';
// @ts-ignore
import shipper from '../../../assets/shipper.png';
// @ts-ignore
import recipient from '../../../assets/recipient.png';
import Line from './Line.tsx';
import Price from './Price.tsx';

type Props = {
  styles: StyleProp<ViewStyle>;
  page: PAGE;
  onFlip: () => void;
};

export default (props: Props) => {
  const [senderName, setSenderName] = useState<string>('');
  const [senderAddress, setSenderAddress] = useState<string>('');
  const [shipperPhoneNumber, setShipperPhoneNumber] = useState<string>('');
  const [itemType, setItemType] = useState<ITEM_TYPE>(ITEM_TYPE.DOCUMENT);
  const [packageSize, setPackageSize] = useState<PACKAGE_SIZE>(
    PACKAGE_SIZE.ENVELOPE,
  );
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [postalZip, setPostalZip] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const packageSizeInfo = useMemo(
    () => packageSizes.filter(item => item.size === packageSize)[0],
    [packageSize, packageSizes],
  );
  const itemTypeInfo = useMemo(
    () => itemTypes.filter(item => item.type === itemType)[0],
    [itemType, itemTypes],
  );

  const [senderNameValid, setSenderNameValid] = useState<boolean>(true);
  const [senderAddressValid, setSenderAddressValid] = useState<boolean>(true);
  const [shipperPhoneNumberValid, setShipperPhoneNumberValid] =
    useState<boolean>(true);
  const [recipientNameValid, setRecipientNameValid] = useState<boolean>(true);
  const [recipientAddressValid, setRecipientAddressValid] =
    useState<boolean>(true);
  const [postalZipValid, setPostalZipValid] = useState<boolean>(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);

  const disabled = useMemo(() => {
    switch (props.page) {
      case PAGE.SHIPMENT_FORM:
        return (
          !senderNameValid || !senderAddressValid || !shipperPhoneNumberValid
        );
      case PAGE.RECIPIENT_FORM:
        return (
          !recipientNameValid ||
          !recipientAddressValid ||
          !postalZipValid ||
          !phoneNumberValid
        );
      case PAGE.REVIEW_ORDER:
        break;
    }
  }, [
    senderNameValid,
    senderAddressValid,
    shipperPhoneNumberValid,
    recipientNameValid,
    recipientAddressValid,
    postalZipValid,
    phoneNumberValid,
  ]);

  const [senderNameValidErrMsg, setSenderNameValidErrMsg] =
    useState<string>('');
  const [senderAddressValidErrMsg, setSenderAddressValidErrMsg] =
    useState<string>('');
  const [shipperPhoneNumberValidErrMsg, setShipperPhoneNumberValidErrMsg] =
    useState<string>('');
  const [recipientNameValidErrMsg, setRecipientNameValidErrMsg] =
    useState<string>('');
  const [recipientAddressValidErrMsg, setRecipientAddressValidErrMsg] =
    useState<string>('');
  const [postalZipValidErrMsg, setPostalZipValidErrMsg] = useState<string>('');
  const [phoneNumberValidErrMsg, setPhoneNumberValidErrMsg] =
    useState<string>('');

  const handleSenderNameValueChange = useCallback((value: string) => {
    setSenderName(value);

    const errMsg = validateName(value);
    if (errMsg) {
      setSenderNameValid(false);
      setSenderNameValidErrMsg(errMsg);
    } else {
      setSenderNameValid(true);
    }
  }, []);
  const handleSenderAddressValueChange = useCallback((value: string) => {
    // TODO: get coordinate from address
    setSenderAddress(value);

    const errMsg = validateAddress(value);
    if (errMsg) {
      setSenderAddressValid(false);
      setSenderAddressValidErrMsg(errMsg);
    } else {
      setSenderAddressValid(true);
    }
  }, []);
  const handleShipperPhoneNumberValueChange = useCallback((value: string) => {
    setShipperPhoneNumber(value);

    const errMsg = validatePhoneNumber(value);
    if (errMsg) {
      setShipperPhoneNumberValid(false);
      setShipperPhoneNumberValidErrMsg(errMsg);
    } else {
      setShipperPhoneNumberValid(true);
    }
  }, []);
  const handleRecipientNameValueChange = useCallback((value: string) => {
    setRecipientName(value);

    const errMsg = validateName(value);
    if (errMsg) {
      setRecipientNameValid(false);
      setRecipientNameValidErrMsg(errMsg);
    } else {
      setRecipientNameValid(true);
    }
  }, []);
  const handleRecipientAddressValueChange = useCallback((value: string) => {
    // TODO: get coordinate from address
    setRecipientAddress(value);

    const errMsg = validateAddress(value);
    if (errMsg) {
      setRecipientAddressValid(false);
      setRecipientAddressValidErrMsg(errMsg);
    } else {
      setRecipientAddressValid(true);
    }
  }, []);
  const handlePostalZipValueChange = useCallback((value: string) => {
    setPostalZip(value);

    const errMsg = validatePostalCode(value);
    if (errMsg) {
      setPostalZipValid(false);
      setPostalZipValidErrMsg(errMsg);
    } else {
      setPostalZipValid(true);
    }
  }, []);
  const handlePhoneNumberValueChange = useCallback((value: string) => {
    setPhoneNumber(value);

    const errMsg = validatePhoneNumber(value);
    if (errMsg) {
      setPhoneNumberValid(false);
      setPhoneNumberValidErrMsg(errMsg);
    } else {
      setPhoneNumberValid(true);
    }
  }, []);

  useEffect(() => {
    switch (props.page) {
      case PAGE.SHIPMENT_FORM:
        handleSenderNameValueChange(senderName);
        handleSenderAddressValueChange(senderAddress);
        handleShipperPhoneNumberValueChange(shipperPhoneNumber);
        break;
      case PAGE.RECIPIENT_FORM:
        handleRecipientNameValueChange(recipientName);
        handleRecipientAddressValueChange(recipientAddress);
        handlePostalZipValueChange(postalZip);
        handlePhoneNumberValueChange(phoneNumber);
        break;
      case PAGE.REVIEW_ORDER:
        break;
    }
  }, [props.page]);

  const handlePress = useCallback(() => {}, []);

  return (
    <View style={[styles.root, props.styles]}>
      {props.page === PAGE.SHIPMENT_FORM && (
        <Input
          title={'Sender Name'}
          type={'Account Name'}
          value={senderName}
          onValueChange={handleSenderNameValueChange}
          valid={senderNameValid}
          errMsg={senderNameValidErrMsg}
          placeholder={'Full Name'}
        />
      )}

      {props.page === PAGE.SHIPMENT_FORM && (
        <Input
          title={'Address'}
          type={'Address'}
          value={senderAddress}
          valid={senderAddressValid}
          errMsg={senderAddressValidErrMsg}
          placeholder={'Shipping From'}
          onValueChange={handleSenderAddressValueChange}
        />
      )}

      {props.page === PAGE.SHIPMENT_FORM && (
        <Input
          title={'Shipper Phone Number'}
          type={'Phone Number'}
          value={shipperPhoneNumber}
          onValueChange={handleShipperPhoneNumberValueChange}
          valid={shipperPhoneNumberValid}
          errMsg={shipperPhoneNumberValidErrMsg}
          placeholder={'XXXXXXXXXXX'}
        />
      )}

      {props.page === PAGE.SHIPMENT_FORM && (
        <ItemType checkedItemType={itemType} onPress={setItemType} />
      )}

      {props.page === PAGE.SHIPMENT_FORM && (
        <PackageSize checkedSize={packageSize} onPress={setPackageSize} />
      )}

      {props.page === PAGE.RECIPIENT_FORM && (
        <Input
          title={'Recipient Name'}
          type={'Account Name'}
          value={recipientName}
          onValueChange={handleRecipientNameValueChange}
          valid={recipientNameValid}
          errMsg={recipientNameValidErrMsg}
          placeholder={'Full Name'}
        />
      )}

      {props.page == PAGE.RECIPIENT_FORM && (
        <Input
          title={'Address'}
          type={'Address'}
          value={recipientAddress}
          valid={recipientAddressValid}
          errMsg={recipientAddressValidErrMsg}
          placeholder={'Shipping Destination'}
          onValueChange={handleRecipientAddressValueChange}
        />
      )}

      {props.page === PAGE.RECIPIENT_FORM && (
        <Input
          title={'Postal Zip'}
          type={'Postal Zip'}
          value={postalZip}
          onValueChange={handlePostalZipValueChange}
          valid={postalZipValid}
          errMsg={postalZipValidErrMsg}
          placeholder={'XXXXX'}
        />
      )}

      {props.page === PAGE.RECIPIENT_FORM && (
        <Input
          type={'Phone Number'}
          title={'Phone Number'}
          value={phoneNumber}
          onValueChange={handlePhoneNumberValueChange}
          valid={phoneNumberValid}
          errMsg={phoneNumberValidErrMsg}
          placeholder={'XXXXXXXXXXX'}
        />
      )}

      {props.page === PAGE.REVIEW_ORDER && (
        <Info
          icon={shipper}
          title={'Shipper'}
          header={senderName}
          subHeader={shipperPhoneNumber}
          detail={senderAddress}
        />
      )}

      {props.page === PAGE.REVIEW_ORDER && (
        <Info
          icon={recipient}
          title={'Recipient'}
          header={recipientName}
          subHeader={phoneNumber}
          detail={`${recipientAddress},${postalZip}`}
        />
      )}

      {props.page === PAGE.REVIEW_ORDER && (
        <Info
          icon={packageSizeInfo['icon']}
          title={'Package Information'}
          header={`${packageSizeInfo.name} ${packageSizeInfo.label}`}
          detail={itemTypeInfo.txt}
        />
      )}

      {props.page !== PAGE.REVIEW_ORDER && (
        <PrimaryButton
          onPress={props.onFlip}
          styles={styles.primaryButton}
          disabled={disabled}
          text={'Next'}
        />
      )}

      {props.page === PAGE.REVIEW_ORDER && <Line />}

      {props.page === PAGE.REVIEW_ORDER && (
        <Price boxiRegularPrice={packageSizeInfo.price} />
      )}

      {props.page === PAGE.REVIEW_ORDER && (
        <PrimaryButton
          onPress={handlePress}
          styles={styles.primaryButton}
          disabled={disabled}
          text={'Create Order'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 24,
  },
  primaryButton: {
    marginTop: 16,
  },
});
