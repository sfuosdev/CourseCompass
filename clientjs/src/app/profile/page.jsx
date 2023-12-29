import ProfileHero from "@/components/ProfileHero"

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

export default function Profile() {

    return (
        <>
            <ProfileHero fullname={userInfo.fullname} email={userInfo.email} />

            <div className="grid grid-cols-4">
                <div className="col-span-3">
                    <div>
                        Box
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col">
                        box
                    </div>
                </div>
            </div>
        </>
    )
}