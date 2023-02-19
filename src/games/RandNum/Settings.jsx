import ControlPanel from 'lib/components/ControlPanel';

import List from "lib/components/List";
import Range from "lib/components/Range";
import { useState } from 'react';

export default function ({
  restartGame,
  resetGame,

}) {

  const [key, setKey] = useState({});
  const [storeOfChanges,setStoreOfChanges] = useState({});
  
  function restart () {
    restartGame(storeOfChanges);
  }

  function reset() {
    resetGame();
    setStoreOfChanges({});
    setKey(Math.random())
  }

  return ( 
    <ControlPanel key={key}> 

      <List 
        title={"Количесто чисел"} 
        list={[5,6,7,8,9,10,20,30,40,60,60,70,80,90,100,110]}
        handler = {(val) => {
          storeOfChanges.quantity = +val;
        }}
      />

      <Range 
        min={2} 
        max={30}
        step={0.1}
        prefix = "s"
        title="Время отображения"
        handler = {(val) => {
          storeOfChanges.timeForRemb = val * 1000;
        }}
      />
      
      <input type="submit" value="обновить" onClick={restart}/>
      <input type="submit" value="сбросить настройкий" onClick={reset}/>
    </ControlPanel>
  )
}
