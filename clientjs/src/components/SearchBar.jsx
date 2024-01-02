const SearchBar = ({page}) => {
    switch (page) {
      case 'LandPage':
        return (
            <div
                className="flex inline-flex w-[80vw] md:w-[50vw] mt-[2rem] md:mt-[4rem]  rounded-md border-opacity-50 justify-center
            "
            >
                <svg
                className="relative inline right-[-2rem] md:right-[-2.5rem] mt-[0.5rem] color-black"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_13_778)">
                    <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#23272A" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.8032 15.8037L20.9998 21.0003" stroke="#23272A" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_13_778">
                    <rect width="24" height="24"/>
                    </clipPath>
                    </defs>
                </svg>
                <input
                type="text"
                placeholder="Search courses, professor, departments..."
                className="pl-[2.5rem] md:pl-[4rem] rounded w-full h-[2.5rem] left-2 bg-primary-whiteBlue text-black border border-black"
                />
            </div>
        )
      case 'other': 
      return (
        <div
            className="flex inline-flex h-[2.5rem] mt-[3.125rem] rounded-full
            "
            >
            <input
                type="text"
                placeholder="Search courses, professor, departments..."
                className="relative p-[1rem] w-[60vw] lg:w-[50vw] h-full rounded-full sm:ml-[1rem] md:ml-[0rem] border border-black"
            />
            <svg
                className="relative hidden left-[-2.5rem] mt-[0.5rem]
                                    lg:inline
            "
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
            >
                <path
                d="M19.125 19.125L13.375 13.375M1.875 8.58333C1.875 9.46428 2.04852 10.3366 
                2.38564 11.1505C2.72277 11.9644 3.2169 12.7039 3.83983 13.3268C4.46275 13.9498 5.20227 
                14.4439 6.01617 14.781C6.83006 15.1182 7.70238 15.2917 8.58333 15.2917C9.46428 15.2917 
                10.3366 15.1182 11.1505 14.781C11.9644 14.4439 12.7039 13.9498 13.3268 13.3268C13.9498 
                12.7039 14.4439 11.9644 14.781 11.1505C15.1182 10.3366 15.2917 9.46428 15.2917 8.58333C15.2917 
                7.70238 15.1182 6.83006 14.781 6.01617C14.4439 5.20227 13.9498 4.46275 13.3268 3.83983C12.7039 
                3.2169 11.9644 2.72277 11.1505 2.38564C10.3366 2.04852 9.46428 1.875 8.58333 1.875C7.70238 1.875 
                6.83006 2.04852 6.01617 2.38564C5.20227 2.72277 4.46275 3.2169 3.83983 3.83983C3.2169 4.46275 
                2.72277 5.20227 2.38564 6.01617C2.04852 6.83006 1.875 7.70238 1.875 8.58333Z"
                stroke="#ADADAD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </div>
        )
    }
    
}

export default SearchBar