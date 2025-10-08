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

        // ✅ works locally & on Railway
        const response = await fetch('/api/suggest-remedy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age, gender, symptoms, severity })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
        }

        const data = await response.json();
        remedyOutput.textContent = `Suggestion received:\n${data.suggestion}`;
    } catch (error) {
        remedyOutput.textContent = `Error: ${error.message}. Check console for details.`;
        console.error('Fetch error:', error);
    }
});
