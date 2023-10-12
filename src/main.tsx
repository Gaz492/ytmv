import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider, theme} from "antd";
import {Root} from "./pages/Root/Root.tsx";
import {FourView} from "./pages/FourView/FourView.tsx";

const appVersion = import.meta.env.DEV
    ? 'Developer Build'
    : VITE_APP_COMMIT_SHA
        ? VITE_APP_COMMIT_SHA.substring(0, 10)
        : 'SHA not available'

console.log(
    `%c YTMV %c Version 3.0.0-${appVersion}`,
    'font-weight: bold; color: #E45B00; background: #2483B0; padding: 5px;',
    'color: black; background: #0699DC; padding: 5px;'
)

const router = createBrowserRouter([
    {
        path: '/', element: <Root/>, children: [
            {path: '/', element: <FourView/>},
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>,
)
