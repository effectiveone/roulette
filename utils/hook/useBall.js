import { useState, useEffect } from "react";

const useBall = (selectedReward, onFinish) => {
  const [angle, setAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    if (selectedReward) {
      setIsAnimating(true);

      // Calculate angle based on selected reward
      const sweepAngle = 360 / 38; // assuming there are 38 fields in the roulette
      const rotateAngle = (selectedReward.index + 0.5) * sweepAngle;
      const fullRounds = 4; // number of full rounds before stopping
      const targetAngle = rotateAngle + fullRounds * 360;

      // Start animation
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const progressAngle = (progress / 3000) * (targetAngle - angle);
        setAngle(angle + progressAngle);
        if (progress < 3000) {
          requestAnimationFrame(animate);
        } else {
          onFinish();
        }
      };
      requestAnimationFrame(animate);
    }
  }, [selectedReward, angle, onFinish]);

  return [angle, isAnimating, handleAnimationEnd];
};

export default useBall;
