import SkeletonInput from 'antd/es/skeleton/Input';
import React from 'react';

const TableEmptyState = () => {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-[#5F5F5F]">
        <thead className="text-xs text-[#5F5F5F] uppercase border-b border-[#C5C5C5]">
          <tr>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
            <th scope="col" className="px-6 py-3">
              <SkeletonInput active />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
            >
              <SkeletonInput active />
            </th>
            <td className="px-6 py-4 flex gap-2">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
          </tr>
          <tr className="">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
            >
              <SkeletonInput active />
            </th>
            <td className="px-6 py-4 flex gap-2">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
          </tr>
          <tr className="">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
            >
              <SkeletonInput active />
            </th>
            <td className="px-6 py-4 flex gap-2">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
            <td className="px-6 py-4">
              <SkeletonInput active />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableEmptyState;
