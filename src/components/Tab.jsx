// eslint-disable-next-line react/prop-types
const Tab = ({nameBudget, onClick, onDelete, isSelected }) => {
  return (
    <div className={`tab ${isSelected ? 'selected' : 'deselected'}`}>
      <div 
        className="tab-label"
        onClick={onClick}
      >
        {nameBudget}
      </div>
      <button className="delete-button"
        onClick={onDelete}
      >
        x
      </button>
    </div>
  );
};

export default Tab;