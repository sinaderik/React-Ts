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
