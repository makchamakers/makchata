export const formattingBoardingTime = (time: string, type: string) => {
  if (type === '지하철') {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(2, 4), 10);
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 24 === 0 ? '00' : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${meridiem} ${formattedHours}:${formattedMinutes}`;
  } else {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;

    return `${period} ${formattedHour}:${String(minute).padStart(2, '0')}`;
  }
};

export const formattingTimeTaken = (time: number) => {
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
};

export const formattingRemainTime = (
  boardingTime: string,
  timeTaken: number,
  type: string
) => {
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
    const hoursBoarding = parseInt(boardingTime.substring(0, 2), 10);
    const minutesBoarding = parseInt(boardingTime.substring(2, 4), 10);
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
    const [hour, minute] = boardingTime.split(':');
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
};
