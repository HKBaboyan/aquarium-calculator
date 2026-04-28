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
    const thickness = parseFloat(document.getElementById('thickness').value) || 0;
    const res = document.getElementById('result');
    let volume = 0;

    if (shape === 'rectangular') {
        const l = parseFloat(document.getElementById('rect-l').value) || 0;
        const w = parseFloat(document.getElementById('rect-w').value) || 0;
        const h = parseFloat(document.getElementById('rect-h').value) || 0;
        if(!l || !w || !h) return res.innerText = "Please enter dimensions";
        
        // Subtract thickness: 2 sides for L and W, 1 side for H (bottom)
        const intL = Math.max(0, l - (2 * thickness));
        const intW = Math.max(0, w - (2 * thickness));
        const intH = Math.max(0, h - thickness);
        volume = intL * intW * intH;

    } else if (shape === 'cylinder') {
        const d = parseFloat(document.getElementById('cyl-d').value) || 0;
        const h = parseFloat(document.getElementById('cyl-h').value) || 0;
        if(!d || !h) return res.innerText = "Please enter dimensions";
        
        const intD = Math.max(0, d - (2 * thickness));
        const intH = Math.max(0, h - thickness);
        volume = Math.PI * Math.pow((intD / 2), 2) * intH;

    } else if (shape === 'corner') {
        const r = parseFloat(document.getElementById('corn-r').value) || 0;
        const h = parseFloat(document.getElementById('corn-h').value) || 0;
        if(!r || !h) return res.innerText = "Please enter dimensions";
        
        const intR = Math.max(0, r - thickness);
        const intH = Math.max(0, h - thickness);
        volume = (Math.PI * Math.pow(intR, 2) * intH) / 4;

    } else if (shape === 'bowl') {
        const d = parseFloat(document.getElementById('bowl-d').value) || 0;
        if(!d) return res.innerText = "Please enter dimensions";
        
        const intD = Math.max(0, d - (2 * thickness));
        const intR = intD / 2;
        volume = (2/3) * Math.PI * Math.pow(intR, 3);
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