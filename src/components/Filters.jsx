/* eslint-disable react/prop-types */
const Filters = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label>Filter expenses</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value) }
            >
            <option value="">--All categories--</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="health">Health</option>
            <option value="leisure">Leisure</option>
            <option value="subscriptions">subscriptions</option>
            <option value="miscellaneous">Miscellaneous expenses</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filters
