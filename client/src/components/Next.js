const Next = ({ next, prev, pages, currentPage }) => {
  return (
    <div id="btns">
      <button id="prev" className="btn" onClick={prev}>&#8592; Prev</button>
      <p>{`${currentPage}/${pages}`}</p>
      <button id="next" className="btn" onClick={next}>Next &#8594;</button>
    </div>
  )
}

export default Next