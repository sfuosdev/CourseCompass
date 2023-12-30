"use client";

import ProfileHero from "@/components/ProfileHero"
import ProfileCompletionList from "@/components/ProfileCompletionList";
import FavouriteCoursesList from "@/components/FavouriteCoursesList";
import { useState } from "react"

const userInfo = {
    fullname: "Peter Chan",
    email: "peterchan214@gmail.com",
    credits: 40,
    year: "2",
    major: "Computer Science",
    minor: "",
    schedule: "",
    coursereviews: [],
    professorreviews: [],
}

const year = () => {
    switch (userInfo.year) {
        case 1: return "1 "
    }
}

function UploadScheduleView() {
    return (
        <div className="relative flex flex-col">
            <div className="font-medium text-[25px]">Pick an option to get started</div>
            <div className="font-normal text-[18px]">Input your previous course history</div>
            <div className="bg-gray flex">
                <div className="">Change to input</div>
                <div className="">
                    <div className="">

                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
            <div className="bg-gray">

            </div>
        </div>
    );
}

function SwitchComponent({ viewSelector }) {
    switch(viewSelector) {
        case 1:
            return <UploadScheduleView />;
        case 2:
            return <ImportCoursesView />;
        case 3:
            return <MajorInfoView />;
        default:
            return (userInfo.schedule === ""? "":<UploadScheduleView />)
    } 
}

export default function Profile() {
    const [viewSelector, setViewSelector] = useState(0);

    return (
        <>
            <ProfileHero fullname={userInfo.fullname} email={userInfo.email} />

            <div className="grid grid-cols-4 md:h-screen">
                <div className="col-span-3">
                    <SwitchComponent viewSelector={viewSelector} />
                </div>
                <div className="flex flex-col">
                    <ProfileCompletionList setViewSelector={setViewSelector}/>
                    <FavouriteCoursesList setViewSelector={setViewSelector}/>
                </div>
            </div>
        </>
    )
}