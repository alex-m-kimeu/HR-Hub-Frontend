export const Layout = ({ Sidebar, children }) => {
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-64">
                {Sidebar && <Sidebar />}
            </div>
            <div className="flex-grow px-4 sm:px-[50px] py-4 sm:py-[20px]">
                {children}
            </div>
        </div>
    );
};