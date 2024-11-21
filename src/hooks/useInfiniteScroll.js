import { useState, useEffect, useRef } from "react";
import { products } from "../../data/mockData";

const useInfiniteScroll = (itemsPerPage) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Initial fetch when component mounts
    loadMoreItems();
    // load More Items
    async function loadMoreItems() {
      // Prevent multiple requests
      if (loading || !hasMore) return;
      setLoading(true);

      // Simulate an API call with a timeout
      setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const newItems = products.slice(startIndex, startIndex + itemsPerPage);

        if (newItems.length < itemsPerPage) {
          setHasMore(false); // No more items available
        }
        // Only update items if newItems are not empty
        if (newItems.length > 0) {
          setItems((prevItems) => [...prevItems, ...newItems]);
        }
        // setItems(newItems);
        setLoading(false);
      }, 1000);
    }

    // Cleanup on unmount
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [currentPage]);

  // Observer for the last item
  function lastItemObserver(node) {
    if (loading) return; // Prevent observer from firing while loading

    if (observer.current) observer.current.disconnect(); // Disconnect the previous observer

    // observer.current = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting && hasMore) {
    //     // If the last item is in view
    //     if (items.length == 0 && currentPage == 1) {
    //       console.log("=0?", items.length, "p==1?", currentPage);
    //       return;
    //     }
    //     if (currentPage < 10) {
    //       setCurrentPage((prev) => prev + 1); // Increment page number to load more items
    //       loadMoreItems(); // Load more data
    //       console.log("load more! curr p<10?", currentPage);
    //     } else {
    //       console.log("return null");
    //       return null;
    //     }
    //   }
    // });
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // If the last item is in view
        console.log("load more data");
        if (hasMore && currentPage < 10) {
          setCurrentPage(currentPage + 1);
          console.log("has?", hasMore);
          loadMoreItems(); // Load more data
        }
      }
    });
    if (node) observer.current.observe(node); // Observe the last item
  }
  return {
    items,
    setItems,
    setCurrentPage,
    loading,
    lastItemObserver,
    currentPage,
    hasMore,
  };
};

export default useInfiniteScroll;
