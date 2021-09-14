import React, {useState} from "react";
import {Button, Table, Tag, Modal} from "antd";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "../../redux/todos/todosReducer";
import {EditOutlined} from "@ant-design/icons";

type TaskType = {
    completed: boolean
    id: number
    title: string
    userId: number
}

type PropsType = {
    task: Array<TaskType>
}
export const TableComponent: React.FC<PropsType> = React.memo(({task}) => {
    const [text, setText] = useState('');
    const [activeTaskID, setActiveTaskId] = useState(0)
    const dispatch = useDispatch()
    const dataSource = task.map(t => ({...t, key: t.id}))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (id: number) =>  () =>{
        setActiveTaskId(id)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(updateTask(activeTaskID, {title: text}))
        setText('')
    }
    const handleCancel = () => {
        setText('')
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Task',
            key: 'title',
            sorter: (a: any, b: any) => {
                return a.title > b.title ? 1 : -1
            },
            render: (data: TaskType & { key: number }) => {

                    return  (
                            <>{data.title}
                                <Modal destroyOnClose={true} mask={false} title="Change Task Title" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    <p>Task id: {activeTaskID}</p>
                                    <p>{(task[task.findIndex(t => t.id === activeTaskID)])?.title}</p>
                                    <input placeholder={'type task text'} onChange={(e) => setText(e.currentTarget.value)} value={text}></input>
                                </Modal>
                                <Button type="primary" onClick={showModal(data.id)} style={{padding: '5px', margin: '5px'}}>
                                    <EditOutlined />
                                </Button>
                            </>
                    )
            }
        },
        {
            title: 'Status',
            key: 'completed',
            render: (data: TaskType & { key: number }) => {
                return <Tag style={{cursor: "pointer"}} color={data.completed ? 'green' : 'red'} onClick={() => dispatch(updateTask(data.id, {completed: !data.completed}))}>
                    {data.completed.toString().toUpperCase()}
                </Tag>
            }
        },
        {
            title: 'Actions',
            key: 'id',
            render: (data: TaskType & { key: number }) => {
               let id = data.id
               return  (
                    <>
                        <Button
                            danger
                            onClick={() => {
                                dispatch(deleteTask(data.id))
                            }}
                        > Delete </Button>
                    </>
                )
            }
        },
    ];
    return <Table  dataSource={dataSource} columns={columns}/>;
})