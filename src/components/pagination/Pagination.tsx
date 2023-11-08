import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { FiChevronLeft, FiChevronRight, FiNavigation } from "react-icons/fi";

interface PaginationProps {
  totalPages: number;
  numLinksToShow?: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalPages,
  numLinksToShow = 1,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    const arrayPage: (number | string)[] = [];
    if (totalPages > 7) {
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - numLinksToShow &&
            i <= currentPage + numLinksToShow)
        ) {
          arrayPage.push(i);
        } else if (arrayPage[arrayPage.length - 1] !== "...") {
          arrayPage.push("...");
        }
      }
      setPages(arrayPage);
    } else {
      const arrayPage: (number | string)[] = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
      setPages(arrayPage);
    }
  }, [totalPages, currentPage, numLinksToShow]);

  return (
    <nav
      className="pagination is-rounded is-centered"
      role="navigation"
      aria-label="pagination">
      <a
        className="pagination-previous"
        onClick={() => setCurrentPage((prev) => (prev - 1 > 0 ? prev - 1 : 1))}>
        <FiChevronLeft />
      </a>
      <a
        className="pagination-next"
        onClick={() =>
          setCurrentPage((prev) =>
            prev + 1 <= totalPages ? prev + 1 : totalPages
          )
        }>
        <FiChevronRight />
      </a>
      <ul className="pagination-list">
        {pages.length > 0 &&
          pages.map((page, index) => {
            if (page === "...") {
              return (
                <li key={index}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              );
            }
            return (
              <li key={index} onClick={() => setCurrentPage(page as number)}>
                <a
                  className={`pagination-link ${
                    page === currentPage ? "is-current" : ""
                  }`}>
                  {page}
                </a>
              </li>
            );
          })}
        {/* <li>
          <a className="pagination-link" aria-label="Goto page 1">
            1
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 45">
            45
          </a>
        </li>
        <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page">
            46
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">
            47
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 86">
            86
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
