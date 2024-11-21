import { products } from "../data/mockData";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";
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
    setHasMore,
  } = useInfiniteScroll(itemsPerPage);

  // Total pages based on loaded items
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    //  update page
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Reset items and load specific page data change products?
    const startIndex = (page - 1) * itemsPerPage;
    const newItems = products.slice(startIndex, startIndex + itemsPerPage);
    setItems(newItems);
    // to handle new items in pagination
    setHasMore(false);
  };
  return (
    <div className="h-full flex flex-col items-center justify-between gap-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5 justify-evenly justify-items-center">
        {items.map((item, index) => (
          <ProductCard
            key={item.id}
            {...item}
            ref={
              index === items.length - 1 && currentPage < 10
                ? lastItemObserver
                : null
            } // Attach ref to the last item
          />
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
