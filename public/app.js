const baseUrl = 'http://localhost:3000/cars';

function fetchMostPopularMake() {
    axios.get(`${baseUrl}/most-popular-make`)
        .then(response => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerText = `Most Popular Make: ${response.data.make} (Count: ${response.data.count})`;
        })
        .catch(error => {
            console.error('Error fetching most popular make:', error);
            document.getElementById('result').innerText = 'Error fetching most popular make.';
        });
}

function addCar() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const reg_number = document.getElementById('reg_number').value;

    const newCar = {
        make,
        model,
        color,
        reg_number
    };

    axios.post(baseUrl, newCar)
        .then(response => {
            alert('Car added: ' + JSON.stringify(response.data));
            clearInputFields(); // Clear input fields after adding the car
        })
        .catch(error => {
            console.error('Error adding car:', error);
            alert('Error adding car.');
        });
}

function clearInputFields() {
    document.getElementById('make').value = '';
    document.getElementById('model').value = '';
    document.getElementById('color').value = '';
    document.getElementById('reg_number').value = '';
}

function updateCar() {
    const carId = prompt('Enter car ID to update:');
    const updatedCar = {
        make: "Ford",
        model: "Mustang",
        color: "Gray",
        reg_number: "CL 54321"
    };

    axios.put(`${baseUrl}/${carId}`, updatedCar)
        .then(response => {
            alert('Car updated: ' + response.data.message);
        })
        .catch(error => {
            console.error('Error updating car:', error);
            alert('Error updating car.');
        });
}

function deleteCar() {
    const carId = prompt('Enter car ID to delete:');

    axios.delete(`${baseUrl}/${carId}`)
        .then(response => {
            alert('Car deleted: ' + response.data.message);
        })
        .catch(error => {
            console.error('Error deleting car:', error);
            alert('Error deleting car.');
        });
}
