function divideAndConquerBezier(points, t) {
        if (points.length === 1) {
            return points[0];
        }

        let newPoints = [];
        for (let i = 0; i < points.length - 1; i++) {
            let x = (1 - t) * points[i][0] + t * points[i + 1][0];
            let y = (1 - t) * points[i][1] + t * points[i + 1][1];
            newPoints.push([x, y]);
        }

        return divideAndConquerBezier(newPoints, t);
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    let data = [];
    let iterations = 5; 
    let stepSize = 1 / (Math.pow(2, iterations));
    for (let t = 0; t <= 1; t += iterations) {
        let point = divideAndConquerBezier([[0, 0], [0.5, 1], [1, 0]], t);
        data.push({x: point[0], y: point[1]});
    }

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Bezier Curve',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    beginAtZero: true
                },
                y: {
                    type: 'linear',
                    beginAtZero: true
                }
            }
        }
    });