import s from './SettingsMenu.module.scss'
import {Button, Form, Dropdown, Input, MenuProps, Modal, Popconfirm, Space, Divider} from "antd";
import {DeleteOutlined, DownOutlined, MenuOutlined, SaveOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {FourViewStreams} from "../../pages/FourView/FourView.tsx";

export type Settings = {
    presets: Record<string, FourViewStreams>,
    streams: FourViewStreams
}

type Props = {
    settings: Settings
    onSettingsChanged(settings: Settings): void;
}

export function SettingsMenu({settings, onSettingsChanged}: Props) {
    const [internalSettings, setInternalSettings] = useState<Settings>(settings)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [presetName, setPresetName] = useState("");

    useEffect(() => {
        if (settings !== internalSettings) {
            setInternalSettings(settings)
        }
    }, [settings]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    function save(commit = true) {
        setIsModalOpen(false);
        if (!commit) {
            return
        }
        onSettingsChanged(internalSettings)
    }

    function savePreset() {
        if (presetName === "") {
            return
        }

        const newSettings = ({
            ...internalSettings, presets: {
                ...internalSettings.presets, [presetName]: {
                    stream1: internalSettings.streams.stream1,
                    stream2: internalSettings.streams.stream2,
                    stream3: internalSettings.streams.stream3,
                    stream4: internalSettings.streams.stream4
                }
            }
        })

        setInternalSettings(newSettings)
        setPresetName("")
        onSettingsChanged(newSettings)
    }

    function loadPreset(key: string) {
        const preset = internalSettings.presets[key];
        if (!preset) {
            return;
        }

        const newSettings =  ({
            ...internalSettings,
            streams: preset
        })

        setInternalSettings(newSettings)
        onSettingsChanged(newSettings)
    }

    function deletePreset(key: string) {
        if (!internalSettings.presets[key]) {
            return;
        }

        const presets = internalSettings.presets;
        delete presets[key]

        const newSettings =  ({
            ...internalSettings,
            // It's late, no brain work, this should be fine
            presets: presets
        })

        setInternalSettings(newSettings)
        onSettingsChanged(newSettings)
    }

    function clearStreams() {
        const newSettings =  ({
            ...internalSettings,
            streams: {}
        })

        setInternalSettings(newSettings)
        onSettingsChanged(newSettings)
    }

    const menuItems: MenuProps['items'] = [
        {
            label: (
                <Popconfirm
                    title="Clear Views"
                    description="Are you sure you want to clear all views?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => clearStreams()}
                >
                    <DeleteOutlined/> Clear Views
                </Popconfirm>
            ),
            key: '1',
            danger: true,
        },
    ];

    const hasSavableData = Object.values(internalSettings.streams).some(v => v !== "");
    const presetItems: MenuProps['items'] = Object.keys(internalSettings.presets).map((e, index) => ({
        key: "" + index,
        label: <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{e}</span>
            <Button size="small" icon={<DeleteOutlined/>} onClick={(a) => {
                a.stopPropagation();
                deletePreset(e)
            }} />
        </div>,
        onClick: () => loadPreset(e)
    }))

    return <>
        <Dropdown menu={{items: menuItems}}>
            <Button type={"primary"} className={s.settingsMenu}
                    onClick={showModal} icon={<MenuOutlined/>}>
            </Button>
        </Dropdown>
        <Modal title="View Settings" open={isModalOpen} onCancel={() => save(false)} onOk={() => save()}>
            <Form.Item>
                <Dropdown menu={{items: presetItems}}>
                    <Button>
                        <Space>
                            Load Presets <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
            </Form.Item>

            {[1, 2, 3, 4].map(index => <Form.Item
                label={`Stream ${index}`}
                key={`stream-${index}`}
            >
                <Space.Compact style={{width: '100%'}}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8"
                           value={(internalSettings.streams as any)[`stream${index}`]}
                           onChange={v => setInternalSettings(
                               e => ({...e, streams: {...e.streams, [`stream${index}`]: v.target.value}}))}
                           allowClear={true}/>
                </Space.Compact>
            </Form.Item>)}

            <Divider>Save as preset</Divider>
            <Form.Item>
                <Space.Compact style={{width: '100%'}}>
                    <Input disabled={!hasSavableData} placeholder="Preset name" allowClear={true} value={presetName}
                           onChange={v => setPresetName(v.target.value)}/>
                    <Button disabled={!hasSavableData || presetName === ''} type="primary" icon={<SaveOutlined/>}
                            onClick={() => savePreset()}>Save</Button>
                </Space.Compact>
            </Form.Item>
        </Modal>
    </>;
}
