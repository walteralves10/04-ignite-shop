import Image from "next/image";
import {
    SidebarProductContainer,
    SidebarCart,
    SidebarContainer,
    SidebarHeader,
    SidebarSubTotal,
    ImageContainer,
    SidebarProductDetails,
} from "../styles/components/sidebar";
import { X } from "@phosphor-icons/react";
import { useContext } from "react";
import { CartContext } from "../contexts/context-cart";
import { formatPrice } from "../utils";

function Sidebar() {
  const {
    cart,
    toggleSideBar,
    handleToggleSideBar,
    removeProductCart,
    handleBuyProduct,
  } = useContext(CartContext)
  
  const handleCloseButton = () => {
    handleToggleSideBar(!toggleSideBar)
  }

  const handleRemove = (id: string) => {
    removeProductCart(id)
  }

  const handleCheckout = () => {
    handleBuyProduct()
  }

  const quantity = cart.length
  const amountValue = cart.reduce((acc, product) => acc + product.price, 0)

  return (
    <SidebarContainer position={toggleSideBar ? "open" : "close"}>

      <SidebarHeader>
        <button onClick={handleCloseButton}>
          <X size={24} />
        </button>
      </SidebarHeader>

      <SidebarCart>

        <h1>Sacola de compras</h1>
        {
          cart.map(product => (
            <SidebarProductContainer key={product.id}>
              <ImageContainer>
                <Image src={product.imageUrl} alt="img" width={101} height={93} />
              </ImageContainer>
              <SidebarProductDetails>
                <h1>{product.name}</h1>
                <span>{formatPrice(product.price)}</span>
                <button onClick={() => handleRemove(product.id)}>Remover</button>
              </SidebarProductDetails>
            </SidebarProductContainer>
          ))
        }

      </SidebarCart>

      <SidebarSubTotal>
        <div>
          <span>Quantidade</span>
          <span>{`${quantity} ${quantity > 1 ? 'itens': 'item'}`}</span>
        </div>

        <div>
          <strong>Valor total</strong>
          <strong>{formatPrice(amountValue)}</strong>
        </div>
      
        <button
          className="purchase-button"
          disabled={quantity <= 0}
          onClick={handleCheckout}
        >
          Finalizar compra
        </button>
      </SidebarSubTotal>

    </SidebarContainer>
  );
}

export default Sidebar;