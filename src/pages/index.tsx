import Image from "next/image";
import { MouseEvent, useContext } from "react";
import { HomeContainer, Product } from "../styles/pages/home";
import Head from "next/head";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "@phosphor-icons/react";
import { CartContext } from "../contexts/context-cart";
import { formatPrice } from "../utils";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  priceId: string;
}
interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const { addCart, cart } = useContext(CartContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  function handleAddCart (e: MouseEvent<HTMLButtonElement>, data: Product) {
    e.preventDefault()
    const newCart = {
      id: data.id,
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      priceId: data.priceId,
    }
    addCart(newCart)
  }

  return (
    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>
    
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products?.map(product => {
        const containsInCart = cart.some(item => item.id === product.id)

        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product
              className="keen-slider__slide"
            >
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                </div>

                <button
                  disabled={containsInCart}
                  onClick={(e) => handleAddCart(e, product)}
                >
                  <Handbag size={32} />
                </button>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
    </>
  )
}

// file-system Routing
// Roteamento baseado em arquivos físicos

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: price?.unit_amount ?? 0,
      priceId: price.id,
    }
  })
  
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}