import { useDispatch } from "react-redux";
import { completeTask } from "../storage/features/taskSlice";
import { Button, Modal } from "antd";
import { useState } from "react";

const TaskForm = (props) => {
    const dispatch = useDispatch()
    
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
        dispatch(completeTask(props.task.id))
        setTimeout(() => {
            setIsModalVisible(false)
            setConfirmLoading(false)
        }, 500)
    }

    return (
        <div>
            <p>{props.task.name}</p>
            <Button type="primary" onClick={showModal}>
                Open task
            </Button>
            <Modal
                title={"Task: " + props.task.name}
                visible={isModalVisible}
                onOk={ok}
                onCancel={closeModal}
                cancelText="Back"
                okText="Complete"
                confirmLoading={confirmLoading}
            >
                <p>Description: {props.task.description}</p>
            </Modal>
        </div>
    )
}

export default TaskForm;