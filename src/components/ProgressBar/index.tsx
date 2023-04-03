import React from 'react';
import { Progress } from 'antd';

interface progressBarInterface {
  progressPercent?: number;
}

const ProgressBar: React.FC<progressBarInterface> = ({ progressPercent }): JSX.Element => {
  return (
    <Progress
      percent={progressPercent}
      size="default"
      status="active"
      showInfo={false}
      strokeColor="#F7A920"
      trailColor="#BFBFBF"
    />
  );
};

export default ProgressBar;
