/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"
import Message from "./Message"

const API_BASE_URL = 'http://localhost:3000/api/v1'

const NewBudget = ({
  budget,
  setBudget,
  setIsValidBudget
}) => {
  const [message, setMessage] = useState('')
  const [budgetName, setbudgetName] =useState('')
  const [isRecurring, setIsRecurring] =useState('')


  const handleBudget = (e) => {
    e.preventDefault()

    if(!budget || budget < 0) {
      setMessage('Its not a valid budget')
      return
    }
    if(!budgetName || budgetName < '') {
      setMessage('Its not a valid budget name')
      return
    }
    setMessage('')
    addBudget({
      name: budgetName,
      amount: Number(budget),
      recurring: isRecurring
    })
    setIsValidBudget(true)
  }

const addBudget = async (budgetData) => {
  try {
    const newBudget = await axios.post(`${API_BASE_URL}/budgets`, budgetData)
    localStorage.setItem("budgetId", newBudget.data?.id)
  } catch (error) {
    console.error('Error adding budget', error)
  }
}

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form  onSubmit={handleBudget} className="formulario">
      <h1> Create a new Budget</h1>
        <div className="campo">
          <label>Budget Name</label>
          <input
            className="nuevo-presupuesto"
            type="text"
            placeholder="Add a name for your budget"
            value={budgetName}
            onChange={e => setbudgetName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Define Budget</label>
          <input 
            className="nuevo-presupuesto"
            type="number" 
            placeholder="Add your budget"
            value={budget}
            onChange={ e => setBudget(Number(e.target.value))}
            />
        </div>
        <div className="campo checkbox-container">
          <label className="checkbox-label">
            Recurring
            <input
              className="checkbox-input"
              type="checkbox"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
            <span className="checkbox-custom"></span>
          </label>
        </div>
        <input type="submit" value='Add'  />
        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  )
}

export default NewBudget
