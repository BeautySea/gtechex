// import React from 'react';

// const MofiedApplyListTable = () => {
//   return (
//     <div>

//     </div>
//   );
// }

// export default ;
import React, { useState } from 'react';
import { Space, Switch, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.ReactNode;
  serialNo: number;
  jobTitle: string;
  timePosted: string;
  worktype: string;
  companyName: string;
  jobLink: string;
}

const columns: TableColumnsType<any> = [
  {
    title: 'S/N',
    dataIndex: 'serialNo',
    key: 'serialNo',
  },
  {
    title: 'Job Title',
    dataIndex: 'jobTitle',
    key: 'jobTitle',
  },
  {
    title: 'Time Posted',
    dataIndex: 'timePosted',
    key: 'timePosted',
  },
  {
    title: 'Work Type',
    dataIndex: 'worktype',
    key: 'worktype',
    // width: '12%',
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    // width: '30%',
    key: 'companyName',
  },
  {
    title: 'Job Link',
    dataIndex: 'jobLink',
    // width: '30%',
    key: 'jobLink',
  },
];

const data: DataType[] = [
  {
    key: 1,
    serialNo: 1,
    jobTitle: 'Product Designer',
    timePosted: '5 mins ago',
    worktype: 'Remote',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    key: 2,
    serialNo: 2,
    jobTitle: 'Product Designer',
    timePosted: '5 mins ago',
    worktype: 'Remote',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    key: 3,
    serialNo: 3,
    jobTitle: 'Product Designer',
    timePosted: '5 mins ago',
    worktype: 'Remote',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    key: 4,
    serialNo: 4,
    jobTitle: 'Product Designer',
    timePosted: '5 mins ago',
    worktype: 'Remote',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  //   {
  //     key: 1,
  //     name: 'John Brown sr.',
  //     age: 60,
  //     address: 'New York No. 1 Lake Park',
  //     children: [
  //       {
  //         key: 11,
  //         name: 'John Brown',
  //         age: 42,
  //         address: 'New York No. 2 Lake Park',
  //       },
  //       {
  //         key: 12,
  //         name: 'John Brown jr.',
  //         age: 30,
  //         address: 'New York No. 3 Lake Park',
  //         children: [
  //           {
  //             key: 121,
  //             name: 'Jimmy Brown',
  //             age: 16,
  //             address: 'New York No. 3 Lake Park',
  //           },
  //         ],
  //       },
  //       {
  //         key: 13,
  //         name: 'Jim Green sr.',
  //         age: 72,
  //         address: 'London No. 1 Lake Park',
  //         children: [
  //           {
  //             key: 131,
  //             name: 'Jim Green',
  //             age: 42,
  //             address: 'London No. 2 Lake Park',
  //             children: [
  //               {
  //                 key: 1311,
  //                 name: 'Jim Green jr.',
  //                 age: 25,
  //                 address: 'London No. 3 Lake Park',
  //               },
  //               {
  //                 key: 1312,
  //                 name: 'Jimmy Green sr.',
  //                 age: 18,
  //                 address: 'London No. 4 Lake Park',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: 2,
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const MofiedApplyListTable: React.FC = () => {
  //   const [checkStrictly, setCheckStrictly] = useState(true);

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
    </>
  );
};

export default MofiedApplyListTable;
