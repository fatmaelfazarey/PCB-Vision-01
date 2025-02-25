export const getPCBS = async (userId, setHistory, setUserHistoryLoading, setUserHistoryError) => {
    const url = `http://localhost:3001/pcbs?userId=${userId}`;
    setUserHistoryLoading(true);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch PCB history: ${errorMessage}`);
        }
        const data = await response.json();
        setHistory(data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching PCB history:', error.message);
        setUserHistoryError(error.message);
    } finally {
        setUserHistoryLoading(false);
    }
};