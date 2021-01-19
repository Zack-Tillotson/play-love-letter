function isXYIsRect({x, y}, rect) {
  return rect.x <= x && rect.x + rect.width > x && rect.y <= y && rect.y + rect.height > y
}

function distBetween(a, b) {
  return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2), .5)
}

function isHoverPlayersContainer(pos, playersId = 'players-container') {
  const playersEle = document.getElementById(playersId)
  const rect = playersEle.getBoundingClientRect()
  return isXYIsRect(pos, rect)
}

function getPlayerAtCoordinates(pos, playerClassName = 'player') {
  const playersByDistance = [
    ...document.getElementsByClassName(playerClassName)
  ].map(ele => {
    const rect = ele.getBoundingClientRect()
    const center = {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2}
    return {ele, center}
  }).sort((a, b) => {
    return distBetween(a.center, pos) - distBetween(b.center, pos)
  })
  return playersByDistance[0].ele.id.split('-')[1]
}



export {isHoverPlayersContainer, getPlayerAtCoordinates}