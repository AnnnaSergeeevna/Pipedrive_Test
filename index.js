document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();
    let formElement = document.getElementById('deal-form');
    let formData = new FormData(formElement);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    let pipedriveData = {
        title: `${data['first-name']} ${data['last-name']} - ${data['job-description']}`,
        person_id: data['phone'],
        org_id: data['address'],
        user_id: "21178890",
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

    fetch('https://api.pipedrive.com/v1/deals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ff39587d7364393b6e262e32c49ed2074d2b14f0'
        },
        body: JSON.stringify(pipedriveData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Deal created successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create deal. ' + error.message);
        });
});
