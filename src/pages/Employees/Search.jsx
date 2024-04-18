/* eslint-disable react/prop-types */
export const Search = ({ search, setSearch }) => {
    return (
        <div>
            <input
                className="mb-4 w-full px-3 py-3 bg-green dark:bg-dark1 rounded-md text-sm text-white placeholder-white dark:placeholder-green outline-none "
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..." />
        </div>
    );
}