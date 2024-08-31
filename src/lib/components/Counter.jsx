export default function ({title,count,setHook,handler}) {
  
  function setValue(input,value) {
    input.placeholder = value;
  }  

  function setter (target) {
    
    if(target) {

      let start_t , start_i;
      const input = target.parentElement.children[1];
      const mode = target.textContent; // increm or dicrem
      // setValue(input,handler(mode,count));
      target.onmousedown = () => {
        let count = +input.placeholder;

        setValue(input,handler(mode,count));
        start_t = setTimeout(() => {
          start_i = setInterval( () => {
            setValue(input,handler(mode,count));
          },100)
        },1000)
      }
    
      target.onmouseup = () => {
        setHook(+input.placeholder);
        clearTimeout(start_t);
        clearInterval(start_i);
      }
    }
  }

  return (
    <div className="Counter">
      <h3>{title}</h3>
      <div>
        <button ref={setter}>-</button>
        <input type="text" placeholder={count} disabled/>
        <button ref={setter}>+</button>
      </div>
    </div>
  )
}