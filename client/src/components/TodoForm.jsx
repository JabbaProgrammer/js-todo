import { Button, Row, Col, Modal, Input, List, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, addTask, clearStorage } from '../storage/features/taskSlice'
import {logout} from '../storage/features/userSlice'
import TaskForm from "./TaskForm";

const TodoForm = () => {
    const {id} = useSelector(state => state.user)
    const tasks = useSelector(state => state.tasks.elements)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    /* eslint-disable */
    useEffect(() => {
        dispatch(getTasks({id}))
    }, [])
    /* eslint-enable */

    const [completed, setCompleted] = useState([])
    const [uncompleted, setUncompleted] = useState([])


    useEffect(() => {
        setCompleted(tasks.filter(task => task.complete === true));
        setUncompleted(tasks.filter(task => task.complete === false));
    }, [tasks]);

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    }
    const closeModal = () => {
        setIsModalVisible(false)
    }

    const ok = () => {
        setConfirmLoading(true)
        dispatch(addTask({name, description, user_id: id}))
        setTimeout(() => {
            setIsModalVisible(false)
            setConfirmLoading(false)
        }, 500)
    }

    const showNotification = (message) => {
        notification.info({
            message,
            placement: 'bottom'
        })
    }

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Button type="primary" onClick={showModal}>
                        Add new task
                    </Button>
                    <Modal
                        title="New task"
                        visible={isModalVisible}
                        onOk={ok}
                        onCancel={closeModal}
                        cancelText="Back"
                        okText="Add"
                        confirmLoading={confirmLoading}
                    >
                        <Input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder='Name'
                        />
                        <Input
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            type="text"
                            placeholder='Description'
                        />
                    </Modal>
                </Col>
                <Col span={12}>
                    <Button type='primary' onClick={()=>{
                        dispatch(logout())
                        dispatch(clearStorage())
                    }}>logout</Button>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <List
                        header={<h3>Uncompleted tasks</h3>}
                        bordered
                        dataSource={uncompleted}
                        renderItem={(task) => (
                            <List.Item>
                            <TaskForm task={task}/>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <List
                        header={<h3>Completed tasks</h3>}
                        bordered
                        dataSource={completed}
                        renderItem={(task) => (
                            <List.Item>
                            <TaskForm task={task}/>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default TodoForm;