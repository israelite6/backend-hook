import React from "react";

export default function usePagination() {
  const [buttons, setButtons] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [remain, setRemain] = React.useState(false);

  const paginate = ({ pages, currentPage }) => {
    let button = [];
    if (currentPage - 2 > 0) {
      if (currentPage - 2 > 1) {
        button.push(1);
      }
      if (currentPage - 2 > 2) {
        button.push(".");
      }

      button.push(currentPage - 2);
    }
    if (currentPage - 1 > 0) {
      button.push(currentPage - 1);
    }

    button.push(currentPage);

    if (currentPage + 1 <= pages) {
      button.push(currentPage + 1);
    }
    if (currentPage + 2 <= pages) {
      button.push(currentPage + 2);

      if (currentPage + 2 < pages) {
        if (currentPage + 2 < pages - 1) {
          button.push(".");
        }
        button.push(pages);
      }
    }
    setButtons(button);
  };

  const runPagination = ({ total, currentPage, perPage }) => {
    let pages = Math.floor(total / perPage);
    let remain = false;
    if (Math.floor(total % perPage) > 0) {
      pages++;
      remain = true;
    }

    setPages(pages);
    setRemain(remain);

    paginate({ pages, currentPage: parseInt(currentPage) });
  };

  return { runPagination, buttons, pages, remain };
}
/*
props = {currentPage: number}

*/
