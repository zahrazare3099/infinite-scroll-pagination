const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <ul className="py-4 flex flex-wrap justify-center items-center gap-2 w-full">
      {Array.from({ length: totalPages }, (_, index) => {
        return (
          <li
            className={`p-1 m-0 rounded-full text-center text-xs sm:text-sm md:text-base ${
              currentPage === index + 1
                ? "bg-blue-500 text-white font-bold"
                : "bg-slate-300 font-thin"
            }`}
          >
            <button
              key={index + 1}
              className={`px-2 ${
                currentPage === index + 1 ? "cursor-not-allowed" : null
              }`}
              onClick={() => onPageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
