class ProgressBlock {
    constructor(container, options = {}) {
        this.container = container;
        this.color = options.color || '#0852ad';
        this.size = parseInt(options.size, 10) || 100;
        this.createProgressBlock();
        this.value = 0;
        this.isAnimated = false;
        this.isHidden = false;
        this.animateInterval = null;
    }

    createProgressBlock() {
        this.container.innerHTML = `
            <h3 class="progress-title">Progress</h3>
            <div class="progress-frame">
                <div class="progress-block" style="width: ${this.size}px; height: ${this.size}px;">
                    <svg class="progress-circle" width="${this.size}" height="${this.size}">
                        <circle cx="${this.size / 2}" cy="${this.size / 2}" r="${this.size / 2 - 5}" stroke="#ddd" stroke-width="10" fill="none"></circle>
                        <circle class="progress" cx="${this.size / 2}" cy="${this.size / 2}" r="${this.size / 2 - 5}" stroke="${this.color}" stroke-width="10" fill="none"></circle>
                    </svg>
                </div>
                <div class="progress-controls">
                    <div class="progress-control">
                        <label for="value">Value</label>
                        <input type="number" class="progress-value" name="value" min="0" max="100" value="0">
                    </div>
                    <div class="progress-control">
                        <label for="animate">Animate</label>
                        <input type="checkbox" class="progress-animate" name="animate">
                    </div>
                    <div class="progress-control">
                        <label for="hide">Hide</label>
                        <input type="checkbox" class="progress-hide" name="hide">
                    </div>
                </div>
            </div>
            
        `;

        this.progressBlock = this.container.querySelector('.progress-block');
        this.progressCircle = this.container.querySelector('.progress');
        this.valueInput = this.container.querySelector('.progress-value');
        this.animateCheckbox = this.container.querySelector('.progress-animate');
        this.hideCheckbox = this.container.querySelector('.progress-hide');

        this.addEventListeners();
    }

    addEventListeners() {
        this.valueInput.addEventListener('input', () => {
            let value = parseInt(this.valueInput.value, 10);

            if (isNaN(value) || value < 0 || value === '' || value === null) {
                value = 0;
            } else if (value > 100) {
                value = 100;
            }
            this.valueInput.value = value;
            this.setValue(value);
        });

        this.valueInput.addEventListener('blur', () => {
            let value = parseInt(this.valueInput.value, 10);
            if (isNaN(value) || value < 0 || value === '' || value === null) {
                this.valueInput.value = '0';
                this.setValue(0);
            }
        });

        this.animateCheckbox.addEventListener('change', () => {
            this.setAnimated(this.animateCheckbox.checked);
        });

        this.hideCheckbox.addEventListener('change', () => {
            this.setHidden(this.hideCheckbox.checked);
        });

        this.setValue(0);
    }

    setValue(value) {
        this.value = value;
        const radius = this.size / 2 - 5;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (circumference * value / 100);
        this.progressCircle.style.strokeDasharray = circumference;
        this.progressCircle.style.strokeDashoffset = offset;
    }

    setAnimated(isAnimated) {
        this.isAnimated = isAnimated;
        if (isAnimated) {
            this.progressBlock.classList.add('animate');
        } else {
            this.progressBlock.classList.remove('animate');
        }
    }

    setHidden(isHidden) {
        this.isHidden = isHidden;
        this.container.querySelector('.progress-block').style.visibility = isHidden ? 'hidden' : 'visible';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.progress-block-container').forEach(container => {
        const options = {
            color: container.getAttribute('data-color'),
            size: container.getAttribute('data-size')
        };
        new ProgressBlock(container, options);
    });
});
