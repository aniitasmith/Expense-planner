/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import  axios  from 'axios'
import { useEffect, useState } from 'react'
import Header from './Header'
import Modal from './Modal'
import NewExpenseIcon from '../assets/img/nuevo-gasto.svg'
import ExpensesList from './ExpensesList'
import Filters from './Filters'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const TabContent = ({isSelected, isValidBudget, setIsValidBudget, selectedBudget}) => {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) || 0 )
  const [modal, setModal] = useState(false)
  const [animateModal ,setAnimateModal] = useState(false)
  const [editExpense ,setEditExpense] = useState({})
  const [filter, setFilter] = useState('')
  const [expensesFiltered, setExpensesFiltered] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true)

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget || 0)
  },[budget])

  const getExpenses = async () => {
    try {
      const existingExpenses = await axios.get(`${API_BASE_URL}/expenses`)
      setExpenses(existingExpenses.data  || [])
    } catch (error) {
      setExpenses([])
      console.error('Error getting expenses', error)
    }
  }

  useEffect(() => {
    console.log('bugget ha cambiado')
    if (isValidBudget) {
      getExpenses()
      console.log('expense geteadoos')
    } 
  }, [isValidBudget])

  useEffect(() => {
   if (filter){
    const expensesFiltered = expenses.filter(
      (expense) => expense.category === filter
    )
    setExpensesFiltered(expensesFiltered)
   }
  }, [filter])

  useEffect( () => {
    const budgetLS = Number(localStorage.getItem('budget')) || 0
    setIsValidBudget(budgetLS > 0)
    console.log('bugget seteado')
  },[])

  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveExpenses = async (expense) => {
    try {
      if(expense.id){
        await axios.put(`${API_BASE_URL}/expenses/${expense.id}`, expense)
      } else {
      await axios.post(`${API_BASE_URL}/expenses`, expense);
      }

      setAnimateModal(false)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setModal(false)
      setEditExpense({})
      getExpenses()      
    } catch (error) {
      console.error('Error saving expenses', error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/expenses/${id}`);
    } catch (error) {
      console.error('Error deleting expense', error);
  }
}

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        expenses={expenses}
        setExpenses={setExpenses}
        budget={selectedBudget?.amount}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        tabSelected={isSelected}
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

export default TabContent

