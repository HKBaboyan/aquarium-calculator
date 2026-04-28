function calculate() {
        const l = parseFloat(document.getElementById('length').value);
        const w = parseFloat(document.getElementById('width').value);
        const h = parseFloat(document.getElementById('height').value);
        const unit = document.getElementById('unit').value;
        const res = document.getElementById('result');

        if (!l || !w || !h) {
            res.innerText = "Please enter dimensions";
            return;
        }

        if (unit === 'inches') {
            const gallons = (l * w * h) / 231;
            const liters = (l * w * h) * 0.0163871;
            res.innerText = `${gallons.toFixed(1)} US Gallons / ${liters.toFixed(1)} Liters`;
        } else {
            const liters = (l * w * h) / 1000;
            const gallons = liters * 0.264172;
            res.innerText = `${liters.toFixed(1)} Liters / ${gallons.toFixed(1)} US Gallons`;
        }
    }