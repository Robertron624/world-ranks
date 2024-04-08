export function CountryRowSkeleton() {

    return(
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-shuttle-gray rounded-full"></div>
                <div className="ml-4 w-20 h-2 bg-shuttle-gray rounded-md"></div>
            </div>
            <div className="w-20 h-2 bg-shuttle-gray rounded-md"></div>
        </div>
    )
}