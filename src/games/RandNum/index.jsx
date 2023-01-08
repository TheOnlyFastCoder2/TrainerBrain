import { useEffect, useState, useRef } from "react";

import FinishGame from 'lib/components/FinishGame';
import Settings from "./Settings";

import * as logic from './logic';

export function Game () {

  const refRandNum_field = useRef(null);

  const [timeIDS,setTimeIDS] = useState({
    timeout: [],
  })

  const [state, setNewState] = useState(logic.startData);


  function checker({target}) {
    if(target.validity.valid) {
      target.disabled = true;

      const nextItem = () => {
        return target.parentElement.nextElementSibling.children[0]
      };
      
      switch (logic.checkСorrectness(+target.value, state)) {
        case "CORRECT": 
          nextItem().focus();
          target.classList.add("correct"); 
          break;

        case "INCORRECT": 
          ++state.fails;
          nextItem().focus();
          target.value = state.arr[state.currentInd];
          target.classList.add("incorrect");
          break;
        
        case "WIN": 
          target.classList.add("correct");
          setNewState({...state,isWon: [true]}); 
          break;
          
        case "LOSE":
          target.classList.add("incorrect");
          setNewState({...state,isWon: [false]}); 
          break;
      }
      ++state.currentInd;
    }
    else target.value = ""
  }

  
  function startAnim() {
    const field = refRandNum_field.current;

    const toggleRondomizer = (mode,flag) => {
      let count = 0;
      for(const item of field.children ) {
        item.classList[mode]("randomizer");
        item.children[0].value = (
          flag ? state.arr[count++] : ""
        );
      }
    }
    
    toggleRondomizer("add",false);

    const delayAnim = 2000; 
    const timeID_forAnimation = setTimeout(() => {
      toggleRondomizer("remove",true);
      clearTimeout(timeID_forAnimation);
    },delayAnim);

    const timeID_forShowNums  = setTimeout(() => {
      toggleRondomizer("remove",false);
      clearTimeout(timeID_forShowNums);
    }, state.timeForRemb+delayAnim);

    timeIDS.timeout.push(timeID_forAnimation);
    timeIDS.timeout.push(timeID_forShowNums);
    setTimeIDS(timeIDS);
  }
  


  function clearTimeId() {
    timeIDS.timeout.forEach((ID) => clearTimeout(ID));
    setTimeIDS({
      timeout: [],
    })
  }

  function restartGame(changedState) {
    const newState = {
      ...logic.startData,
      ...changedState,
      stateId: [Math.random()],
    };
    
    newState.arr =  logic.getRandomNums(
      newState.quantity
    );
    

    setNewState(newState);
    clearTimeId()
  }

  function resetGame() {
    const newState = {
      ...logic.startData,
      stateId: [Math.random()],
    };

    newState.arr =  logic.getRandomNums(
      newState.quantity
    );

    setNewState(newState);
    clearTimeId()
  }

  useEffect(() => {
    restartGame()
  },[])

  useEffect(() => {
    startAnim()
  },[state.stateId])

  return (
    <>
      <Settings {...{restartGame,resetGame, state}}/>
      <FinishGame flag={state.isWon} {...{restartGame}}/>

      <div className="RandNum" key={state.stateId} >
        <div className="RandNum_field" ref={refRandNum_field}>
          {state.arr.map((_,i) => {
            return (
              <div key={i} className="RandNum_field_item">
                 <input 
                    type="number"
                    onInput={checker}
                  />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}


export default {
  Game,
  name: "RandNum",
}