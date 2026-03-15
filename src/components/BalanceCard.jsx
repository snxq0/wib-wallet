export default function BalanceCard({ balance }) {

  return (
    <div className="balance-card">

      <div className="balance-title">
        Total Balance
      </div>

      <div className="balance-amount">
        {balance} €
      </div>

    </div>
  );
}