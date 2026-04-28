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
    const thickness = parseFloat(document.getElementById('glass-thickness').value) || 0;
    const res = document.getElementById('result');
    let volume = 0;

    const getValue = (id) => parseFloat(document.getElementById(id).value) || 0;

    if (shape === 'rectangular') {
        const l = getValue('rect-l');
        const w = getValue('rect-w');
        const h = getValue('rect-h');
        if(!l || !w || !h) return res.innerText = "Please enter dimensions";
        
        const intL = Math.max(0, l - (2 * thickness));
        const intW = Math.max(0, w - (2 * thickness));
        const intH = Math.max(0, h - thickness);
        volume = intL * intW * intH;

    } else if (shape === 'cylinder') {
        const d = getValue('cyl-d');
        const h = getValue('cyl-h');
        if(!d || !h) return res.innerText = "Please enter dimensions";
        
        const intD = Math.max(0, d - (2 * thickness));
        const intH = Math.max(0, h - thickness);
        volume = Math.PI * Math.pow((intD / 2), 2) * intH;

    } else if (shape === 'corner') {
        const r = getValue('corn-r');
        const h = getValue('corn-h');
        if(!r || !h) return res.innerText = "Please enter dimensions";
        
        const intR = Math.max(0, r - thickness);
        const intH = Math.max(0, h - thickness);
        volume = (Math.PI * Math.pow(intR, 2) * intH) / 4;

    } else if (shape === 'bowl') {
        const d = getValue('bowl-d');
        if(!d) return res.innerText = "Please enter dimensions";
        
        const intD = Math.max(0, d - (2 * thickness));
        const intR = intD / 2;
        volume = (2/3) * Math.PI * Math.pow(intR, 3);
    }

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

function clearAll() {
    // Clear all inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    
    // Reset Result
    document.getElementById('result').innerText = '';
}