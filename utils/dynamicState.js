import React from "react";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const useDynamicState = (...stateNames) => {
    const state = {};

    stateNames.forEach((stateName) => {
      const [isolate, setIsolate] = React.useState(0);
      const [tab, setTab] = React.useState(0);
      const [data, setData] = React.useState(0);
  
      state[`${stateName}`] = isolate;
      state[`${stateName}Tab`] = tab;
      state[`${stateName}Data`] = data;
      state[`set${capitalizeFirstLetter(stateName)}`] = setIsolate;
      state[`set${capitalizeFirstLetter(stateName)}Tab`] = setTab;
      state[`set${capitalizeFirstLetter(stateName)}Data`] = setData;
       });
    return state;
  };

  export default useDynamicState;