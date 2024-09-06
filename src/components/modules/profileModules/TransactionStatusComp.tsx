import React, { useEffect, useState } from 'react';

interface compProps {
  status: string;
}

const TransactionStatusComp = ({ status }: compProps) => {
  const [statusColor, setStatusColor] = useState('');
  // text-[#219653]
  useEffect(() => {
    switch (status) {
      case 'Successful':
        setStatusColor('#219653');
        break;
      case 'Failed':
        setStatusColor('#EB5757');
        break;
      case 'Pending':
        setStatusColor('#EEBA1B');
        break;
      default:
        setStatusColor('#131D26');
        break;
    }
  }, [status]);
  return <span className={`text-[${statusColor}]`}>{status}</span>;
};

export default TransactionStatusComp;
