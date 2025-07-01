import React from 'react';
import ReactDOM from 'react-dom';
import ExpenseEntryItemList from './Components/ExpenseEntryItemList';

function App() {
  return (
    <div className="App">
      <>
      <h1 style={{textAlign: "center"}}>Expense Entry Item List</h1>
      <ExpenseEntryItemList />
      </>
      
    </div>
  );
}

export default App;
