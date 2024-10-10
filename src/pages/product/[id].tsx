import { CartContext } from "@/src/contexts/context-cart"
import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { formatPrice } from "@/src/utils"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import Stripe from "stripe"

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  priceId: string;
}
interface ProductProps {
  product: Product
}

export default function Product ({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { isFallback } = useRouter()
    const { addCart } = useContext(CartContext)

    function handleAddProductInCart (product: Product) {
      setIsCreatingCheckoutSession(true)
      const newCart = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        priceId: product.priceId,
      }
      addCart(newCart)

      setIsCreatingCheckoutSession(false)
    }

    if (isFallback) {
      return <p>Loading...</p>
    }

    return (
      <>
        <Head>
          <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{formatPrice(product.price)}</span>

            <p>{product.description}</p>

            <button disabled={isCreatingCheckoutSession} onClick={() => handleAddProductInCart(product)}>
              Colocar na sacola
            </button>
          </ProductDetails>
        </ProductContainer>
      </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // buscar os produtos mais vendidos / mais acessados

  return {
    paths: [
      { params: { id: 'prod_QsVzjVElTMSKOb' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId= params?.id ?? ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        url: product.url,
        price: price?.unit_amount ?? 0,
        description: product.description,
        priceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}