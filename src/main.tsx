import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Index } from './routes/index'
import { Layout } from './routes/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <Index />
    </Layout>
  </React.StrictMode>
)
