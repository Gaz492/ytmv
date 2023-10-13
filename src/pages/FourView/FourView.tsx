import './FourView.scss'
import {Row, Col} from "antd";
import {YTEmbed} from "../../components/YTEmbed/YTEmbed.tsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export function FourView() {
    type FourViewStreams = {
        stream1: string
        stream2: string
        stream3: string
        stream4: string
    }

    type FourViewPresets = {
        presets: FourViewPreset[]
    }

    type FourViewPreset = {
        name: string
        views: FourViewStreams
    }

    const [params, setSearchParams] = useSearchParams();
    const [presets, setPresets] = useState<FourViewPresets>()
    const [streams, setStreams] = useState<FourViewStreams>({
        stream1: "",
        stream2: "",
        stream3: "",
        stream4: ""
    })
    useEffect(() => {
        const savedStreams = localStorage.getItem('savedStreams')
        const savedPresets = localStorage.getItem('fourViewPresets')
        const shareParam = params.get('s');

        if (savedStreams !== null) {
            const parsedStreams = JSON.parse(savedStreams)
            setStreams(parsedStreams)
        } else if (shareParam) {
            setStreams(JSON.parse(atob(shareParam.toString())))
        }
        //
        if (savedPresets !== null && savedPresets !== '') {
            setPresets(JSON.parse(savedPresets))
        }
    }, [])
    return <>
        <Row wrap={false} className={"ytmv-row"}>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed ytUrl='https://www.youtube.com/watch?v=5sCX7E0sRH8'/>
            </Col>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed ytUrl='https://www.youtube.com/watch?v=5sCX7E0sRH8'/>
            </Col>
        </Row>
        <Row wrap={false} className={"ytmv-row"}>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed ytUrl='https://www.youtube.com/watch?v=5sCX7E0sRH8'/>
            </Col>
            <Col flex="1 1 auto" className={"ytmv-col"}>
                <YTEmbed ytUrl='https://www.youtube.com/watch?v=5sCX7E0sRH8'/>
            </Col>
        </Row>
    </>;
}
