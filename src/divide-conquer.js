let bezierPoints = [];

// Fungsi untuk yang 3 titik doang
function divideConquerBezier3Points(control1, control2, control3, banyakiterasi) {
    bezierPoints = [];
    bezierPoints.push(control1); 
    isiTitikCurve(control1, control2, control3, 0, banyakiterasi);
    bezierPoints.push(control3); 
    return bezierPoints;
}

function isiTitikCurve(control1, control2, control3, iterasi, banyakiterasi) {
    if (iterasi < banyakiterasi) {
        let titikTengah1 = cariTitikTengah(control1, control2);
        let titikTengah2 = cariTitikTengah(control2, control3);
        let titikTengah3 = cariTitikTengah(titikTengah1, titikTengah2); 
        iterasi++;
        isiTitikCurve(control1, titikTengah1, titikTengah3, iterasi, banyakiterasi); 
        bezierPoints.push(titikTengah3); 
        isiTitikCurve(titikTengah3, titikTengah2, control3, iterasi, banyakiterasi); 
    }
}

function cariTitikTengah(controlPoint1, controlPoint2) {
    return {
        x: (controlPoint1.x + controlPoint2.x) / 2,
        y: (controlPoint1.y + controlPoint2.y) / 2
    };
}

// Fungsi yang buat cari bezier yang titiknya lebih dari 3 ternyata ini juga gaboleh
/*
function divideConquerBezierMultiple(points, t) {
    if (points.length === 1) {
        return points[0];
    }

    let newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        let x = (1 - t) * points[i].x + t * points[i + 1].x;
        let y = (1 - t) * points[i].y + t * points[i + 1].y;
        newPoints.push({x: x, y: y});
    }

    return divideConquerBezierMultiple(newPoints, t);
}
*/