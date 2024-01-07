import './style.scss';

const Paginator = ({ selectedPage, numberOfPages, selectPageHandler }: IPaginatorProps): JSX.Element => {
  return <div className="pagination">
    <span onClick={() => { selectPageHandler(selectedPage - 1) }}>◀</span>

    {[...Array(numberOfPages) as number[]].map((_, i) => {
      return <span key={i} className={selectedPage === i + 1 ? "pagination--selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
    })}

    <span onClick={() => selectPageHandler(selectedPage + 1)}>▶</span>
  </div>
}


export default Paginator;
