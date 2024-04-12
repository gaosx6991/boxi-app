import {MillisecondTimestamp} from '../types';

export function formatTimeAgo(timestamp: MillisecondTimestamp): string {
  const currentTime = Date.now();
  const timeDiff = currentTime - (timestamp as unknown as number);

  // 定义时间单位的毫秒数
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDiff < minute) {
    const seconds = Math.floor(timeDiff / 1000);
    return `${seconds} seconds ago`;
  } else if (timeDiff < hour) {
    const minutes = Math.floor(timeDiff / minute);
    return `${minutes} mins ago`;
  } else if (timeDiff < day) {
    const hours = Math.floor(timeDiff / hour);
    return `${hours} hours ago`;
  } else if (timeDiff < week) {
    const days = Math.floor(timeDiff / day);
    return `${days} days ago`;
  } else if (timeDiff < month) {
    const weeks = Math.floor(timeDiff / week);
    return `${weeks} weeks ago`;
  } else if (timeDiff < year) {
    const months = Math.floor(timeDiff / month);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDiff / year);
    return `${years} years ago`;
  }
}

export function formatDate(timestamp: MillisecondTimestamp): string {
  // 创建一个Date对象，使用Unix时间戳（以毫秒为单位）
  const date = new Date(timestamp as unknown as number);

  // 获取年、月、日
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()返回的月份是从0开始的，所以需要+1
  const day = String(date.getDate()).padStart(2, '0');

  // 获取当前日期与今天是否相同
  const today = new Date();
  const isToday =
    year === today.getFullYear() &&
    month === String(today.getMonth() + 1).padStart(2, '0') &&
    day === String(today.getDate()).padStart(2, '0');

  // 根据是否是今天，格式化日期字符串
  let formattedDate = isToday
    ? 'Today'
    : `${day} ${
        monthShortNames[month as keyof typeof monthShortNames]
      } ${year}`;

  // 获取小时、分钟和秒
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 拼接最终的字符串
  return `${formattedDate}, ${hours}:${minutes}:${seconds}`;
}

export function formatDatetime(timestamp: MillisecondTimestamp): string {
  const date = new Date(timestamp as unknown as number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (
    year === currentYear &&
    month === String(currentMonth).padStart(2, '0') &&
    day === String(currentDay).padStart(2, '0')
  ) {
    // 如果是今天，只显示时间
    return `${hours}.${minutes}`;
  } else if (year === currentYear) {
    // 如果是今年但不是今天，显示月日和时间
    return `${month}-${day} ${hours}.${minutes}`;
  } else {
    // 如果不是今年，显示完整的年月日和时间
    return `${year}-${month}-${day} ${hours}.${minutes}`;
  }
}

export function formatUnixTimestampToDateString(
  timestamp: MillisecondTimestamp,
): string {
  const date = new Date(timestamp as unknown as number);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  return date.toLocaleDateString(
    'en-US',
    options as Intl.DateTimeFormatOptions,
  );
}

// 定义月份的简写
const monthShortNames = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};
