const removeOrderByIndex = (existingBook, orderIndex) => [
  ...existingBook.slice(0, orderIndex),
  ...existingBook.slice(orderIndex + 1)
]

const matchBuyAndSell = (typeOne, typeTwo) => (
  (typeOne === 'buy' && typeTwo === 'sell') ||
  (typeOne === 'sell' && typeTwo === 'buy')
)

const reconcileOrder = (existingBook, incomingOrder) => {
  const orderIndex = existingBook.findIndex(order => {
    return (
      order.price === incomingOrder.price &&
      matchBuyAndSell(order.type, incomingOrder.type)
    )
  })

  if (orderIndex === -1) {
    return existingBook.concat(incomingOrder)
  }

  if (existingBook[orderIndex].quantity === incomingOrder.quantity) {
    return removeOrderByIndex(existingBook, orderIndex)
  }

  if (existingBook[orderIndex].quantity > incomingOrder.quantity) {
    return [
      ...removeOrderByIndex(existingBook, orderIndex),
      {
        ...existingBook[orderIndex],
        quantity: existingBook[orderIndex].quantity - incomingOrder.quantity
      }
    ]
  }

  return reconcileOrder(
    [...removeOrderByIndex(existingBook, orderIndex)],
    {
      ...incomingOrder,
      quantity: incomingOrder.quantity - existingBook[orderIndex].quantity
    }
  )
}

module.exports = reconcileOrder
