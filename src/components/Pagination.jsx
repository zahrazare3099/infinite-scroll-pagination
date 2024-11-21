const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  console.log("curr>>>>>", currentPage);
  return (
    <ul className="py-4 flex justify-center items-center gap-x-2 w-full">
      {Array.from({ length: totalPages }, (_, index) => {
        return (
          <li
            className={`p-1 m-0 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-slate-300"
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
