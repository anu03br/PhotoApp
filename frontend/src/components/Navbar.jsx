import { useState } from 'react';
import hamburgerIcon from '../assets/hamburger.png';

export default function Navbar() {

    const [isVisible, setVisible] = useState(false);

    const toggleMenu = () => {
        setVisible(prev => !prev);
    };
    return (
        <div className={"navWrapper shadow-md"}>
            <nav className="flex items-center bg-primary p-6 justify-between">
                <a onClick={toggleMenu} className="flex-shrink-0 lg:hidden">
                    <img className="scale-25 transform" src={hamburgerIcon} alt="hamburger"/>
                </a>
                <div className="flex-grow text-center">
                    <span className="font-funnel text-3xl">Photo Uploader</span>
                </div>
                <div className="flex items-center justify-end">
                    <ul className="hidden lg:flex list-none">
                        <li><a href={"/"} className={"font-funnel hover:bg-neutral rounded-md text-xl p-4"}>Home</a></li>
                        <li><a href={"/about"} className={"font-funnel hover:bg-secondary rounded-md text-xl p-4"}>About</a></li>

                    </ul>
                </div>
            </nav>
            <div className={isVisible ? "block" : "hidden"}>
                <ul>
                    <li className={"p-2"}><a href={"/"} className={"font-funnel hover:bg-gray-200 rounded-md"}>Home</a></li>
                    <li className={"p-2"}><a href={"/about"} className={"font-funnel hover:bg-gray-200 rounded-md"}>About</a></li>

                </ul>
            </div>
        </div>

    );
}