import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {

  const [data, setData] = useState(() => {

    const saved = localStorage.getItem("finance-data");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      categories: [],
      transactions: []
    };

  });

  useEffect(() => {
    localStorage.setItem(
      "finance-data",
      JSON.stringify(data)
    );
  }, [data]);

  function addCategory(name) {

    const newCategory = {
      id: Date.now(),
      name
    };

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

  }

  function deleteCategory(id) {

    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
      transactions: prev.transactions.filter(t => t.categoryId !== id)
    }));

  }

  function addTransaction(categoryId, type, amount) {

    const newTransaction = {
      id: Date.now(),
      categoryId: currentCategory,
      type,
      amount,
      description: data.description,
      date: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction]
    }));

  }

  function deleteTransaction(id) {

    setData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));

  }

  return (
    <FinanceContext.Provider
      value={{
        data,
        addCategory,
        deleteCategory,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </FinanceContext.Provider>
  );

}

export function useFinanceStore() {
  return useContext(FinanceContext);
}