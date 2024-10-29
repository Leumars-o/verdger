import React from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";

SearchProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
SearchProviderContext.propType = {};

const searchContext = createContext();

export function SearchProviderContext({ children }) {
  return <searchContext.Provider value={{}}>{children}</searchContext.Provider>;
}

export function searchProvider() {
  const context = useContext();

  if (!context) throw new Error("context is used out of scope");

  return context;
}
