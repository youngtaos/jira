import React from "react";

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

interface user {
    name: string;
    id: number;
    email: string;
    title: string;
    organization: string;
    token: string;
}
export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: user }) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
}

export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject(await res.json())
        }
    });
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json());
        } else {
            return Promise.reject(await res.json())
        }
    });
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);