import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Index } from './routes/index'
import { Layout } from './routes/layout'
import { Checkout } from './routes/checkout'
import { Order } from './routes/order'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <Index />
    </Layout>
  </React.StrictMode>
)
