import { motion } from "framer-motion";

const TitleLabel = ({ sectionSchedule, idx }) => {
  let title;
  if (idx === 0) {
    title = (
      <div className="inline-block font-semibold text-[15px] h-[20%] mb-[5px]">
        Lecture:
      </div>
    );
  } else {
    if (sectionSchedule[0].sectionCode === "LAB") {
      title = (
        <div className="inline-block font-semibold text-[15px] h-[25%] mb-[5px]">
          Labs:
        </div>
      );
    } else if (sectionSchedule[0].sectionCode === "TUT") {
      title = (
        <div className="inline-block font-semibold text-[15px] h-[25%] mb-[5px]">
          Tutorials:
        </div>
      );
    }
  }

  return title;
};

const ClassSchedule = ({ offering }) => {
  const schedule = offering.courseSchedule.map((sectionSchedule, idx) => (
    <div
      key={`${offering.name}-${offering.sections[idx]}`}
      className="flex flex-col mb-[10px]"
    >
      {idx <= 1 ? (
        <TitleLabel sectionSchedule={sectionSchedule} idx={idx} />
      ) : (
        ""
      )}
      {offering.sections[idx]}:
      {sectionSchedule.map((dailySchedule, idx2) => (
        <div key={`${offering.name}-${offering.sections[idx]}-${idx2}`}>
          {dailySchedule.days}: {dailySchedule.startTime}-
          {dailySchedule.endTime}
        </div>
      ))}
    </div>
  ));

  return schedule;
};

const ProfessorCard = ({ course }) => {
  const hoverAnimation = {
    scale: 1.05, // Slightly enlarge the card on hover
    transition: {
      duration: 0.3, // Duration of the animation
      type: "spring", // Type of the animation
    },
  };
  return (
    <div className={`flex flex-row gap-[20px]`}>
      {course?.offerings?.map((offering) => (
        <motion.div
          whileHover={hoverAnimation}
          className="flex flex-col round rounded-2xl w-[270px] h-[360px] bg-[#F3F4FA] pl-[18px] pr-[18px] pt-[25px] hover:bg-[#AAC2FD] hover:shadow-lg focus-within:bg-[#AAC2FD] overflow-y-auto"
          key={offering.instructor}
        >
          <div className="text-[30px] font-medium">{offering.instructor}</div>
          <div className="inline-block font-medium text-[15px] h-[5%]">
            Class Schedule:
          </div>
          <ClassSchedule offering={offering} />
        </motion.div>
      ))}
    </div>
  );
};
export default ProfessorCard;
