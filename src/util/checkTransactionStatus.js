async function checkTransactionStatus({ txId }) {
  try {
    const res = await fetch(
      `https://api.testnet.hiro.so/extended/v1/tx/${txId}`
    );
    const data = await res.json();

    return data.tx_status;
  } catch (error) {
    throw error;
  }
}
