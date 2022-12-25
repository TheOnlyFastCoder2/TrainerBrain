import ControlPanel from 'lib/components/ControlPanel';
import Counter from "lib/components/Counter";

import { useState } from 'react';

export default function ({
  restartGame,
  resetGame,
  state,
}) {

  const [key, setKey] = useState({});
  const [storeOfChanges,setStoreOfChanges] = useState({})

  function setCounterMoves(mode,count) {
    switch (mode) {
      case "+": count+1 <= 64 * 0.6 && count++;break;
      case "-": count-1 >= state.sequence.min && count--;break;
    }
    return count;
  }

  function restart () {
    restartGame(storeOfChanges)
  }

  function reset() {
    resetGame();
    setStoreOfChanges({});
    setKey(Math.random());
  }


  return ( 
    <ControlPanel key={key}> 
      <Counter 
        title={"Correct moves"}
        count={state.sequence.max}
        handler={setCounterMoves}
        setHook={(count) => {
          storeOfChanges.sequence = {
            max:count,
            min:state.sequence.min, 
          }
        }}
      />
      
      <input type="submit" value="restart" onClick={restart}/>
      <input type="submit" value="reset" onClick={reset}/>

    </ControlPanel>
  )
}
