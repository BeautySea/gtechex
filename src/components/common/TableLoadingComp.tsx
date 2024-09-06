/* eslint-disable no-useless-escape */
import SkeletonInput from 'antd/es/skeleton/Input';

const TableLoadingComp = () => {
  return (
    <>
      <div className="mt-5">
        <table className="w-full text-sm text-left rtl:text-right rounded ">
          <thead className="text-xs text-[#414343] uppercase bg-[#A8A8AB14] border border-[#E5E6EC] leading-5 font-medium">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 border border border-[#E5E6EC]"
              >
                <SkeletonInput active />
              </th>
              <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                <SkeletonInput active />
              </th>{' '}
              <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                <SkeletonInput active />
              </th>{' '}
              <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                <SkeletonInput active />
              </th>{' '}
              <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                <SkeletonInput active />
              </th>{' '}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border border-[#E5E6EC] hover:bg-gray-50 w-auto">
              <td className="w-4 px-3 py-2 border border-[#E5E6EC]">
                <SkeletonInput active />
              </td>
              <td className="px-3 py-2 border border-[#E5E6EC] text-[#131D26] text-xs w-4">
                <SkeletonInput active />
              </td>
              <td className="px-3 py-2  text-[#131D26] text-sm font-semibold flex items-center gap-[4px]">
                <SkeletonInput active />
              </td>
              <td className="px-3 py-2 border border-[#E5E6EC] space-x-2 lg:w-[250px]">
                <SkeletonInput active />
              </td>
              <td className="px-3 py-2 border border-[#E5E6EC] lg:w-[150px]">
                <SkeletonInput active />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableLoadingComp;
