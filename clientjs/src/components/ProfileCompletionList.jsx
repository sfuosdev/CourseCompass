const ProfileCompletionList = ({ setViewSelector }) => {

    return (
        <div className="pt-3 pb-5 px-2 m-3 flex flex-col border shadow-md rounded-lg w-4/5">
            <div className="py-3 font-medium text-[22px]">Complete your Profile</div>
            <hr></hr>
            <div className="flex flex-col text-[18px]">
                <div className="flex py-2">
                    <div className="px-2">Icon</div>
                    <div>
                        Upload your schedule
                    </div>
                </div>
                <div className="flex py-2">
                    <div className="px-2">Icon</div>
                    <div>
                        Import your previous courses
                    </div>
                </div>
                <div className="flex py-2">
                    <div className="px-2">Icon</div>
                    <div>Add a rating for a course</div>
                </div>
                <div className="flex py-2">
                    <div className="px-2">Icon</div>
                    <div>Add a rating for a professor</div>
                </div>
                <div className="flex py-2">
                    <div className="px-2">Icon</div>
                    <div>Add major info</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCompletionList;