"use client";

import { item_per_page } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  if (!isClient) {
    return null; // Optionally, return null or a loading state while waiting for the client-side mount
  }

  const hasPrev = item_per_page * (page - 1) > 0;
  const hasNext = item_per_page * (page - 1) + item_per_page < count;

  const changePage = (newPage: number) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("page", newPage.toString());
      router.push(`${window.location.pathname}?${params}`);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / item_per_page) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? "bg-Yellow1" : ""
                }`}
                onClick={() => changePage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
