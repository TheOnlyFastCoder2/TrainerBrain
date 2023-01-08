export default function ({items,setCurrGame}) {

  function set_swipe({target}) {
    target.parentElement.classList
    .toggle("swiped");
  }

  return (
    <nav className="Menu">
      <button 
        className="Menu_swiper" 
        onClick={set_swipe}
      />

      <ul className="Menu_games">
        {items.map(({name},i) => {
          return (
            <li 
            key={i}
            onClick = {() => setCurrGame(i)}>
              {name[0]}
            </li>
          )
           
        })}
      </ul>

      {/* <ul className="Menu_options">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
    </nav>
  )
}