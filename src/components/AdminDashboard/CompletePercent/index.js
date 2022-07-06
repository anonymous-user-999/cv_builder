import React from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';

const CompletePercent = ({
  percentage,
  height,
  width,
  fontSize,
  strokeWidth,
}) => {
  return (
    <div
      style={{
        height: height ? `${height}px` : '66px',
        width: width ? `${width}px` : '66px',
      }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={strokeWidth ? strokeWidth : 11}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.55,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'round',

          // Text size
          textSize: fontSize ? `${fontSize}px` : '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `rgba(0, 184, 132, ${percentage / 100})`,
          textColor: '#2B2E35',
          trailColor: '#CCF1E6',
          backgroundColor: '#00B884',
        })}
      />
    </div>
  );
};

export default CompletePercent;
