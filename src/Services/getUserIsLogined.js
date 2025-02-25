export const getUserIsLogined = async (userId, setUser) => {
    const url = `http://localhost:3001/users/${userId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        // console.log(users)
        if (users) {
            setUser(users);
            localStorage.setItem('userId', users.id);
            return users;
        } else {
            alert("Invalid user. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};