document.getElementById('submitBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    try {
        const formElement = document.getElementById('deal-form');
        const formData = new FormData(formElement);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const pipedriveData = {
            title: `${data['first-name']} ${data['last-name']} - ${data['job-description']}`,
            person_id: parseInt(data['21']),
            org_id: parseInt(data['13']),
            user_id: parseInt(data['21178890']),
            add_time: new Date().toISOString(),
            custom_fields: {
                address: data['address'],
                city: data['city'],
                state: data['state'],
                zip_code: data['zip-code'],
                area: data['area'],
                start_date: data['start-date'],
                start_time: data['start-time'],
                end_time: data['end-time'],
                test_select: data['test-select']
            }
        };

        const response = await fetch('https://api.pipedrive.com/v1/deals?api_token=9c85ca22570c2896150166931e65dbf20e889d8f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer 9c85ca22570c2896150166931e65dbf20e889d8f'
            },
            body: JSON.stringify(pipedriveData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
        alert('Deal created successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create deal. ' + error.message);
    }
});
