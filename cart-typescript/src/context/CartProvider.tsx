import { createContext, ReactElement, useMemo, useReducer } from "react"

const REDUCER_ACTION_TYPES = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SUBMIT: 'SUBMIT',
    QUANTITY: 'QUANTITY',
}

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

export type CartStateType = { cart: CartItemType[] }

export type ReducerActionType = typeof REDUCER_ACTION_TYPES
export type ReducerAction = { type: string, payload: CartItemType }

const initialCartState: CartStateType = { cart: [] }

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPES.ADD: {
            if (!action.payload) throw new Error('action.payload is not provided')
            const { name, price, sku } = action.payload

            // return all the items except the one that we want to update
            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            // return the only items that we want to update
            const existingItem: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty: number = existingItem ? existingItem.qty + 1 : 1

            return {
                ...state, cart: [...filteredItems, { sku, name, price, qty }]
            }
        }
        case REDUCER_ACTION_TYPES.QUANTITY: {
            const { sku, qty } = action.payload

            const existingItem: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            if (!existingItem) throw new Error('In order to update the item, it must exist')

            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            const updatedItem: CartItemType = { ...existingItem, qty }

            return { ...state, cart: [...filteredItems, updatedItem] }
        }
        case REDUCER_ACTION_TYPES.REMOVE: {
            const { sku } = action.payload
            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return { ...state, cart: [...filteredItems] }
        }
        case REDUCER_ACTION_TYPES.SUBMIT: {
            return { ...state, cart: [] }
        }
        default: {
            return state
        }
    }
}

export const useCartContext = (initialCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initialCartState)
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPES
    }, [])

    const totalItems = state.cart.reduce((previousValue, cartItem) => previousValue + cartItem.qty, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(state.cart.reduce((previousValue, cartItem) => previousValue + (cartItem.qty * cartItem.price), 0));

    const carts = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, carts }
}

export type UseCartContextType = ReturnType<typeof useCartContext>
const initialCartContexState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPES,
    carts: [],
    totalItems: 0,
    totalPrice: '',
}

export const CartContext = createContext<UseCartContextType>(initialCartContexState)
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initialCartState)}>
            {children}
        </CartContext.Provider>
    )
}

