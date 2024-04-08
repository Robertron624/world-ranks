interface CountryRowSkeletonProps {
  index?: number;
}

export function CountryRowSkeleton({ index }: CountryRowSkeletonProps) {
  return (
    <tr className='items-center justify-between py-4'>
      <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"} text-[0] animate-pulse duration-300`}>
        100000
        <span className='w-8 h-8 bg-center bg-no-repeat bg-cover rounded-full block bg-light-grayish-blue'></span>
      </td>
      <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"} text-[0] animate-pulse duration-300`}>
        100000
        <span className='w-20 h-4 bg-light-grayish-blue block mt-2 rounded-md'></span>
      </td>
      <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"} text-[0] animate-pulse duration-300`}>
        100000
        <span className='w-28 h-4 bg-light-grayish-blue block mt-2 rounded-md'></span>
      </td>
      <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"} text-[0] animate-pulse duration-300`}>
        <span className='w-26 h-4 bg-light-grayish-blue block mt-2 rounded-md'></span>
      </td>
      <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"} text-[0] animate-pulse duration-300`}>
      <span className='w-24 h-4 bg-light-grayish-blue block mt-2 rounded-md'></span>
      </td>
    </tr>
  );
}
