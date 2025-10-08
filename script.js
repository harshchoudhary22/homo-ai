document.getElementById('symptomForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log('Form submitted!');

    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const severity = document.getElementById('severity').value;

    const remedyOutput = document.getElementById('remedyOutput');
    remedyOutput.textContent = 'Getting suggestions...';

    try {
        console.log('Attempting to fetch remedy suggestions...');
        console.log('Sending request with data:', { age, gender, symptoms, severity });
        const response = await fetch('http://127.0.0.1:5000/api/suggest-remedy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age, gender, symptoms, severity })
        });
        console.log('Response received:', response);

        if (!response.ok) {
            const errorText = await response.text(); // Get more details from response
            throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
        }

        const data = await response.json();
        remedyOutput.textContent = `Suggestion received: \n${data.suggestion}`; // Enhanced success message
    } catch (error) {
        remedyOutput.textContent = `Error: ${error.message}. Please check the console for more details.`; // Simplified for UI, console.error still logs full error
        console.error('Fetch error:', error); // Keep detailed error in console
    } finally {
        // No specific action needed here for now, as remedyOutput is updated in try/catch
    }
});