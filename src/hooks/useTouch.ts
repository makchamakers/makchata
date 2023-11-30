import { useEffect, useState } from 'react';

interface ITouchHandlers {
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

interface UseTouchResult {
  isPressed: boolean;
  touchHandlers: ITouchHandlers;
}

const useTouch = (): UseTouchResult => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = (): void => {
    setIsPressed(true);
    console.log(isPressed, 'start');
  };

  const handleTouchEnd = (): void => {
    setIsPressed(false);
    console.log(isPressed, 'end');
  };

  const touchHandlers: ITouchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  return {
    isPressed,
    touchHandlers,
  };
};

export default useTouch;
