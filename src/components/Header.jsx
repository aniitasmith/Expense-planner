/* eslint-disable react/prop-types */
import BudgetControl from "./BudgetControl"
import NewBudget from "./NewBudget"

const Header = ({
    expenses,
    setExpenses,   
    budget,
    setBudget,
    isValidBudget,
    setIsValidBudget
}) => {
  return (
    <header>
      <h1>Expense Planner</h1>

      {isValidBudget ? (
        <BudgetControl
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        ></BudgetControl>
      ) : (
      <NewBudget
        budget={budget}
        setBudget={setBudget}
        setIsValidBudget={setIsValidBudget}
      />
      )}  
    </header>
  )
}

export default Header
