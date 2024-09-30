import { createContext, ReactElement, useEffect, useState } from "react"

// To run the json server, run the code below in the terminal
// npx json-server -w data/products.json -p 3500

export type ProductType = {
    sku: string,
    name: string,
    price: number,
}
export type UseProductsContextType = { products: ProductType[] }
type ChildrenType = { children?: ReactElement | ReactElement[] }

const initialContextState: UseProductsContextType = { products: [] }
const initialState: ProductType[] = []


const ProductsContext = createContext<UseProductsContextType>(initialContextState)

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initialState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            let response:ProductType[]=[]
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