import { useEffect, useState, useRef } from "react";

import FinishGame from 'lib/components/FinishGame';
import Settings from "./Settings";

import * as logic from './logic';
import getRandomDigit from 'lib/getRandomDigit';
import getMaxFails  from "lib/getMaxFails";


export function Game () {

  const refRandNum_field = useRef(null);

  const timeIDS = useRef({
    intervalID_forCounter: 0,
    timeoutID_forAnimation: 0,
    timeoutID_forShowNums: 0,
  })

  const [state, setNewState] = useState(logic.startData);


  function checker({target}) {
    if(target.validity.valid) {
      target.disabled = true;

      const nextItem = () => {
        return target?.parentElement?.nextElementSibling?.children[0]
      };

      setNewState((state) => {
        switch (logic.checkСorrectness(+target.value, state)) {
          case "CORRECT": 
            nextItem()?.focus();
            target.classList.add("correct"); 
            break;

          case "INCORRECT": 
            ++state.fails;
            target.value = state.arr[state.currentInd];
            target.classList.add("incorrect");
            nextItem()?.focus();
            break;
            
          case "CORRECT_WIN": 
            target.classList.add("correct");
            return {...state,isWon: [true]};

          case "INCORRECT_WIN": 
            target.classList.add("incorrect");
            return {...state,isWon: [true]};
            
          case "CORRECT_LOSE":
            target.classList.add("correct");
            return {...state, isWon:[false]};
          
          case "INCORRECT_LOSE":
            ++state.fails;
            target.classList.add("incorrect");
            return {...state,isWon: [false]}; 
        }

        state.currentInd++;
        return {...state}
      })
    }
    else target.value = ""
  }

  
  function startAnim() {
    const field = refRandNum_field.current;

    const toggleRondomizer = (action, isDisable) => {

      const actions = {
        showAnimOfNumbers: getRandomDigit.bind(null, 0, 9),
        showRealNumbers: (count) => state.arr[count],
        showEmptyString: () => ""
      }
      
      let count = 0;
      for(const item of field.children ) {
        item.children[0].value = actions[action](count++);
        item.children[0].disabled = isDisable;
      }
    }
    
    const delayAnim = 2000; 

    field.classList.add("unclickable");
    timeIDS.current.intervalID_forCounter = setInterval(() => {
      toggleRondomizer("showAnimOfNumbers", true);
    }, 1)
   
    timeIDS.current.timeoutID_forAnimation = setTimeout(() => {
      clearTimeId('timeoutID_forAnimation','intervalID_forCounter');
      toggleRondomizer("showRealNumbers", true);
    },delayAnim);

    timeIDS.current.timeoutID_forShowNums  = setTimeout(() => {
      clearTimeId('timeoutID_forShowNums','intervalID_forCounter');
      toggleRondomizer("showEmptyString", false);
    }, state.timeForRemb+delayAnim);
  }
  
  function clearTimeId(...args) {
    Object.keys(timeIDS.current).forEach((timeName) => {
      if(args.includes(timeName) || args.length === 0) {
        clearTimeout(timeIDS.current[timeName]);
        clearInterval(timeIDS.current[timeName]);
        timeIDS.current[timeName] = 0;
      }
    }); 
  }

  function restartGame(changedState) {
    const newState = {
      ...logic.startData,
      quantity: state.quantity,
      ...changedState,
      stateId: [Math.random()],
    };

    newState.arr =  logic.getRandomNums(
      newState.quantity
    );
    
    clearTimeId();
    setNewState(newState);
  }

  function resetGame() {
    const newState = {
      ...logic.startData,
      stateId: [Math.random()],
    };

    newState.arr =  logic.getRandomNums(
      newState.quantity
    );

    clearTimeId();
    setNewState(newState);
  }

  useEffect(() => {
    restartGame();
    return () => {
      clearTimeId()
    }
  },[])

  useEffect(() => {
    startAnim();
    return () => {
      clearTimeId()
    }
  },[state.stateId])

  return (
    <>
      <Settings {...{restartGame,resetGame, state}}/>
      <FinishGame flag={state.isWon}  {...{restartGame}}/>

      <div className="RandNum" key={state.stateId} >
        <div>
          <span>ошибки: {state.fails}/{getMaxFails(state.quantity, state.maxFails)}</span>
          
          <div className="RandNum_field" ref={refRandNum_field}>
            {state.arr.map((_,i) => {
              return (
                <div key={i} className="RandNum_field_item">
                  <input 
                      type="text"
                      onInput={checker}
                    />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}


export default {
  Game,
  name: "RandNum",
}