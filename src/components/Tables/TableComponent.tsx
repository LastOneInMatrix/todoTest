import React, {ChangeEvent, useState} from "react";
import {Button, Modal, Switch, Table, Tag} from "antd";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "../../redux/todos/todosReducer";

type TaskType = {
    completed: boolean
    id: number
    title: string
    userId: number
}

type PropsType = {
    task: Array<TaskType>
}
export const TableComponent: React.FC<PropsType> = ({task}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskStatus, setTaskStatus] = useState(false);
    const [text,textSettings] = useState('');
    function onChange(checked: boolean) {
        setTaskStatus(checked)
        console.log(`switch to ${checked}`);
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChangeTitLe = (e: ChangeEvent<HTMLInputElement>) => {
        textSettings(e.currentTarget.value)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const dispatch = useDispatch()
    const dataSource = task.map(t => ({...t, key: t.id}));

    console.log(taskStatus)
    const columns = [
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: any, b: any) => {
                return a.title > b.title ? 1 : -1
            },

        },
        {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed: boolean) => {
                return <Tag color={completed ? 'green' : 'red'}>
                    {completed.toString().toUpperCase()}
                </Tag>
            }
        },
        {
            title: 'Actions',
            key: 'id',
            render: (data: TaskType & { key: number }) => (
                <>
                    <Button
                        danger
                        onClick={() => {
                            dispatch(deleteTask(data.id))
                        }}
                    > Delete </Button>
                    <Button
                        style={{color: 'green', marginLeft: '12px'}}
                        onClick={() => {
                            showModal()
                        }}
                    > Edit </Button>
                    <Modal mask={false} title="Basic Modal" visible={isModalVisible} onOk={ () => {
                        dispatch(updateTask(data.id, {title: text, completed: taskStatus}))
                        setIsModalVisible(false)
                    }} onCancel={handleCancel}>
                        <b>Title</b><input style={{margin: '5px'}} type='text' onChange={handleChangeTitLe} value={text}/>
                        <b>Status</b><Switch defaultChecked onChange={onChange} />
                        <p>Change tasks settings...</p>
                    </Modal>
                </>
            )
        },
    ];
    return <Table  dataSource={dataSource} columns={columns}/>;
}