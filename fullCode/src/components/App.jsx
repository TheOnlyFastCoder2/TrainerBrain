import {useState} from 'react';
import Menu from 'components/Menu';
import GetterGame , {Games} from 'games/GameBundler';


const GameSection = ({children}) => (
  <div className="Game">
    {children}
  </div>
)

export default function () {
  const [currGame , setCurrGame] = useState(0);

  return (
    <>
      <GameSection>
        <GetterGame ind={currGame}/>
      </GameSection>
      <Menu items={Games} {...{setCurrGame}}/>
    </>
  )
}