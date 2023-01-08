export const knight = {
  moves: [
    {x: 1, y:2},
    {x: 2, y:1},
    {x: -1, y:-2},
    {x: -2, y:-1},

    {x: 1, y:-2},
    {x: 2, y:-1},
    {x: -1, y:2},
    {x: -2, y:1},
  ]
}

export function convertToCoordSys({x,y},currPos) {
  const pos_y = currPos + x - y * 8;
  const pos_x = currPos + x * 8 - y;

  if(currPos - pos_x < 0 && pos_y % 8 > currPos % 8) {
    return pos_y;
  }
  if(currPos - pos_x > 0 && pos_y % 8 < currPos % 8) {
    return pos_y;
  }
}