/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import closeBtn from '../assets/img/cerrar.svg'
import Message from './Message'

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpenses,
  editExpense,
  setEditExpense
}) => {

  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [id ,setId] = useState('')

  useEffect(() => {
    if(Object.keys(editExpense).length > 0){
      setName(editExpense.name)
      setAmount(editExpense.amount)
      setCategory(editExpense.category)
      setId(editExpense.id)
      setDate(editExpense.date)
    }
  },[editExpense])

  const hideModal = () => {   
    setAnimateModal(false)
    setEditExpense({})

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      if([name, amount,category].includes('')){
        setMessage('All fields are required')
        setTimeout(() => {
          setMessage('')
        }, 2000);
        return
      }
      saveExpenses({name, amount,category,date, id})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={closeBtn}
          alt='closeBtn'
          onClick={hideModal} 
        />
      </div>
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{editExpense.name ? "Edit Expense" : "New Expense"}</legend>
        { message && <Message type='error'>{message}</Message>}
        <div className='campo'>
          <label htmlFor='nombre'> Expense name</label>
          <input
            id='nombre'
            type='text'
            placeholder='Add expense name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor='cantidad'>Amount</label>
          <input
            id='cantidad'
            type='number'
            placeholder='Add expense amount. Ex: 300'
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>
        <div className='campo'>
          <label htmlFor='categoria'>Category</label>
          <select
            id="categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="health">Health</option>
            <option value="leisure">Leisure</option>
            <option value="subscriptions">subscriptions</option>
            <option value="miscellaneous">Miscellaneous expenses</option>
          </select>
        </div>
        <input
          type='submit'
          value={editExpense.name ? "Save Changes" : "Add Expense"}/>
      </form>
    </div>
  )
}

export default Modal
