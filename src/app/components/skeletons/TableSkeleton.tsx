import { CountryRowSkeleton } from "./CountryRowSkeleton";

const tableBodyLength = 10;

export default function TableSkeleton() {
  return (
    <div className='max-h-[30rem] overflow-y-auto'>
        <table className='table-auto w-full lg:w-[40rem] border-collapse'>
            <thead>
                <tr className='text-left border-b-2 border-b-shuttle-gray'>
                    <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>Flag</th>
                    <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>Name</th>
                    <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>Population</th>
                    <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>Area (km²)</th>
                    <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>Region</th>
                </tr>
            </thead>
            <tbody className="w-[40rem]">
                {[...Array(tableBodyLength)].map((_, index) => (
                    <CountryRowSkeleton key={index} index={index}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}

