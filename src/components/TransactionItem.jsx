const TransactionItem = ({ transaction }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <span style={styles.label}>Amount:</span>
        <span style={styles.value}>{transaction.amount}€</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Description:</span>
        <span style={styles.value}>
          {truncateText(transaction.description || "-", 20)}
        </span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Category:</span>
        <span style={styles.value}>
          {transaction.category.charAt(0).toUpperCase() +
            transaction.category.slice(1)}
        </span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Type:</span>
        <span style={styles.value}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Account:</span>
        <span style={styles.value}>
          {transaction.account.charAt(0).toUpperCase() +
            transaction.account.slice(1)}
        </span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Date:</span>
        <span style={styles.value}>{transaction.date}</span>
      </div>
      {transaction.comment && (
        <div style={styles.row}>
          <span style={styles.label}>Comment:</span>
          <span style={styles.value}>{transaction.comment}</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "normal",
  },
};

export default TransactionItem;
