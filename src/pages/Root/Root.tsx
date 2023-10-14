// import s from './Root.module.scss'
import {Outlet} from "react-router-dom";
import {App} from "antd";

export function Root() {
    return <App>
        <Outlet/>
    </App>;
}
