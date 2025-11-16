'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show fewer pages on mobile
  const maxVisiblePages = isMobile ? 3 : 5;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination with ellipsis
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const showFirstPage = pages[0] > 1;
  const showLastPage = pages[pages.length - 1] < totalPages;
  const showFirstEllipsis = pages[0] > 2;
  const showLastEllipsis = pages[pages.length - 1] < totalPages - 1;

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 mt-6 md:mt-8 px-2">
      {/* Page Info - Mobile */}
      <div className="text-xs sm:text-sm text-gray-400 sm:hidden">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
        {/* First Page Button - Desktop Only */}
        {!isMobile && currentPage > 2 && (
          <button
            onClick={() => onPageChange(1)}
            className="hidden md:flex flex-shrink-0 p-2 md:p-2.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="First page"
          >
            <ChevronsLeft size={18} className="md:w-5 md:h-5" />
          </button>
        )}

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex-shrink-0 p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
        </button>

        {/* First Page */}
        {showFirstPage && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-md sm:rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] min-w-[36px] sm:min-w-[44px]"
            >
              1
            </button>
            {showFirstEllipsis && (
              <span className="text-gray-500 px-0.5 sm:px-1 text-xs sm:text-sm">...</span>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-md sm:rounded-lg transition-colors text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] min-w-[36px] sm:min-w-[44px] ${
              currentPage === page
                ? 'bg-pink-600 text-white font-semibold shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last Page */}
        {showLastPage && (
          <>
            {showLastEllipsis && (
              <span className="text-gray-500 px-0.5 sm:px-1 text-xs sm:text-sm">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-md sm:rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] min-w-[36px] sm:min-w-[44px]"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex-shrink-0 p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
          aria-label="Next page"
        >
          <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
        </button>

        {/* Last Page Button - Desktop Only */}
        {!isMobile && currentPage < totalPages - 1 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className="hidden md:flex flex-shrink-0 p-2 md:p-2.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="Last page"
          >
            <ChevronsRight size={18} className="md:w-5 md:h-5" />
          </button>
        )}
      </div>

      {/* Page Info - Desktop */}
      <div className="hidden sm:block text-xs sm:text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
