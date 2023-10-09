import purchasedBg from '../assets/purchased-bg.png'

export function Order() {
  return (
    <div className="order">
      <div>
        <h1 className="order__title">Uhul! Pedido confirmado</h1>
        <p className="order__description">
          Agora é só aguardar que logo o café chegará até você
        </p>

        <div className="order__delivery">
          <div>
            <p>
              Entrega em <strong>Av. Dr. Plínio de Castro Prado, 288</strong>
            </p>
            <p>Jardim Palma Travassos, Ribeirão Preto, SP</p>
          </div>

          <div>
            <p>Previsão de entrega</p>
            <p>
              <strong>20 min - 30 min</strong>
            </p>
          </div>

          <div>
            <p>Pagamento na entrega</p>
            <p>
              <strong>Cartão de crédito</strong>
            </p>
          </div>
        </div>
      </div>

      <img src={purchasedBg} alt="" role="presentation" />
    </div>
  )
}
