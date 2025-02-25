export const DeletePCB = async (pcbId, userId) => {
    const url = `http://localhost:3001/pcbs/${pcbId}?userId=${userId}`; // Include userId if needed

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete PCB: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting PCB:', error.message);
        // setError(error.message);
    }
};