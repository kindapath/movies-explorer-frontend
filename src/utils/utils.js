import NotFoundError from "../errors/NotFoundError";

export function filterShortMovies(moviesArray) {

  const shortArray = moviesArray.filter(item => {
    return item.duration <= 40
  })

  return shortArray
}

export function search(keyword, moviesArray, isFilterChecked) {
  // take moviesArray
  // create new array for ex. resultsArray
  // that wiil be final result
  const resultArray = []

  // let resultsArray be the following:
  // we take moviesArray and the nameRU property of each item
  moviesArray.forEach(item => {
    // split nameRU prop
    const splittedName = item.nameRU.split(' ')

    // compare keyword to each splitted word
    splittedName.forEach(word => {
      // if any similarities

      if (word.toLowerCase() === keyword.toLowerCase()) {
        // => push the item to resultsArray

        resultArray.push(item)
        return
      }
    });

  });
  if (resultArray.length === 0) {
    throw new NotFoundError()
  }
  if (isFilterChecked) {
    return filterShortMovies(resultArray)
  }
  return resultArray
}
