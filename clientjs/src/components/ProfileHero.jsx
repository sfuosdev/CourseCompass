import Image from "next/image";

const bgbanner = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQcNFREWFhURExMYHSggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAPGCsdFR0rKy0tLSstKy0tLS0tKy0tLS0tKy0tLS03Nys3Nzc3LS0tKystLS0rKy0rLSsrKy0rK//AABEIAK0BJAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAABAgMABAYHBf/EABoQAQEBAQEBAQAAAAAAAAAAAAABAhESYQP/xAAbAQEBAQEBAQEBAAAAAAAAAAADBAIBAAcGBf/EAB4RAQEBAQEBAAIDAAAAAAAAAAABAgMREhNhITFB/9oADAMBAAIRAxEAPwD7KzRqllS1gY0JKz56WMbgNys3IcEKxJWWoCDcrFhWEK3B0lhT0rUFYSlp6WtQGolS1SkrcT6idhLFKnW4m2nqE1FKSkiXcS1E9K6TpIj3EqnpbSWiRJuJ1PUV1E7G4k3E7C8UK2xm+Uoyizy3loANwLHn9HlonC2KhY16/pcdubWGVsBr1b919BZmfjJX91m6IElc8G0Os1blZvrAzEjFYBBuMUKAgSDoFpqWtDpKWnsLpuA1E7CWKUlbifUTJpWxOxuJtxOk0pU9NxLuJ1Oq6JpuJdxLSelanqEiTcTqeopomiRJuJ2FsPS1uJ7/AAVm4LpuemZhef0OWgAxbHn9HlovGMzvqyae6YeNx+MlfqrGZuDISVzwrG4zcrlhOCawOElYuS0D8CwkrFyQFOFsJKK5IFNQbg7CUtPwtjcDqJUmlrCajcqfWUiaVsJY1Km1EaWxTUJqEiXcS1E9RaxOxuJd5R0SraidhJUm8o6Tq2onYSI9xKlPYVuJdQB4wutYvgcEeNxxbz0HA4fjWPev6PLafAU8xnvVk29vILC/Ezb9v8hxpDASacuW43BakmnLmBwLDMSaZuScawwEmmLC8Cw1bhJoVynYHD2Bwk0K5TsDh7AJNCuU7CaitLW5QayjcksWpLG5U+sI2JWOixPUblS9MIWEsXuSXJJUmsOfUT1HTcp6y3Kl3zc2onY6dYTuSSo9865rCWOjWU9YJKj3zqJoNyVr+weWH63U2e8Njor1vSXTTT3i/l1Nb8EnWc8W/ke56HSSj1+ElfQvo/WL0etyveiNIMpJWfRMQekmnBoN0CTTNHjA1JKxQpTFrc0OwKFEKWaFqFpbD0ONzQblOwtilLSTQdZTpLFLC0k0n3lK5T1lakpJUu8xDWU7l0VPUJKk3hDWSXK1hLCSpd4Q1E9ZX0nYSVH0whYnYvqJ2ElR7yjYCmonY3KCzwPQ9LWdNz6G9MXrPeK50e36PUpofT55NPpn1FOm6l6H0SV76U63onpvRJXrVJW6Trdble9U6Fpet0krNreh6S1ukzR2mtDpbQ6WVi04WhaHW5WLR6HS9C0kFaNpbQ6HW5Q6rWgFCkzRapdEprSWllS7LSU1pKaVLslT0panokSbJSaP0mqSJNJ6ielanSRLtOp6UpK3Em07A4crbOb/ACDDxnj+vXQ3Ss+aTT6kaaHpR4XOnhlN0khiTTg9H0ViTT1N1ugBJpw1odZqTOma3W6AdLNDtHrdL0LSzQ7R6W1gJKLVYto0hJQ6o3RbpqWtyi1aFpbWpaWVNu0NVO01JTZqXdDVJaOiUual3S0uhpNFiXdDSdNaS0sSbpKSmpaSJdAMgGjTEbyxmZ9N69V5Hh/I+XyqdX2D8SfBkU8t5Nnq5+InG4p5byWdXryJxuKTLeSzo5eSbWKeRmSzbN5pSNxTy1yTO2PxJeW4p5DybOx65p8LxXyFyWbDrmlchxSwtyTOw65p8LYrcl8lmw6wnwmorYWws2DWEqTS1idhJtPvCNCq2E1ks0l1hHRarrJLDZ0l3hGkquoTUNnSTeEdEqusp6hs6R9Mp6IpqEsLNJN5A0IaN+sRTrF6zhPXsJR6SC+O53X2s3R6UT52z4YSxjZ24eMXolm3hEIxZpwYIMSac8HgWCxZty5lLwPKjEnSjvOI3IXK/AuTToO8XPcluXT4L5LnoHXBzXIXLpuCXJZsGuDnuU7l1XBLgk6J98HNckuHTcEuDZ6Jd8HNcJ3Dq1glwadEm+H6ctynrDquE9YNnoj6cP05dYT1l16wnrBs9EfTh+nJrJNZdWvzJrBs9EW+DluSr6wncmz0Sb5WJ9Y3lm/sXzXrpoekgx8Rx00+3+H6MIPVGel/1zw4wvWlUZ254dij0+ds+Gg9L1pSzbh2L0S508ZugxZpwzAPSzTgsAkmnBbgCSae8CwtydiTbNzKlcluVqUk0DWELkmsuiwmoSbT75IXJNZWpbDZ2l3zc9wS5dFhNQ2dpN8o5tYTuXVZE9Q+dpN8o5tZT1h02J6hs9EXTk5dYTuXXYlqHztD04xzeQXsYn2m/C/cHqfofT4XLY+v+xT0MqPo00bn00z7FemlQ9mmlOd1z2LdHqM2M2rxus+xbopTY+lGdOexQZU5R6bO3PVOj1L0aU2d1z1TrJ9b0Wac+op0epWl9Fzaxdr9b0j0PRcsXqv6D2h6L008He1dF2W7R6S0ksFrrV7sl2l0tpYDXWq3ZLtPVJ0uU2utUuya2QmjRLvpTXRNaJaXVNlJvpR1pO6Ck0bKPpujraetBpOnyj6bpvQpcAif7r//2Q=="

const ProfileHero = ({ fullname, email }) => {
    return (
        <div className={`-mt-3 relative`}>
            <img src={bgbanner} alt="Banner for Profile" className={`w-screen h-60`} />
            <div className="absolute inset-1/4 grid grid-cols-4 w-[70%] lg:w-[50%] ">
                <div className="">
                    <Image src="/profile-picture.jpg" alt={`Profile picture of ${fullname}`} height={208} width={208}
                    className="h-[60px] w-[60px] md:h-[120px] md:w-[120px] rounded-full" />
                </div>
                <div className="py-3 col-span-3">
                    <div className="font-semibold text-[30px]">
                        {`Welcome ${fullname}`}
                    </div>
                    <div className="py-2 font-normal text-[18px]">
                        Notifications sent to <a href={`mailto:${email}`} className="font-medium underline underline-offset-4">{email}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHero;