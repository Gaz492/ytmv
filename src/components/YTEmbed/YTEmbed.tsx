import './YTEmbed.scss'
import {Empty} from "antd";
import {clsx} from "clsx";

function formatURL(vURL: string) {
    return `https://www.youtube-nocookie.com/embed/${new URL(vURL).searchParams.get(
        'v'
    )}?autoplay=1&mute=1`
}

function isValidURL(vURL: string) {
    try {
        new URL(vURL);
        return true
    } catch (err) {
        console.error(`${vURL} errored: ${err}`)
        return false
    }
}

export function YTEmbed({ytUrl}: {ytUrl?: string}) {
    const url = ytUrl && isValidURL(ytUrl) ? ytUrl : null;

    return <div className={clsx("video-container", {'empty': !url})}>
        {url && <>
            <iframe src={formatURL(url)} title="YouTube video player" allowFullScreen>
            </iframe>
        </>}

        {!url && <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
                <span>No video available, you can set a video by pressing the hamburger menu in the top left</span>
            }
        />}
    </div>
}
