import { createContext, ReactElement, useEffect, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number,
}
export type UseProductsContextType = { products: ProductType[] }
type ChildrenType = { children?: ReactElement | ReactElement[] }

const initialContextState: UseProductsContextType = { products: [] }
const initialState: ProductType[] = []

// const initialState: ProductType[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }
// ]

const ProductsContext = createContext<UseProductsContextType>(initialContextState)

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initialState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            let response
            try {
                const data = await fetch('http://localhost:3500')
                response = await data.json()
            } catch (error) {
                console.log(error)
            }
            return response
        }
        fetchProducts().then(products => setProducts(products))
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )

}