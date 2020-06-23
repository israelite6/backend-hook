import React from "react";

export default function usePagination() {
  const [buttons, setButtons] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [remain, setRemain] = React.useState(false);
  /*
  const setData = data => {
    setOption(r => ({ ...r, ...data }));
  };

  const setCurrentPage = data => {
    setOption(r => ({ ...r, currentPage: data }));
  };

  const setPrev = data => {
    setOption(r => ({ ...r, prev: data }));
  };
  const setNext = data => {
    setOption(r => ({ ...r, next: data }));
  };

  const setTotal = data => {
    setOption(r => ({ ...r, total: data }));
  };

  const setLast = data => {
    setOption(r => ({ ...r, last: data }));
  };

  const setFirst = data => {
    setOption(r => ({ ...r, first: data }));
  };

  const setLeftNumbering = data => {
    setOption(r => ({ ...r, leftNumbering: data }));
  };

  const setRightNumbering = data => {
    setOption(r => ({ ...r, rightNumbering: data }));
  };
  const numberOfPage = data => {
    setOption(r => ({ ...r, numberOfPage: data }));
  };

  const setOffset = data => {
    setOption(r => ({ ...r, offset: data }));
  };

  const setLimit = () => {
    setOption(r => ({ ...r, limit: props.perPage }));
  };

  const process = data => {
    let numerOfPage = Math.floor(data.total / props.perPage);
    if (data.total % props.perPage > 0) {
      numberOfPage++;
    }
    //set number  of page
    numberOfPage(numberOfPage);

    //if()
  };*/

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
