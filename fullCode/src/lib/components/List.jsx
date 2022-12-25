export default function ({title,list,handler,isColumn,defaultItem}) {

  function setter({target}) {
    const parent = target.parentElement;

    handler(target.textContent);
    [...parent.children].forEach((child) => {
      child == target
      ? target.classList.add("active")
      : child.classList.remove("active")
    })
  }

  return ( 
    <ul className={`List ${isColumn && "column"}`}>
      <h3>{title}</h3>
      <div className="List_wrapper">
        {list.map((val,i) => {
          return (
            <li 
              key={val+i} 
              className={`${defaultItem == val && "active"}`}
              onClick={setter}>
                {val}
            </li>
          )
        })}
      </div>
    </ul>
  )
}