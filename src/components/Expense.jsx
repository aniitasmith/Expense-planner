/* eslint-disable react/prop-types */
import { 
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import {formatDate} from '../helpers'
import savingsIcon from '../assets/img/icono_ahorro.svg'
import homeIcon from '../assets/img/icono_casa.svg'
import foodIcon from '../assets/img/icono_comida.svg' 
import miscellaneousIcon from '../assets/img/icono_gastos.svg'
import leisureIcon from '../assets/img/icono_ocio.svg'
import healthIcon from '../assets/img/icono_salud.svg'
import subscriptionsIcon from '../assets/img/icono_suscripciones.svg'

const iconDictionary = {
  savings : savingsIcon,
  food : foodIcon,
  home : homeIcon,
  health : healthIcon,
  leisure : leisureIcon,
  miscellaneous : miscellaneousIcon, 
  Subscriptions : subscriptionsIcon
}

const Expense = ({expense, setEditExpense, deleteExpense}) => {
  const {name, amount, category, date, id} = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions= () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
          Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img
              src={iconDictionary[category]}
              alt='Expense icon'
            />
            <div className="descripcion-gasto">
              <p className="categoria"> {category} </p>
              <p className="nombre-gasto"> {name} </p>
              <p className="fecha-gasto">
                Added on:{' '}
                <span>{formatDate(date)}</span> </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div> 
      </SwipeableListItem>   
    </SwipeableList>
  )
}

export default Expense
