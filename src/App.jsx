import AccountButton from './components/AccountButton'
import TabList from './components/TabList'

function App() {
  return (
    <>
    <div className='header-container'>
      <h1 className='principalTitle'>Expense Planner</h1>
      <AccountButton></AccountButton>
    </div>
      <TabList></TabList>
    </>
  )
}

export default App
