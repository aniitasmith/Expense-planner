/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import BudgetControl from "./BudgetControl"
import NewBudget from "./NewBudget"

const Header = ({
    expenses,
    setExpenses,   
    budget,
    setBudget,
    isValidBudget,
    setIsValidBudget,
    tabSelected,
}) => {
  return (
    <header>
      {isValidBudget ? (
        <BudgetControl
          expenses={expenses}
          setExpenses={setExpenses}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
          tabSelected={tabSelected}
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
