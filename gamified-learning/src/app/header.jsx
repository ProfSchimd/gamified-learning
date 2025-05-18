'use client';
import Link from 'next/link';
import { useState } from 'react';

const menu = [
    { link: "/learn", text: "Learn" },
    { link: "/practice", text: "Practice" },
    { link: "/about", text: "About" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-sky-600 dark:bg-sky-800 text-white">
            <div className="container  mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    🎓 Learning with games
                </Link>

                <div className={`hidden md:flex gap-4`}>
                    {[...menu].map((item, i) => (
                        <Link key={i} href={item.link} className="block mt-2 md:mt-0 hover:text-sky-100">
                            {item.text}
                        </Link>
                    ))}
                </div>

                <button
                    className="md:hidden focus:outline-none text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="fill-current"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>

            </div>
            <div className={`${menuOpen ? "flex-col" : "hidden"} md:hidden text-center`}>
                {[...menu].map((item, i) => (
                    <Link key={i} href={item.link} className="block mt-2 md:mt-0 hover:text-sky-100">
                        {item.text}
                    </Link>
                ))}
            </div>
        </header>
    );
}
