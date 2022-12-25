import ControlPanel from 'lib/components/ControlPanel';
import DropList from "lib/components/DropList";
import Counter from "lib/components/Counter";
import List from "lib/components/List";
import { useState } from 'react';


export default function ({
  restartGame,
  resetGame,
  state,
}) {
  const [key, setKey] = useState({});
  const [storeOfChanges,setStoreOfChanges] = useState({});
  
  function restart () {
    restartGame(storeOfChanges);
  }

  function reset() {
    resetGame();
    setStoreOfChanges({});
    setKey(Math.random());
  }

  function setGrid({target}, index) {
    const [a,b] = target.textContent.match(/\d+/ig);

    storeOfChanges.gridOfCells = {
      quantity: +a*+b,
      percent: 100 / +a - 1,
      curr: index
    };
  }


  function changeGameMode(mode) {
    switch(mode) {
      case "yes": storeOfChanges.withOrderOf = true; break;
      case "no": storeOfChanges.withOrderOf = false; break;
    }
  }

  function setCounterGrid(mode,count) {
    switch (mode) {
      case "+": count+1 <= state.gridOfCells.quantity * 0.5 && count++;break;
      case "-": count-1 >= state.sequence.min && count--;break;
    }
    return count;
  }
  
  function setCounterTime(mode,count) {
    switch (mode) {
      case "+": count+1 <= state.timeShow.max && count++;break;
      case "-": count-1 >= state.timeShow.min && count--;break;
    }
    return count;
  }

  return ( 
    <ControlPanel > 

      <DropList 
        title={"Grid"}
        curr="3" 
        list={['20x20','16x16','12x12','8x8']} 
        handler={setGrid}
      />

      <List
        title={"WithO order of"}
        list={["yes","no"]}
        defaultItem = {state.withOrderOf ?  "yes" : "no"}
        handler={changeGameMode}
      />

      <Counter 
        title={"Correct Cards"}
        count={state.sequence.curr}
        handler={setCounterGrid}

        setHook={(count) => {
          storeOfChanges.sequence = {
            min: state.sequence.min,
            curr: count,
          }
        }}
      />

      <Counter 
        title={"Time show in sec"}
        count={state.timeShow.curr}
        
        handler={setCounterTime}
        setHook={(count) => {
          storeOfChanges.timeShow = {
            min: state.timeShow.min,
            max: state.timeShow.max,
            curr: count,
          }
        }}
      />

      <p className="Scores">
        <span>fails: {state.fails}</span>
        <span>corrects: {state.successes}</span>
      </p>
      
      <input type="submit" value="restart" onClick={restart}/>
      <input type="submit" value="reset" onClick={reset}/>

    </ControlPanel>
  )
}
