export const updateCurrentTime = (settingAlarmTime: Date) => {
  // 막차 시간 임의로 설정ß
  const makchaTime = new Date('Wed Nov 23 2023 23:59:59 GMT+0900');
  const currentTime = new Date();
  console.log(currentTime);

  // 두 시간 사이의 차이 (밀리초)
  const timeDifferenceInMilliseconds =
    makchaTime.getTime() - currentTime.getTime();

  // 차이를 시간과 분으로 계산
  const newRestHour = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60)
  );
  const newRestMinute = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const formattedRestHour = String(newRestHour).padStart(2, '0');
  const formattedRestMinute = String(newRestMinute).padStart(2, '0');

  // restHour와 restMinute 상태 업데이트
  //   setRestHour(formattedRestHour);
  //   setRestMinute(formattedRestMinute);

  // 게이지 계산하기
  // 알람 시간을 Date 객체로 변환
  const alarmSettingTime2 = new Date(settingAlarmTime);
  // 게이지 전체값 계산
  const leftTime = makchaTime.getTime() - alarmSettingTime2.getTime();
  // 게이지 현재값 계산
  const currentLeftTime =
    ((currentTime.getTime() - alarmSettingTime2.getTime()) / leftTime) * 100;

  //   console.log(`타임 게이지: ${currentLeftTime}`);
  //   setTimeGage(currentLeftTime);

  return {
    formattedRestHour,
    currentLeftTime,
    alarmSettingTime2,
    formattedRestMinute,
  };
};
