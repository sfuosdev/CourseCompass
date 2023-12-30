// Grab user data

const FavouriteCoursesList = () => {
    //Grab user data for Favourite course
    // or grab reviews??
    
    const courseList = "";

    return (
        <div className="flex flex-col pt-3 pb-5 px-2 m-3 border shadow-md rounded-lg w-4/5">
            <div className="py-3 font-medium text-[22px]">Favourites</div>
            <hr></hr>
            <div>
                {courseList === ""? "No favourite courses found": "coursList"}
            </div>
        </div>
    );
}

export default FavouriteCoursesList;