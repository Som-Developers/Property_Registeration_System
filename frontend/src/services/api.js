import axios from 'axios';


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`/api/users/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
