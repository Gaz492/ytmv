import './YTEmbed.scss'
import {Empty} from "antd";


export function YTEmbed() {
    return <>
        <div className={"video-container"}>
            <iframe src={'https://www.youtube-nocookie.com/embed/9F0czln6iT8'} title="YouTube video player" allowFullScreen>
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
