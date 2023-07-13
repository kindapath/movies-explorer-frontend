import NotFoundError from "../errors/NotFoundError";

export function filterShortMovies(moviesArray) {

  const shortArray = moviesArray.filter(item => {
    return item.duration <= 40
  })

  return shortArray
}

export function search(keyword, moviesArray, isFilterChecked, setInitialCards, setInitialLiked) {
  // take moviesArray
  // create new array for ex. resultsArray
  // that wiil be final result
  const resultArray = []

  // let resultsArray be the following:
  // we take moviesArray and the nameRU property of each item
  moviesArray.forEach(item => {

    if (item.nameRU.toLowerCase().trim().includes(keyword.toLowerCase())
      ||
      item.nameEN.toLowerCase().trim().includes(keyword.toLowerCase())) {
      // => push the item to resultsArray

      resultArray.push(item)
      return
    }

  });
  if (resultArray.length === 0) {
    throw new NotFoundError()
  }
  setInitialLiked ? setInitialLiked(resultArray) : setInitialCards(resultArray)

  if (isFilterChecked) {
    return filterShortMovies(resultArray)
  }
  return resultArray
}

export function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} ч${minutes > 0 ? ` ${minutes} мин` : ''}`;
}

export const addCards = (isBigScreen, isMediumScreen) => {
  if (isBigScreen) {
    return 3
  } else if (isMediumScreen) {
    return 2
  } else {
    return 2
  }
}

export const getAllStoredCards = () => JSON.parse(localStorage.getItem('allCardsStored'))
export const getAllLikedStored = () => JSON.parse(localStorage.getItem('allLikedStored'))

export function getLastSearch(key) {
  switch (key) {
    case 'text':
      return localStorage.getItem('lastSearchText')

    case 'filter':
      return JSON.parse(localStorage.getItem('lastSearchFilter'))

    case 'cards':
      return JSON.parse(localStorage.getItem('lastSearch'))
    default:
      break;
  }
}

export function checkScreenSize({
  isBigScreen,
  isMediumScreen,
  array
}) {
  let sliced = null

  // instead of movies.slice(0, 12) we can use search(movies) util function
  // that will return an array with found results
  if (isBigScreen) {
    sliced = array.slice(0, 12)
  } else if (isMediumScreen) {
    sliced = array.slice(0, 8)
  } else {
    sliced = array.slice(0, 5)
  }
  return sliced
}
