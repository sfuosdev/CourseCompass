"use client"
import { useState } from "react";

const PlanningForm = () => {
    return (
        <div>
            
        </div>
    );
}
const RecommendedCourse = () => {
    
}
const NextSemsterDonots = () => {
    
}
const NextSemsterWants = () => {
    
}
const FinalizeSelection = () => {
    
}
const PropsedSchedule = () => {
    
}
const SaveNEnd = () => {
    
}
const Start = ({ setStep }) => {
    const handleClick = () => {
        setStep(1);
        
    }

    return (
        <div className="flex flex-col items-center w-full h-full bg-gray-300">
            <span className="text-[50px] font-bold">Welcome to Course Planning</span>
            <div className="bg-gray-400 w-full h-full">
                <button onClick={handleClick}>Click to Get Started</button>
            </div>
        </div>
    );
}


export default function DegreePlanner() {
    const [step, setStep] = useState(0);

    const selection = () => {
        switch(step) {
            case 1:
                return <PlanningForm  />
            case 2:
                return <RecommendedCourse />
            case 3:
                return <NextSemsterDonots />
            case 4:
                return <NextSemsterWants />
            case 5:
                return <FinalizeSelection />
            case 6:
                return <PropsedSchedule />
            case 7:
                return <SaveNEnd />
            default:
                return <Start setStep={setStep} />
            
        }
    }

    return (
        <div className="w-screen h-screen">
            {selection()}
        </div>
    );
}