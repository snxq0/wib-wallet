import { useParams, useNavigate } from "react-router-dom";
import { useFinanceStore } from "../store/financeStore";
import { useState } from "react";

export default function Category() {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    addTransaction,
    deleteTransaction
  } = useFinanceStore();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const category = data.categories.find(
    c => c.id === Number(id)
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  const transactions = data.transactions.filter(
    t => t.categoryId === category.id
  );

  const balance = transactions.reduce((sum, t) => {
    return t.type === "income"
      ? sum + t.amount
      : sum - t.amount;
  }, 0);

  return (
    <div style={{
      maxWidth: 420,
      margin: "auto",
      padding: 20
    }}>

      <button onClick={() => navigate("/")}>
        ← Back
      </button>

      <h2>{category.name}</h2>

      <div style={{
        fontSize: 24,
        marginBottom: 20
      }}>
        Balance: {balance} €
      </div>

      <h3>Add transaction</h3>


      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

       <input type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
       />


      <div style={{ marginTop: 10 }}>

        <button
          onClick={() => setType("expense")}
        >
          Expense
        </button>

        <button
          onClick={() => setType("income")}
        >
          Income
        </button>

      </div>

      <button
        style={{ marginTop: 10 }}
        onClick={() => {

          if (!amount) return;

          addTransaction(
            category.id,
            type,
            Number(amount)
          );

          setAmount("");
          setDescription("");

        }}
      >
        Add
      </button>

      <h3 style={{ marginTop: 30 }}>
        Transactions
      </h3>

      {transactions.map(t => (

        <div
          key={t.id}
          style={{
            background: "#2b2b2b",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between"
          }}
        >

          <div>
            {t.type === "income" ? "+" : "-"}
            <div></div>
            {t.description}
            <div></div>
            {t.amount} €
          </div>

          <button
            onClick={() => deleteTransaction(t.id)}
          >
            ❌
          </button>

        </div>

      ))}

    </div>
  );
}