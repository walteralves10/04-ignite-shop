import { Handbag } from "@phosphor-icons/react";
import Image from "next/image";
import logoImg from '../assets/logo.svg'
import { HeaderCss } from "../styles/pages/app";
import { useContext } from "react";
import { CartContext } from "../contexts/context-cart";
import Sidebar from "./sidebar";

function Header() {
  const { cart, handleToggleSideBar } = useContext(CartContext)
  const cartSize = cart.length > 0
  return (
    <HeaderCss>
    <Image src={logoImg} alt="" />

    <button onClick={() => handleToggleSideBar(true)}>
      <Handbag size={24} />
      { cartSize && 
        <span>{cart.length}</span>
      }
    </button>

    <Sidebar />
    </HeaderCss>
  );
}

export default Header;