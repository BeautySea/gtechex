import React from 'react';
import TransactionStatusComp from './TransactionStatusComp';

const TransactionHistoryTable = () => {
  const transactionHistory = [
    {
      id: 1,
      planeName: 'Premium',
      amount: '5,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 2,
      planeName: 'Premium',
      amount: '5,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 3,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 4,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Failed',
    },
    {
      id: 5,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Pending',
    },
    {
      id: 6,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 7,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 8,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Successful',
    },
    {
      id: 9,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Failed',
    },
    {
      id: 10,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Failed',
    },
    {
      id: 11,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Pending',
    },
    {
      id: 12,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Pending',
    },
    {
      id: 13,
      planeName: 'Basic',
      amount: '3,000.00',
      date: 'February, 2nd, 2024',
      status: 'Pending',
    },
  ];

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-[682px] mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <thead className="text-xs text-[#8D8E91] font-medium uppercase bg-[#A8A8AB14]">
            <tr className="border border-[#E5E6EC]">
              <th
                scope="col"
                className="px-4 py-3 text-[#414343] text-xs font-medium border border-[#E5E6EC]"
              >
                S/N
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[#414343] text-xs font-medium border border-[#E5E6EC]"
              >
                Plan Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[#414343] text-xs font-medium border border-[#E5E6EC]"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[#414343] text-xs font-medium border border-[#E5E6EC]"
              >
                Transaction Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[#414343] text-xs font-medium border border-[#E5E6EC]"
              >
                Transaction Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory
              ? transactionHistory?.map((item) => (
                  <tr
                    className="bg-white border border-[#E5E6EC] hover:bg-gray-50"
                    key={item?.id}
                  >
                    <th
                      scope="row"
                      className="px-[12px] py-[14px] font-normal text-xs text-[#131D26] border font-normal text-xs text-[#131D26] border-[#E5E6EC]"
                    >
                      {item?.id}
                    </th>
                    <td className="px-[12px] py-[14px] border font-normal text-xs text-[#131D26] border-[#E5E6EC]">
                      {item?.planeName}
                    </td>
                    <td className="px-[12px] py-[14px] border font-normal text-xs text-[#131D26] border-[#E5E6EC]">
                      ${item?.amount}
                    </td>
                    <td className="px-[12px] py-[14px] border font-normal text-xs text-[#131D26] border-[#E5E6EC]">
                      {item?.date}
                    </td>
                    <td className="px-[12px] py-[14px] border font-normal text-xs border-[#E5E6EC]">
                      <TransactionStatusComp status={item?.status} />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistoryTable;
