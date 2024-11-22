"use client"
import { ScrollToTopButton } from "@/components/LandingPage";
import axios from "axios";

async function fetchInstructor() {
    try{
        // const res = axios.get();
        // return res.data;
        throw error;
    } catch(e) {
        console.error("Fetch Instructor Error: \n" , e);
        return [];
    }
}

export default function page() {
    
    return (
        <div className="h-full w-full flex">
            <ScrollToTopButton />
            <div className="w-full bg-green-300">
                here
            </div>
            <div className="w-1/2 bg-red-300">
                {/* Maybe a filter if there is a dept section for the instructor */}
            </div>
        </div>
    );
}

