import { useState } from "react"

export default function ({curr,title,list,handler}) {
  const [activeItem, setActiveItem] = useState(curr);

  function setActive(target,index) {
    setActiveItem(index);
    handler(target,index);
  }

  return (
    <details className="DropList">
      <summary>{title}</summary>
      <ul>
        {list.map((item,i) => {
          return <li 
            key={i} 
            className={`${i === activeItem && "active"}`}
            onClick={(t) => setActive(t,i)}>
              {item}
            </li>
        })}
      </ul>
    </details>
  )
}