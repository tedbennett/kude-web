import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Session } from "../types/Session";

export const AddSongTimer = (props: {
  session: Session;
  completion: () => void;
}) => {
  const [remaining, setRemaining] = useState(props.session.delay);
  const [percentage, setPercentage] = useState(0);

  const timeToString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const cached = localStorage.getItem("lastQueue");
      if (!cached) {
        props.completion();
        return;
      }

      const value = parseInt(cached);
      if (!value) {
        props.completion();
        return;
      }
      const interval = Math.floor((Date.now() - value) / 1000);
      const secondsLeft = props.session.delay - interval;
      if (secondsLeft < 0) {
        props.completion();
      }

      setRemaining(secondsLeft);
      setPercentage((100 * interval) / props.session.delay);
    };

    const interval = setInterval(() => calculateTimeRemaining(), 1000);
    return () => clearInterval(interval);
  }, [props]);

  return (
    <div className="w-full flex items-center bg-gray-100 dark:bg-dark_bg rounded-lg h-24 ">
      <div className="flex justify-center text-5xl font-semibold w-28 dark:text-white">
        <div className="w-16 h-16">
          <CircularProgressbar
            value={percentage}
            text={timeToString(remaining)}
            styles={{
              path: { stroke: "#A855F7" },
              trail: { stroke: "#A855F7", opacity: 0.2 },
              text: {
                fontStyle: "semibold",
                fontSize: "18px",
                fill: "#A855F7",
              },
            }}
          />
        </div>
      </div>
      <div className="text-lg font-semibold text-gray-500">Add to Queue</div>
    </div>
  );
};
