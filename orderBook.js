const reconcileOrder = (existingBook, incomingOrder) => {
  const foundIndex = existingBook.findIndex({
    //need a function that looks at the parts of the incoming order and changes the type looked for to buy
    ...incomingOrder,
    type: 'buy'
  })

  if (foundIndex !== -1) {
    return [
      ...existingBook.slice(0, foundIndex),
      ...existingBook.slice(foundIndex + 1),
    ]
  }

  return existingBook.concat(incomingOrder)

}

module.exports = reconcileOrder
