/* eslint-disable no-useless-catch */
import axios from 'axios';


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`/api/users/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`/api/users/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`/api/users/reset-password/${token}`, { password });
        return response.data;
    } catch (error) {
        throw error;
    }
};