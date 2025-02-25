// const fakeResponse = [
//     {},
//     { "Short": [200, 100, 210, 110], "Open Cricut": [100, 100, 210, 210], "Spur": [150, 220, 170, 240] },
//     { "Short": [100, 100, 210, 210], "Spur": [150, 220, 170, 240] },
//     { "Spur": [150, 220, 170, 240] },
//     { "Short": [100, 100, 210, 210], "Spur": [130, 210, 170, 240] }

// ]
// function getRandomNumber() {
//     return Math.floor(Math.random() * 5);
// }

export const AddNewPCB = async (formData, userId, setLoading, setError) => {
    const url = `http://localhost:3001/pcbs?userId=${userId}`;
    // const url = `https://abdrabo01-defects-api.hf.space/predict`;
    setLoading(true);

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
            throw new Error(`Failed to add PCB: ${errorMessage}`);
        }
        let data = await response.json();
        //#region fake response remove 
        // data.defects = fakeResponse[getRandomNumber()]
        // console.log(data.defects);
        // alert("ghhhhhhhhhhhhh" + data)
        // data = fakeResponse[getRandomNumber()];

        //#endregion
        return data;
    } catch (error) {
        console.error('Error adding PCB:', error.message);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
