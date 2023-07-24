function Pagination({ totalPage, current, onChange }) {
  const prev = (
    <button disabled={current === 1} onClick={() => onChange(current - 1)}>
      PREV
    </button>
  );
  const currentPage = <button>{current}</button>;
  const next = (
    <button
      disabled={current === totalPage}
      onClick={() => onChange(current + 1)}
    >
      NEXT
    </button>
  );
  const totalPagesElem = (
    <div>
      Total Pages: <b>{totalPage}</b>{" "}
    </div>
  );
  return (
    <div>
      {prev}
      {currentPage}
      {next}
      {totalPagesElem}
    </div>
  );
}

export default Pagination;
