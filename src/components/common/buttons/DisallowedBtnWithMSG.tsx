import React, { useState } from 'react';
import { Button, Popover } from 'antd';

interface compProps {
  text: string;
  style: string;
  message: string;
}

const DisallowedBtnWithMSG: React.FC<compProps> = ({
  text,
  style,
  message,
}) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title={message}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {/* <Button type="primary" className={style}>
        {text}
      </Button> */}
      <button type="button" className={style}>
        {text}
      </button>
    </Popover>
  );
};

export default DisallowedBtnWithMSG;
