import './FourView.scss'
import {YTEmbed} from "../../components/YTEmbed/YTEmbed.tsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Settings, SettingsMenu} from "../../components/SettingsMenu/SettingsMenu.tsx";

export type FourViewStreams = {
    stream1?: string
    stream2?: string
    stream3?: string
    stream4?: string
}

const transformer = {
    to(streams: FourViewStreams): string {
        let output = "";
        for (const stream of Object.values(streams)) {
            const id = stream.split("v=")[1];
            if (!id) {
                continue;
            }
            output += id + ";"
        }
        return encodeURI(btoa(output));
    },
    from(input: string): FourViewStreams {
        const streams = {} as any;
        const parts = atob(decodeURI(input)).split(";");

        for (let i = 0; i < parts.length; i ++) {
            if (parts[i] === "") {
                continue;
            }

            streams["stream" + (i + 1)] = `https://youtube.com/watch?v=${parts[i]}`
        }

        return streams as FourViewStreams;
    }
}

export function FourView() {
    const [params, setSearchParams] = useSearchParams();

    // const [presets, setPresets] = useState<FourViewPresets>()
    const [settings, setSettings] = useState<Settings>({
        presets: {},
        streams: {}
    })

    const streams = settings.streams;

    useEffect(() => {
        const shareParam = params.get('s');
        const localData = localStorage.getItem("settings");

        let settings: Settings = {} as any;
        if (localData) {
            settings = JSON.parse(localData ?? "{}");
        }

        if (shareParam) {
            settings.streams = transformer.from(shareParam ?? "");
        }

        updateStreams(settings);
    }, [])

    function updateStreams(settings: Settings, commit = true){
        setSettings(settings)
        if (commit) {
            const serialisedSettings = JSON.stringify(settings);
            localStorage.setItem("settings", serialisedSettings)
        }
        setSearchParams({
            s: transformer.to(settings.streams)
        })
    }

    return <>
        <SettingsMenu settings={settings} onSettingsChanged={v => updateStreams(v)}/>

        <div className="stream-container">
            <YTEmbed ytUrl={streams.stream1}/>
            <YTEmbed ytUrl={streams.stream2}/>
            <YTEmbed ytUrl={streams.stream3}/>
            <YTEmbed ytUrl={streams.stream4}/>
        </div>

    </>;
}
