'use client';

import styles from './styles.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === currentPage ? styles.active : ''
          } ${page === '...' ? styles.ellipsis : ''}`}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
          aria-label={typeof page === 'number' ? `Página ${page}` : undefined}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>
    </div>
  );
}
