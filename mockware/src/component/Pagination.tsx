import React from "react";
import { GoBackIcon, SelectedIcon } from "./Icons";

//implement a pagination component that will display the current page and the total number of pages.
//The component should have a previous and next button that will change the current page.

const Pagination = ({
  pageSize,
  noOfItems,
  onPageChange,
  currentPage,
}: {
  noOfItems: number;
  currentPage: number;
  onPageChange: Function;
  pageSize: number;
}) => {
  const pageCount = Math.ceil(noOfItems / pageSize);
  return (
    <div className="pagination">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage == 1}
      >
        <GoBackIcon />
      </button>

      <ul>
        {Array.from(Array(pageCount).keys()).map((index) => {
          return (
            <li key={index}>
              <a
                href="#"
                className={currentPage == index + 1 ? "active" : ""}
                onClick={() => {
                  onPageChange(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          );
        })}
      </ul>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage == pageCount}
      >
        <SelectedIcon />
      </button>
    </div>
  );
};

export default Pagination;
