import React, { useEffect, useState } from 'react';

const Timer = ({ onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 50 segundos para teste
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('10');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          onTimerEnd(); // Chama a função passada como prop quando o tempo acabar
          return 0; // Para evitar valores negativos
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Limpeza do intervalo ao desmontar
  }, [onTimerEnd]);

  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    setMinutes(mins < 10 ? `0${mins}` : mins);
    setSeconds(secs < 10 ? `0${secs}` : secs);
  }, [timeLeft]);

  return (
    <div>
      <h1>{minutes}:{seconds}</h1>
    </div>
  );
};

export default Timer;