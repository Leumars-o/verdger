import React from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useState } from "react";
import { handleGetProductBySearch } from "../firebase/firestone";

SearchProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
SearchProviderContext.propType = {};

const searchContext = createContext();

export function SearchProviderContext({ children }) {
  const [product, setProduct] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchErr, setSeachErr] = useState("");

  const handleSearch = async function (search) {
    setSeachErr("");

    if (!search) return setSeachErr("There is no search value");

    try {
      setIsSearching(true);
      const data = await handleGetProductBySearch(Number(search));
      if (data.docs.length === 0)
        throw new Error("There is no product that match your search results");

      data.forEach((docs) => setProduct(docs.data()));
    } catch (error) {
      setSeachErr(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <searchContext.Provider
      value={{ product, isSearching, searchErr, handleSearch }}
    >
      {children}
    </searchContext.Provider>
  );
}

export function searchProvider() {
  const context = useContext();

  if (!context) throw new Error("context is used out of scope");

  return context;
}