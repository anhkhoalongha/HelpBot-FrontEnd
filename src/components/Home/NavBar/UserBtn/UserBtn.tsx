"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Example() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return (
            <div>
                <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="sign-in">Sign In</a>
                <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="sign-up">Sign up</a>
            </div>
        );
    }

    return (
        <div>
            Hello,{" "}
            <Link href='/dashboard/user-profile'>
                {user.username}
            </Link>{" "}
            welcome to HelpBot
        </div>
    );
}