import { useState, useEffect, useCallback, useRef } from "react";

export function useTransactionStatus(initialTxId = null) {
  const [txId, setTxId] = useState(initialTxId);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  // Use ref to track polling status to prevent useEffect dependencies issues
  const pollingTimeoutRef = useRef(null);
  const isPollingRef = useRef(false);

  const checkStatus = useCallback(async (txId) => {
    try {
      const res = await fetch(
        `https://api.testnet.hiro.so/extended/v1/tx/${txId}`
      );
      if (!res.ok) throw new Error("Failed to fetch transaction status");

      const data = await res.json();
      return {
        status: data.tx_status,
      };
    } catch (err) {
      console.error("Error checking transaction status:", err);
      throw err;
    }
  }, []);

  const pollStatus = useCallback(
    async (currentTxId) => {
      if (!currentTxId || !isPollingRef.current) return;

      try {
        const result = await checkStatus(currentTxId);

        // Only update state if we're still polling the same transaction
        if (currentTxId === txId) {
          setStatus(result.status);

          if (result.status === "pending" && isPollingRef.current) {
            pollingTimeoutRef.current = setTimeout(() => {
              pollStatus(currentTxId);
            }, 3000);
          }

          if (result.status === "abort_by_response") {
            isPollingRef.current = false;
            setIsPolling(false);
          }

          if (result.status === "success") {
            isPollingRef.current = false;
            setIsPolling(false);
          }
        }
      } catch (err) {
        if (currentTxId === txId) {
          setError(err.message);
          setIsPolling(false);
          isPollingRef.current = false;
        }
      }
    },
    [checkStatus, txId]
  );

  const startPolling = useCallback(() => {
    if (!txId || isPollingRef.current) return;

    setIsPolling(true);
    setError(null);
    isPollingRef.current = true;
    pollStatus(txId);
  }, [txId, pollStatus]);

  // Start polling when txId changes
  useEffect(() => {
    if (txId) {
      startPolling();
    }

    // Cleanup function
    return () => {
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
      isPollingRef.current = false;
      setIsPolling(false);
    };
  }, [txId, startPolling]);

  const trackTransaction = useCallback((newTxId) => {
    // Clean up existing polling before starting new
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
    }
    isPollingRef.current = false;

    setTxId(newTxId);
    setStatus("pending");
    setError(null);
  }, []);

  return {
    txId,
    status,
    error,
    isPolling,
    trackTransaction,
  };
}
