let bezierPoints = [];

function createDivideConquerBezier(control1, control2, control3, banyakiterasi) {
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

let control1 = {x: 0, y: 0};
let control2 = {x: 50, y: 100};
let control3 = {x: 100, y: 0};
let banyakiterasi = 5;
let points = createDivideConquerBezier(control1, control2, control3, banyakiterasi);
console.log(points);