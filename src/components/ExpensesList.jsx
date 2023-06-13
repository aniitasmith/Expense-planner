/* eslint-disable react/prop-types */
import Expense from "./Expense"

const ExpensesList = ({
  expenses,
  setEditExpense,
  deleteExpense,
  filter,
  expensesFiltered}) => {
  return (
    <div className="listado-gastos contenedor">
      { filter ? (
        <>
          <h2>{expensesFiltered.length ? "Expenses" : "No expenses in this category"}</h2> 
          {expensesFiltered.map( expense => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Expenses" : "No expenses yet"}</h2> 
          {expenses.map( expense => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))} 
        </>   
      )}
    </div>
  )
}

export default ExpensesList
