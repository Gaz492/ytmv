// import s from './Root.module.scss'
import {Outlet} from "react-router-dom";
import {App} from "antd";
import {SettingsMenu} from "../../components/SettingsMenu/SettingsMenu.tsx";

export function Root() {
    return <App>
        <SettingsMenu/>
        <Outlet/>
    </App>;
}
