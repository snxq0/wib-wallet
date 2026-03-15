import { useState } from "react";
import "../styles/modal.css";

export default function AddTransaction({ categoryId, addTransaction, onClose }) {

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  function submit(e) {
    e.preventDefault();

    if (!amount) return;

    addTransaction(categoryId, type, Number(amount));

    setAmount("");
    onClose();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>Add transaction</h3>

        <form onSubmit={submit}>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="transaction-type">

            <button
              type="button"
              className={type === "expense" ? "active" : ""}
              onClick={() => setType("expense")}
            >
              Expense
            </button>

            <button
              type="button"
              className={type === "income" ? "active" : ""}
              onClick={() => setType("income")}
            >
              Income
            </button>

          </div>

          <button type="submit">
            Add
          </button>

        </form>

      </div>

    </div>
  );
}