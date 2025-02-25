export const AddNewUser = async (formData) => {
    const url = 'http://localhost:3001/users';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to add new user: ${errorMessage}`);
        }
        const data = await response.json();
        // alert(`User added successfully: ${JSON.stringify(data)}`);
        // return data; // Return the added user data
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
};
