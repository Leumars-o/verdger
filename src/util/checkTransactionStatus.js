async function checkTransactionStatus({ txId }) {
  try {
    const res = await fetch(
      `https://api.testnet.hiro.so/extended/v1/tx/${txId}`
    );
    const data = await res.json();

    return { message: data.tx_status, time: data.block_time_iso };
  } catch (error) {
    throw error;
  }
}

export default checkTransactionStatus;
