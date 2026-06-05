import React from "react";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const useDynamicState = (...stateNames) => {
  const states = stateNames.map(() => ({
    isolate: React.useState([]),
    tab: React.useState(0),
    data: React.useState(0),
  }));

  const state = {};
  stateNames.forEach((stateName, i) => {
    const { isolate, tab, data } = states[i];
    state[stateName] = isolate[0];
    state[`${stateName}Tab`] = tab[0];
    state[`${stateName}Data`] = data[0];
    state[`set${capitalizeFirstLetter(stateName)}`] = isolate[1];
    state[`set${capitalizeFirstLetter(stateName)}Tab`] = tab[1];
    state[`set${capitalizeFirstLetter(stateName)}Data`] = data[1];
  });

  return state;
};

export default useDynamicState;