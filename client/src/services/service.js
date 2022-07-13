import { notification } from 'antd'

export const myNotification = (message) => {
    notification.info({
        message: message,
        placement: 'bottom'
    })
}