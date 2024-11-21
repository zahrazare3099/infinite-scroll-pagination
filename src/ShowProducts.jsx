import { products } from "../data/mockData";
import Loader from "./components/Loader";
import { useEffect } from "react";
import Pagination from "./components/Pagination";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const itemsPerPage = 20;
const ShowProducts = () => {
  const {
    items,
    setItems,
    setCurrentPage,
    loading,
    lastItemObserver,
    currentPage,
    hasMore,
    setHasMore,
  } = useInfiniteScroll(itemsPerPage);
  // Total pages based on loaded items
  const totalPages = Math.ceil(200 / itemsPerPage);
  console.log("items", items.length, items);

  const handlePageChange = (page) => {
    //  update page
    setCurrentPage(page);
    // Reset items and load specific page data change products?
    const startIndex = (page - 1) * itemsPerPage;
    const newItems = products.slice(startIndex, startIndex + itemsPerPage);
    console.log(
      "newItems click index",
      startIndex,
      products.length,
      products,
      "newItems>",
      newItems.length,
      newItems
    );
    setItems(newItems);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    setHasMore(false);
  };
  useEffect(() => {}, [currentPage, items, hasMore]);
  return (
    <div className="h-full flex flex-col items-center justify-between gap-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5 justify-evenly justify-items-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="card p-4 space-y-1 w-56 h-72 rounded-xl shadow-md shadow-slate-400 bg-slate-100 flex flex-col justify-center"
            ref={
              index === items.length - 1 && currentPage < 10
                ? lastItemObserver
                : null
            } // Attach ref to the last item
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover object-center w-full rounded-xl"
            />
            <div className="px-1 space-y-1">
              <h2 className="font-extrabold">{item.name}</h2>
              <p className="font-thin text-sm text-slate-600">
                {item.description}
              </p>
              <p className="font-extralight text-sm">
                Price: <span className="font-semibold">${item.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Show loader */}
      {loading && <Loader />}

      {/* Render pagination only when all items are loaded */}
      {!loading && (
        <Pagination
          totalPages={totalPages}
          // currentPage={Math.ceil(items.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ShowProducts;
