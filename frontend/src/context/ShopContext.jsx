import { createContext, useEffect, useState } from "react";
import { products } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showsearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId, size)=>{

        if (!size){
            toast.error('Select a Product Size');
            return ;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for (const items in cartItems){
            for (const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){

                }
            }
        } return totalCount;
    }

    const updateQuantity = async(itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = ()=>{
        console.log('get cart amount called!!!')
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            console.log(itemInfo);
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item]>0){
                        console.log('entered if statement');
                        
                        totalAmount += itemInfo.price * cartItems[items][item]
                        console.log("total amount = ",totalAmount)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        
        return totalAmount;
    }

    const value = {
        products, currency, delivery_fee, addToCart, getCartCount, cartItems, setCartItems,
        search, setSearch, showsearch, setShowSearch, updateQuantity, 
        getCartAmount, navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;