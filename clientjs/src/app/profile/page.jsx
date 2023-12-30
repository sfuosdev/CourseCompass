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
        <div className="bg-[#4D4D4D] h-[50%] w-auto">
            <div className="px-16 py-16">
                <div className="py-3 font-medium text-[25px]">Import an option to get started</div>
                <div className="pb-9 font-normal text-[18px]">Input your previous course history</div>
                <div className="bg-[#2D54A6] flex">
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
        </div>
    );
}
function ImportCoursesView() {
    return (
        <div className="bg-[#AAC2FD] h-[50%] w-auto">
            <div className="px-16 py-16">
                <div className="py-3 font-medium text-[25px]">Import an option to get started</div>
                <div className="pb-9 font-normal text-[18px]">Input your previous course history</div>
                <div className="bg-[#EAF0FF] flex">
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
        </div>
    );
}
function MajorInfoView() {
    return (
        <div className="bg-gray-200 h-[50%] w-auto">
            <div className="px-16 py-16">
                <div className="py-3 font-semibold text-[25px]">Add your degree information</div>
                <div className="pb-9 font-normal text-[16px]">Please provide additional information on your (intended) program, major(s), minor(s), specialization(s), and concentration(s).</div>
                <div className="bg-gray-400 flex h-[100px]">
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
    const [viewSelector, setViewSelector] = useState(1);

    return (
        <>
            <ProfileHero fullname={userInfo.fullname} email={userInfo.email} />

            <div className="grid grid-cols-4 md:h-screen">
                <div className="col-span-3">
                    <SwitchComponent viewSelector={viewSelector} />
                    {/* <MajorInfoView /> */}
                </div>
                <div className="flex flex-col">
                    <ProfileCompletionList setViewSelector={setViewSelector}/>
                    <FavouriteCoursesList setViewSelector={setViewSelector}/>
                </div>
            </div>
        </>
    )
}