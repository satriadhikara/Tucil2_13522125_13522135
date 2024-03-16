import { Chart, ScatterController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

Chart.register(ScatterController, LineElement, PointElement, LinearScale, Title);

function isFlat(points, epsilon = 0.01) {
    for (let i = 1; i < points.length; i++) {
        if (Math.abs(points[i][1] - points[i - 1][1]) >= epsilon) {
            return false;
        }
    }
    return true;
}

function drawBezierCurve(points, iterations, data) {
    if (isFlat(points) || iterations === 0) {
        data.push({ x: points[0][0], y: points[0][1] });
        data.push({ x: points[points.length - 1][0], y: points[points.length - 1][1] });
    } else {
        const midpoints = [points[0]];
        for (let i = 0; i < points.length - 1; i++) {
            midpoints.push([(points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2]);
        }
        midpoints.push(points[points.length - 1]);

        drawBezierCurve(midpoints.slice(0, midpoints.length / 2 + 1), iterations - 1, data);
        drawBezierCurve(midpoints.slice(midpoints.length / 2), iterations - 1, data);
    }
}

const points = [[0, 0], [1, 1], [2, 0], [3, 1], [4, 4]];
const data = [];
drawBezierCurve(points, 200, data);

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Bezier Curve',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom' }
        }
    }
});