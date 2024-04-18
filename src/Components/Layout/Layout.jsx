import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

export const Layout = ({ Sidebar, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`relative h-screen overflow-auto ${isLargeScreen ? 'flex' : ''}`}>
            <button onClick={handleSidebarToggle} className="absolute right-0 z-20 p-2 md:hidden">
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            {(isSidebarOpen || isLargeScreen) && (
                <div className={`z-10 w-full md:w-64 bg-white ${isLargeScreen ? 'relative' : 'absolute'}`}>
                    {Sidebar && <Sidebar />}
                </div>
            )}
            <div className="flex-grow px-4 md:px-[50px] py-4 md:py-[20px]">
                {children}
            </div>
        </div>
    );
};