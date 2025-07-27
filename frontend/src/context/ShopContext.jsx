import React, { createContext } from "react";
import Products from "../components/Assets/Products";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const ContextValue = {Products};

    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider; 