import { useState, useEffect, useRef } from "react";
import { products } from "../../data/mockData";

const useInfiniteScroll = (itemsPerPage) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const observer = useRef();

  useEffect(() => {
    // Initial fetch when component mounts
    loadMoreItems();
    // load More Items
    async function loadMoreItems() {
      // Prevent multiple requests
      if (loading || !hasMore) return;
      setLoading(true);

      // Simulate an API request with a delay
      setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const newItems = products.slice(startIndex, startIndex + itemsPerPage);
        // No more items available
        if (newItems.length < itemsPerPage) {
          setHasMore(false);
        }

        setItems((prevItems) => [...prevItems, ...newItems]);

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
    // Stop the observer from activating while loading
    if (loading) return;
    // Disconnect the previous observer
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // If the last item is in view
        if (hasMore && currentPage < 10) {
          setCurrentPage(currentPage + 1);
          // Load more data
          loadMoreItems();
        }
      }
    });
    // Observe the last item
    if (node) observer.current.observe(node);
  }
  return {
    items,
    setItems,
    setCurrentPage,
    loading,
    lastItemObserver,
    currentPage,
    setHasMore,
  };
};

export default useInfiniteScroll;
