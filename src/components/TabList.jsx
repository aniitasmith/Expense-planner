import { useState, useEffect } from 'react';
import Tab from './Tab';
import axios from 'axios';
import TabContent from './TabContent';

const API_BASE_URL = 'http://localhost:3000/api/v1'

const TabList = () => {
  const [tabs, setTabs] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [selectedBudget, setSelectedBudget] =useState({amount:900})
  const [allBudgets, setAllBudgets] = useState([])

  const getAllBudgets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/budgets`)
      setAllBudgets(response.data)
      setTabs(response.data.map((budget) =>({'name': budget.name,'id':budget.id})))
    } catch (error) {
      console.error('Error getting budgets', error)
    }
  }

  useEffect( () => {
    getAllBudgets()
  }, []);

  const handleTabClick = (id) => {
    setSelectedTab(id);
    setSelectedBudget(allBudgets.find(budget => budget.id=== id))
  };

  const handleAddTabClick = () => {
    const newTabs = [...tabs, `${tabs.length + 1}`];
    setTabs(newTabs);
    setSelectedTab(newTabs.length - 1);
  };

  const handleDeleteTab = (index) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setSelectedTab(selectedTab >= newTabs.length ? newTabs.length - 1 : selectedTab);
  };

  return (
    <div className="tab-list">
      {isValidBudget ? (
        <div className='grupo-pestanas'>
     {tabs.map((budget, index) => (
        <Tab
          key={index}
          nameBudget={budget.name}
          onClick={() => handleTabClick(budget.id)}
          onDelete={() => handleDeleteTab(index)}
          isSelected={budget.id === selectedTab}
        />
      ))}
        <div className="add-tab" onClick={handleAddTabClick}>+</div>
      </div>
      ) : null}
    <TabContent 
        content={tabs[selectedTab]} 
        isSelected={selectedTab===0} 
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        selectedBudget={selectedBudget}
      />
    </div>
  );
};

export default TabList;