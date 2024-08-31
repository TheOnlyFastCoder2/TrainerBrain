import {useState} from 'react';
import Menu from 'components/Menu';
import GetterGame , {Games} from 'games/GameBundler';
import ErrorMobile from 'lib/components/ErrorMobile';


const GameSection = ({children}) => (
  <div className="Game">
    {children}
  </div>
)

export default function () {
  const [currGame , setCurrGame] = useState(0);

  return (
    <>
      <ErrorMobile/>
      <GameSection>
        <GetterGame ind={currGame}/>
      </GameSection>
      <Menu items={Games} {...{setCurrGame}}/>
    </>
  )
}