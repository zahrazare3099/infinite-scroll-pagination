import { products } from "../data/mockData";
import Loader from "./components/Loader";
import { useEffect } from "react";
import Pagination from "./components/Pagination";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const ShowProducts = () => {
  const itemsPerPage = 20;
  const {
    items,
    setItems,
    setCurrentPage,
    loading,
    lastItemObserver,
    currentPage,
    hasMore,
  } = useInfiniteScroll(itemsPerPage);

  const totalPages = Math.ceil(200 / itemsPerPage); // Total pages based on loaded items
  console.log("items", items.length, items);

  const handlePageChange = (page) => {
    //  update page
    setCurrentPage(page);
    // Reset items and load specific page data
    const startIndex = (page - 1) * itemsPerPage;
    const newItems = products.slice(startIndex, startIndex + itemsPerPage);
    console.log("newItems", newItems.length, newItems);
    setItems(newItems);
  };
  useEffect(() => {}, [currentPage]);
  return (
    <>
      <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4 justify-items-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="card rounded-xl shadow-md shadow-slate-400 p-4 bg-slate-100 flex flex-col justify-center gap-y-2"
            ref={
              index === items.length - 1 && currentPage < 10
                ? lastItemObserver
                : null
            } // Attach ref to the last item
          >
            <img src={item.image} alt={item.name} className="w-full h-24" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
      {/* Show loader */}
      {loading && <Loader />}

      {/* Render pagination only when all items are loaded totalPages > 0 &&*/}
      {!loading && (
        <Pagination
          totalPages={totalPages}
          // currentPage={Math.ceil(items.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ShowProducts;
