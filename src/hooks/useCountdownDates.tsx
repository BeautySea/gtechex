import { useState, useEffect } from 'react';

function useCountdownDates(
  startUnixTimestamp: number,
  endUnixTimestamp: number,
  additionalProp?: any
) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [percentageRemaining, setPercentageRemaining] = useState<number>(100);

  useEffect(() => {
    // Function to calculate remaining days and percentage remaining
    const calculateRemainingTime = () => {
      // Convert start Unix timestamp to milliseconds
      const startMilliseconds = startUnixTimestamp * 1000;
      // Convert end Unix timestamp to milliseconds
      const endMilliseconds = endUnixTimestamp * 1000;

      // Calculate remaining milliseconds between end date and current date
      const remainingMilliseconds = Math.max(endMilliseconds - Date.now(), 0); // Ensure remaining time is not negative

      // Calculate remaining days
      const remainingDays = Math.ceil(
        remainingMilliseconds / (1000 * 60 * 60 * 24)
      );

      // Calculate percentage of days remaining
      const totalDurationMilliseconds = endMilliseconds - startMilliseconds;
      const percentageRemaining =
        (remainingMilliseconds / totalDurationMilliseconds) * 100;

      // Update formatted start and end dates
      const startDate = new Date(startMilliseconds).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      );
      const endDate = new Date(endMilliseconds).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      // Update state variables
      setStartDate(startDate);
      setEndDate(endDate);
      setRemainingDays(remainingDays);
      setPercentageRemaining(percentageRemaining);
    };

    // Call the function immediately to set initial values
    calculateRemainingTime();

    // Set up interval to update remaining time every hour
    const interval = setInterval(calculateRemainingTime, 1000 * 60 * 60); // Update every hour

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [startUnixTimestamp, endUnixTimestamp, additionalProp]);

  return { startDate, endDate, remainingDays, percentageRemaining };
}

export default useCountdownDates;
