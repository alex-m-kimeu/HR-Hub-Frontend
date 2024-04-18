import { BiSearch } from "react-icons/bi";

export const Search = ({ search, setSearch }) => {
  return (
    <div className="relative mb-10">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BiSearch className="text-black dark:white" />
      </div>
      <input
        className="w-50 pl-10 pr-3 py-3 bg-variant1-light dark:variant1-dark rounded-full text-sm text-black placeholder-black dark:placeholder-white outline-none"
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
      />
    </div>
  );
};
