import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { QueryClientProvider } from "@tanstack/react-query"
import getQueryClient from "./api/getQueryClient.ts"

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import("./mock/index.ts")

  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={getQueryClient()}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  )
})
