function updateVisibility() {
    const shape = document.getElementById('shape').value;
    // Hide all containers
    const containers = ['rectangular', 'cylinder', 'corner', 'bowl'];
    containers.forEach(s => {
        document.getElementById('inputs-' + s).style.display = (s === shape) ? 'block' : 'none';
    });
}

function calculate() {
    const shape = document.getElementById('shape').value;
    const unit = document.getElementById('unit').value;
    const res = document.getElementById('result');
    let volume = 0; // Volume in cubic units (inches or cm)

    if (shape === 'rectangular') {
        const l = parseFloat(document.getElementById('rect-l').value);
        const w = parseFloat(document.getElementById('rect-w').value);
        const h = parseFloat(document.getElementById('rect-h').value);
        if(!l || !w || !h) return res.innerText = "Please enter dimensions";
        volume = l * w * h;
    } else if (shape === 'cylinder') {
        const d = parseFloat(document.getElementById('cyl-d').value);
        const h = parseFloat(document.getElementById('cyl-h').value);
        if(!d || !h) return res.innerText = "Please enter dimensions";
        volume = Math.PI * Math.pow((d / 2), 2) * h;
    } else if (shape === 'corner') {
        const r = parseFloat(document.getElementById('corn-r').value);
        const h = parseFloat(document.getElementById('corn-h').value);
        if(!r || !h) return res.innerText = "Please enter dimensions";
        volume = (Math.PI * Math.pow(r, 2) * h) / 4;
    } else if (shape === 'bowl') {
        const d = parseFloat(document.getElementById('bowl-d').value);
        if(!d) return res.innerText = "Please enter dimensions";
        const r = d / 2;
        volume = (2/3) * Math.PI * Math.pow(r, 3);
    }

    // Convert to US Gallons/Liters
    if (unit === 'inches') {
        const gallons = volume / 231;
        const liters = volume * 0.0163871;
        res.innerText = `${gallons.toFixed(1)} US Gallons / ${liters.toFixed(1)} Liters`;
    } else {
        const liters = volume / 1000;
        const gallons = liters * 0.264172;
        res.innerText = `${liters.toFixed(1)} Liters / ${gallons.toFixed(1)} US Gallons`;
    }
}