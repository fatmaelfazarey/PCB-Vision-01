import { useState } from "react";
// https://raw.githubusercontent.com/fatmaelfazarey/Fake-Data/refs/heads/main/db.json
export const LoginUser = async (email, password) => {
    // const url = `http://localhost:3001/users?email=${email}&password=${password}`;
    const url = `http://localhost:3001/users?email=${email}&password=${password}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        if (users.length > 0) {
            alert("Login successful! 🎉");
            return users[0];
        } else {
            alert("Invalid email or password. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};
