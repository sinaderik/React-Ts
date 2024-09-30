export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

export type CartStateType = { cart: CartItemType[] }

const REDUCER_ACTION_TYPES={
    ADD:'ADD',
    REMOVE:'REMOVE',
    SUBMIT:'SUBMIT',
    QUANTITY:'QUANTITY',
}

