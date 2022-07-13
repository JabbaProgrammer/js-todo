import api from "../API"

export const getAllTasks = async (user_id) => {
    try {
        const response = await api.get(
            'tasks/',
            {params: {user_id: user_id}}
        )
        return response.data;
    }
    catch (error) {
        throw error;
    }   

}

export const completeTask = async (task_id) => {
    try {
        const response = await api.patch(`tasks/${task_id}`, {params: {id: task_id}});
        return response.data;
    }
    catch (error) {
        throw error;
    }   
}

export const createTask = async (task) => {
    try {
        const response = await api.post('tasks/create', task);
        return response.data;
    }
    catch (error) {
        throw error;
    }   
}