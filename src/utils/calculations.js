export function getTotalBalance(transactions) {

  return transactions.reduce((sum, t) => {

    if (t.type === "income") {
      return sum + t.amount;
    }

    return sum - t.amount;

  }, 0);
}


export function getCategoryRemaining(category, transactions) {

  const related = transactions.filter(
    t => t.categoryId === category.id
  );

  const spent = related.reduce((sum, t) => {

    if (t.type === "expense") {
      return sum + t.amount;
    }

    return sum - t.amount;

  }, 0);

  return category.limit - spent;
}