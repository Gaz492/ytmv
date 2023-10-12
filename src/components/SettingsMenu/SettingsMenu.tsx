import s from './SettingsMenu.module.scss'
import {Button, Form, Dropdown, Input, MenuProps, Modal, Popconfirm, Space, Divider} from "antd";
import {DeleteOutlined, DownOutlined, MenuOutlined, ShareAltOutlined} from "@ant-design/icons";
import {useState} from "react";

export function SettingsMenu() {

    const menuItems: MenuProps['items'] = [
        {
            label: 'Share Views',
            key: '1',
            icon: <ShareAltOutlined/>,
        },
        {
            label: (
                <Popconfirm
                    title="Clear Views"
                    description="Are you sure you want to clear all views?"
                    okText="Yes"
                    cancelText="No"
                >
                    Clear Views
                </Popconfirm>
            ),
            key: '2',
            icon: <DeleteOutlined/>,
            danger: true,
        },
    ];
    const presetItems: MenuProps['items'] = [];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    return <>
        <Dropdown menu={{items: menuItems}}>
            <Button type={"primary"} size="small" className={s.settingsMenu}
                    onClick={showModal}><MenuOutlined/></Button>
        </Dropdown>
        <Modal title="View Settings" open={isModalOpen} footer={null}>
            <Form.Item>
                <Dropdown menu={{items: presetItems}}>
                    <Button>
                        <Space>
                            Load Presets <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
            </Form.Item>

            <Form.Item
                label={"Stream 1"}
            >
                <Space.Compact style={{width: '100%'}}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8" allowClear={true}/>
                </Space.Compact>
            </Form.Item>
            <Form.Item
                label={"Stream 2"}
            >
                <Space.Compact style={{width: '100%'}}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8" allowClear={true}/>
                </Space.Compact>
            </Form.Item>
            <Form.Item
                label={"Stream 3"}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8" allowClear={true} />
                </Space.Compact>
            </Form.Item>
            <Form.Item
                label={"Stream 4"}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8" allowClear={true} />
                </Space.Compact>
            </Form.Item>
            <Divider>Save as preset</Divider>
            <Form.Item>
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder="https://www.youtube.com/watch?v=9F0czln6iT8" allowClear={true} />
                </Space.Compact>
            </Form.Item>
        </Modal>
    </>;
}
