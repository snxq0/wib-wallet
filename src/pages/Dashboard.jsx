import { useFinanceStore } from "../store/financeStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { data, addCategory, deleteCategory } = useFinanceStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const totalBalance = data.transactions.reduce((sum, t) => {
    return t.type === "income"
      ? sum + t.amount
      : sum - t.amount;
  }, 0);

  return (
    <div className="container">

      <div className="title">
        Total balance
      </div>

      <div className="balance">
        {totalBalance} €
      </div>

      {data.categories.map(c => {

        const transactions = data.transactions.filter(
          t => t.categoryId === c.id
        );

        const balance = transactions.reduce((sum, t) => {
          return t.type === "income"
            ? sum + t.amount
            : sum - t.amount;
        }, 0);

        return (

          <div
            key={c.id}
            className="card"
            onClick={() => navigate(`/category/${c.id}`)}
          >

            <div>

              <div className="card-title">
                {c.name}
              </div>

              <div className="card-sub">
                Balance: {balance} €
              </div>

            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteCategory(c.id);
              }}
            >
              ✕
            </button>

          </div>

        );

      })}

      <div style={{ marginTop: 30 }}>

        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={() => {

            if (!name) return;

            addCategory(name);
            setName("");

          }}
        >
          Add category
        </button>

      </div>

    </div>
  );
}