import './YTEmbed.scss'
import {Empty} from "antd";

function formatURL(vURL: string) {
    return `https://www.youtube-nocookie.com/embed/${new URL(vURL).searchParams.get(
        'v'
    )}?autoplay=1&mute=1`
}

function isValidURL(vURL: string) {
    try {
        new URL(vURL)
    } catch (err) {
        console.error(`${vURL} errored: ${err}`)
        return false
    }
    return true
}


export function YTEmbed({ytUrl}) {
    console.log(ytUrl)
    return <>
        <div className={"video-container"}>
            <iframe src={formatURL(ytUrl)} title="YouTube video player" allowFullScreen>
            </iframe>
        </div>
        {/*<Empty*/}
        {/*    image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
        {/*    description={*/}
        {/*        <span>No video available, you can set a video by pressing the hamburger menu in the top left</span>*/}
        {/*    }*/}
        {/*/>*/}
    </>;
}
