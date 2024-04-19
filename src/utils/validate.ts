export function validatePhoneNumber(phoneNumber: string): string | null {
  const regex = /^1[3-9]\d{9}$/;
  if (!regex.test(phoneNumber)) {
    return 'The format of the cell phone number is not correct, it should be 11 digits and start with 13-19';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  // 正则表达式：电子邮箱地址校验
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    // 如果不匹配，检查具体原因
    if (!/^[a-zA-Z0-9._%+-]+$/.test(email.split('@')[0])) {
      return 'The username portion of an e-mail address can only contain letters, numbers, dots, percent signs, plus signs, hyphens, and underscores.';
    } else if (
      email.split('@')[1] &&
      !/[a-zA-Z0-9.-]+$/.test(email.split('@')[1].split('.')[0])
    ) {
      return 'The domain name portion of an e-mail address can only contain letters, numbers and dots';
    } else if (!/\.[a-zA-Z]{2,}$/.test(email)) {
      return 'The e-mail address must contain a top-level domain name with at least a two-letter suffix';
    } else {
      return 'Incorrectly formatted e-mail address';
    }
  }

  return null; // 匹配成功则返回null
}

export function validatePassword(password: string): string | null {
  // 正则表达式：密码必须包含至少一个小写字母、一个大写字母和一个数字，长度在8到16个字符之间
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

  if (!passwordRegex.test(password)) {
    // 如果不匹配，检查具体原因
    if (password.length < 8 || password.length > 16) {
      return 'Passwords must be between 8 and 16 characters in length';
    } else if (!/[a-z]/.test(password)) {
      return 'Passwords must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      return 'Passwords must contain at least one uppercase letter';
    } else if (!/\d/.test(password)) {
      return 'The password must contain at least one number';
    } else {
      return 'Incorrect password format';
    }
  }

  return null; // 匹配成功则返回null
}

export function validateAccountName(accountName: string): string | null {
  // 正则表达式：账户名称只能包含字母、数字和下划线，长度在4到16个字符之间
  const regex = /^[a-zA-Z0-9_]{4,16}$/;

  if (!regex.test(accountName)) {
    // 如果不匹配，检查具体原因
    if (accountName.length < 4) {
      return 'Account name must be at least 4 characters in length';
    } else if (accountName.length > 16) {
      return 'The account name must not exceed 16 characters in length';
    } else if (!/^[a-zA-Z0-9_]+$/.test(accountName)) {
      return 'Account names can only contain letters, numbers and underscores';
    } else {
      // 如果前面的条件都不满足，但整体不匹配，则可能是其他复杂情况
      return 'Incorrectly formatted account name';
    }
  }

  return null; // 匹配成功则返回null
}

export function validateName(name: string): string | null {
  const regex = /^[\u4e00-\u9fa5]{2,3}$/;
  if (!regex.test(name)) {
    if (name.length < 2 || name.length > 3) {
      return 'The length of the name does not meet the requirements, it should be 2 to 3 Chinese characters';
    } else if (!/[\u4e00-\u9fa5]/.test(name)) {
      return 'Names should contain only Chinese characters';
    } else {
      return 'Incorrectly formatted name';
    }
  }
  return null; // 如果姓名匹配，返回null表示没有错误
}

export function validateAddress(address: string): string | null {
  const regex = /^[\u4e00-\u9fa5\d\s]+$/;
  if (!regex.test(address)) {
    if (!/[\u4e00-\u9fa5]/.test(address)) {
      return 'The address should contain at least one Chinese character';
    } else if (!/\d/.test(address)) {
      return 'The address should contain at least one number';
    } else if (!/\s/.test(address)) {
      return 'The address should contain at least one space to separate the different sections';
    } else {
      return 'The address is not in the correct format, please check your inputs';
    }
  }
  return null; // 如果地址匹配，返回null表示没有错误
}

export function validatePostalCode(postalCode: string): string | null {
  const regex = /^\d{6}$/;
  if (!regex.test(postalCode)) {
    if (postalCode.length !== 6) {
      return 'The length of the postal code is incorrect, it should be 6 digits';
    } else if (!/^\d+$/.test(postalCode)) {
      return 'Postal codes should contain only numbers';
    } else {
      return 'Incorrectly formatted postal code';
    }
  }
  return null; // 如果邮政编码匹配，返回null表示没有错误
}

export function validatePackageId(packageId: string): string | null {
  // 正则表达式：包裹ID格式为 "BX-" 后面跟着 8 个字母或数字
  const regex = /^BX-[A-Za-z0-9]{8}$/;

  if (!regex.test(packageId)) {
    // 如果不匹配，检查具体原因
    if (!packageId.startsWith('BX-')) {
      return 'Package ID must start with "BX-"';
    } else if (packageId.length !== 11) {
      return 'Package ID must be exactly 11 characters in length';
    } else if (!/^[A-Za-z0-9]+$/.test(packageId.slice(3))) {
      return 'Package ID must contain 8 letters or numbers after "BX-"';
    } else {
      // 如果前面的条件都不满足，但整体不匹配，则可能是其他复杂情况
      return 'Incorrectly formatted package ID';
    }
  }

  return null; // 匹配成功则返回null
}
