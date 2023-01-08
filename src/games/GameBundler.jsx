import Matrix from 'games/Matrix';
import Knight from 'games/Knight';
import RandNum from 'games/RandNum';
// import SchulteTable from 'games/SchulteTable';

export const Games = [
  // SchulteTable,
  Matrix,
  Knight,
  RandNum 
]

export default function ({ind}) {
  const {Game} = Games[ind];
  return <Game/>
}

