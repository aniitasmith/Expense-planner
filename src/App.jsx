import { useEffect, useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import NewExpenseIcon from './assets/img/nuevo-gasto.svg'
import ExpensesList from './components/ExpensesList'
import Filters from './components/Filters'
import {generateId} from './helpers'

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  )
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  )
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal ,setAnimateModal] = useState(false)
  const [editExpense ,setEditExpense] = useState({})
  const [filter, setFilter] = useState('')
  const [expensesFiltered, setExpensesFiltered] = useState([])

  useEffect (() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true)

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
    }
  }, [editExpense] )

  useEffect (() => {
    localStorage.setItem('budget', budget ?? 0)
  },[budget])

  useEffect (() => {
    localStorage.setItem('expenses',JSON.stringify(expenses) ?? [])
  },[expenses])

  useEffect (() => {
   if (filter){
    const expensesFiltered = expenses.filter(expense => expense.category === filter)
    setExpensesFiltered(expensesFiltered)
   }
  },[filter])

  useEffect (() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0
    if (budgetLS>0) {
      setIsValidBudget(true)
    }
  },[])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveExpenses = expense => {
    if(expense.id){
      const updatedExpenses = expenses.map( (currentExpense) => currentExpense.id === expense.id ? expense : currentExpense)
      setExpenses(updatedExpenses)
    } else {
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
      setEditExpense({})
    }
    
    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteExpense = id => {
   const updatedExpenses = expenses.filter( expense => expense.id !==id)
   setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

    {isValidBudget && (
      <>
      <main>
        <Filters
          filter={filter}
          setFilter={setFilter}
          />
        <ExpensesList
          expenses={expenses}
          setEditExpense={setEditExpense}
          deleteExpense={deleteExpense}
          filter={filter}
          expensesFiltered={expensesFiltered}
        />
      </main>
      <div className='nuevo-gasto'>
        <img
          src={NewExpenseIcon}
          alt='IconNewExpense'
          onClick={handleNewExpense}
        />
      </div>
      </>
    )}  

    {modal && <Modal
                setModal={setModal}
                animateModal={animateModal}
                setAnimateModal={setAnimateModal}
                saveExpenses={saveExpenses}
                editExpense={editExpense}
                setEditExpense={setEditExpense}
                />}    
    </div>  
  )
}

export default App
