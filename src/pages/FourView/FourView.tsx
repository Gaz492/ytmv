import './FourView.scss'
import {Row, Col} from "antd";
import {YTEmbed} from "../../components/YTEmbed/YTEmbed.tsx";


export function FourView() {
    return <>
        <Row wrap={false} className={"ytmv-row"}>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed/>
            </Col>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed/>
            </Col>
        </Row>
        <Row wrap={false} className={"ytmv-row"}>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed/>
            </Col>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed/>
            </Col>
        </Row>
    </>;
}
