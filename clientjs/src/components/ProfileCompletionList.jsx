const ProfileCompletionList = ({ setViewSelector }) => {
  function handleScheduleClick() {
    setViewSelector(1);
  }
  function handleImportCoursesClick() {
    setViewSelector(2);
  }
  function handleMajorInfoClick() {
    setViewSelector(3);
  }

  return (
    <div className="flex flex-col pt-3 pb-5 pl-1 pr-2 m-2 border shadow-md rounded-lg">
      <div className="py-3 font-medium text-[22px]">Complete your Profile</div>
      <hr></hr>
      <div className="flex flex-col text-[18px]">
        <div className="flex py-2">
          <div className="px-2">Icon</div>
          <button onClick={handleScheduleClick}>Upload your schedule</button>
        </div>
        <div className="flex py-2">
          <div className="px-2">Icon</div>
          <button onClick={handleImportCoursesClick}>
            Import your previous courses
          </button>
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
          <button onClick={handleMajorInfoClick}>Add major info</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionList;
