export const formattingBoardingTime = (
  time: string | undefined,
  type: string | undefined
) => {
  if (typeof time === 'string' && typeof type === 'string') {
    if (type === '지하철') {
      const hours = parseInt(time?.substring(0, 2), 10);
      const minutes = parseInt(time?.substring(2, 4), 10);
      const meridiem = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 24 === 0 ? '00' : hours % 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${meridiem} ${formattedHours}:${formattedMinutes}`;
    } else if (time === 'undefined') {
      return '막차 시간이 없습니다.';
    } else {
      const [hour, minute] = time.split(':').map(Number);
      const period = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour % 12 || 12;

      return `${period} ${formattedHour}:${String(minute).padStart(2, '0')}`;
    }
  } else {
    return '출, 도착지가 700m 이내입니다.';
  }
};

export const formattingTimeTaken = (time: number | undefined) => {
  if (typeof time === 'number') {
    if (time < 60) {
      return `${time}분`;
    } else {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      if (minutes === 0) {
        return `${hours}시간`;
      } else {
        return `${hours}시간 ${minutes}분`;
      }
    }
  } else {
    return 0;
  }
};

export const formattingRemainTime = (
  boardingTime: string | undefined,
  timeTaken: number | undefined,
  type: string | undefined
) => {
  if (
    typeof boardingTime === 'string' &&
    typeof timeTaken === 'number' &&
    typeof type === 'string'
  ) {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}${minutes}`;
    };
    const currentTime = getCurrentTime();
    const hoursNow = parseInt(currentTime.substring(0, 2), 10);
    const minutesNow = parseInt(currentTime.substring(2, 4), 10);
    const currentDate = new Date();
    currentDate.setHours(hoursNow, minutesNow, 0);

    if (type === '지하철') {
      const hoursBoarding = parseInt(boardingTime?.substring(0, 2) ?? '0', 10);
      const minutesBoarding = parseInt(
        boardingTime?.substring(2, 4) ?? '0',
        10
      );
      const boardingDate = new Date();
      boardingDate.setHours(hoursBoarding, minutesBoarding, 0);
      const remainingTime =
        boardingDate.getTime() - currentDate.getTime() + timeTaken * 60 * 1000;
      const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
      const remainingMinutes = Math.floor(
        (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      if (remainingHours >= 1) {
        return `${remainingHours}시간 ${remainingMinutes}분`;
      } else {
        return `${remainingMinutes}분`;
      }
    } else {
      const [hour, minute] = boardingTime?.split(':');
      const boardingDate = new Date();
      boardingDate.setHours(Number(hour), Number(minute), 0);
      const remainingTime =
        boardingDate.getTime() - currentDate.getTime() + timeTaken * 60 * 1000;
      const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
      const remainingMinutes = Math.floor(
        (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      if (remainingHours >= 1) {
        return `${remainingHours}시간 ${remainingMinutes}분`;
      } else {
        return `${remainingMinutes}분`;
      }
    }
  } else {
    return '출,도착지가 700m 이내입니다.';
  }
};
