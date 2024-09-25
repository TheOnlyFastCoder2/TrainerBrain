import { useEffect, useRef } from "react";

export default function ({title,count,setHook,handler}) {
  const refTimer = useRef({
      t_1: null,
      t_2: null,
  });

  function setValue(input,value) {
    input.placeholder = value;
  }  

  function setter (target) {
    
    if(target) {

      const input = target.parentElement.children[1];
      const mode = target.textContent; // increm or dicrem
      // setValue(input,handler(mode,count));
      target.onmousedown = () => {
        let count = +input.placeholder;

        setValue(input,handler(mode,count));
        refTimer.current.t_1 = setTimeout(() => {
          refTimer.current.start_2 = setInterval( () => {
            setValue(input,handler(mode,count));
          },100)
        },1000)
      }
    
      target.onmouseup = () => {
        setHook(+input.placeholder);
        clearTimeout(refTimer.current.t_1);
        clearInterval(refTimer.current.start_2);
      }
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(refTimer.current.t_1);
      clearInterval(refTimer.current.start_2);
    }
  });

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