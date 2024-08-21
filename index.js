const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let cars = [
    { id: 1, make: "Ford", model: "Fiesta", color: "Orange", reg_number: "CL 77790" },
    { id: 2, make: "Nissan", model: "Micra", color: "Blue", reg_number: "CA 12345" },
    { id: 3, make: "Toyota", model: "Corolla", color: "Red", reg_number: "CY 54321" },
    { id: 4, make: "Ford", model: "Focus", color: "White", reg_number: "CL 98765" },
    { id: 5, make: "Toyota", model: "Yaris", color: "Blue", reg_number: "CK 87654" }
];

// GET all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET the most popular car make
app.get('/cars/most-popular-make', (req, res) => {
    const makeCount = cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
    }, {});

    const mostPopularMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);

    res.json({ make: mostPopularMake, count: makeCount[mostPopularMake] });
});

// POST a new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    newCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// PUT (update) an existing car
app.put('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const updatedCar = req.body;
    let carFound = false;

    cars = cars.map(car => {
        if (car.id === carId) {
            carFound = true;
            return { ...car, ...updatedCar };
        }
        return car;
    });

    if (carFound) {
        res.json({ message: 'Car updated successfully' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// DELETE a car
app.delete('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const initialLength = cars.length;
    cars = cars.filter(car => car.id !== carId);

    if (cars.length < initialLength) {
        res.json({ message: 'Car deleted successfully' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// Serve the frontend at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
