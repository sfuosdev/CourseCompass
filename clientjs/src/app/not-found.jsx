import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col top-0 pt-[6rem] pb-[6rem] justify-center items-center gap-4">
            <h1 className="text-4xl font-bold">404 | Page Not Found</h1>
            <p className="text-xl">If you believe this is an error, please contact our support.</p>
            <Link
                href="/"
                className="text-white rounded-full px-4 py-2 bg-primary-blue hover:text-black hover:bg-primary-yellow"
            >
                Go Home
            </Link>
        </div>
    );
}