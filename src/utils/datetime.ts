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
