import React from 'react'

const Order = ({order}) => {
  return (
    <div>
      <div>
        <p>Pedido #{order.id}</p>
        <p>Número da mesa: {order.tableNumber}</p>
        <p>Total: R$ {order.price}</p>
      </div>

      <div>
        <button>X</button>
        <button>Avançar</button>
      </div>
    </div>
  )
}

export default Order