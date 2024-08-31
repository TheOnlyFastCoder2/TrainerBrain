import { useEffect, useRef } from 'react';

const Winner = ({handleRestartGame}) => {
  return (
    <>
      <div className='wrapper'>
        <h1>You're win</h1>
        <button onClick={handleRestartGame}>restart</button>
      </div>
    </>
  )
}

const Looser = () => (
  <h1>Game Over</h1>
)

export default function ({flag,restartGame}) {
  const refFinishGame = useRef(null);

  function handleRestartGame() {
    restartGame({isWon:[null]})
  }

  function setLoseEnd () {
    const delay = 1000; 
    const offsetDelay = delay + 1000;
    const {current} = refFinishGame;

    const timeout = setTimeout(() => {
      current.classList.add(flag[0])

      const timeout_1 = setTimeout(() => {
        handleRestartGame();
        clearTimeout(timeout_1);
        clearTimeout(timeout);
      },offsetDelay);
    },delay) 
  }

  useEffect(() => {
    if (flag[0] !== null) {
      flag[0] == false 
      && setLoseEnd()
    }
  },[flag[0]])

  return flag[0] !== null && (
    <div className={`FinishGame`} ref={refFinishGame}>
      {
        flag[0] === true 
        ? <Winner handleRestartGame={handleRestartGame}/>
        : <Looser/>
      }
    </div>
  )
}