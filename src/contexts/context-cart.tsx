import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface Cart {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceId: string;
}

type CartContextType = {
  cart: Cart[];
  addCart: (cart: Cart) => void;
  removeProductCart: (productId: string) => void;
  toggleSideBar: boolean;
  handleToggleSideBar: (isOpen: boolean) => void;
  handleBuyProduct: () => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

type CartContextProviderProps = {
  children: ReactNode
} 

export function CartContextProvider ({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([])
  const [toggleSideBar, setToggleSideBar] = useState(false)

  function handleToggleSideBar (isOpen: boolean) {
    setToggleSideBar(isOpen)
  }

  function addCart (cart: Cart) {
    setCart(old => [...old, cart])
  }

  function removeProductCart (productId: string) {
    const productRemove = cart.filter(product => product.id !== productId)
    setCart(productRemove)
  }

  async function handleBuyProduct() {
    try {
      const data = cart.map(product => ({ quantity: 1, price: product.priceId }))

      const response = await axios.post('/api/checkout', {
        products: data,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeProductCart,
        toggleSideBar,
        handleToggleSideBar,
        handleBuyProduct
      }}
    >
      {children}
    </CartContext.Provider>
  )
}