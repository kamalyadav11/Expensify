//Get Visible expenses(for filtering redux data)\
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {//expenses is the complete expense array and filters we need
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    //if(expense.description(includes) text) then => return true

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if(sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1 //returns most recent expense
      } else if(sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1
      }
  })
};

export default getVisibleExpenses;