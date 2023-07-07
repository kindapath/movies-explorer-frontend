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
