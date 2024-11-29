const previewImg = document.querySelector('.img-upload__preview img');


// Scale control
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');


function percentToInt(percent) {
  return parseInt(percent.substring(0, percent.length - 1), 10);
}

function intToPercent(int) {
  return `${int}%`;
}

function changePictureScale() {
  const scale = percentToInt(scaleControlValue.value) / 100;
  previewImg.style.transform = `scale(${scale})`;
}

scaleControlSmaller.addEventListener('click', () => {
  scaleControlValue.value = intToPercent(Math.max(
    percentToInt(scaleControlValue.value) - 25,
    25
  ));
  changePictureScale();
});


scaleControlBigger.addEventListener('click', () => {
  scaleControlValue.value = intToPercent(Math.min(
    percentToInt(scaleControlValue.value) + 25,
    100
  ));
  changePictureScale();
});


// Effects

const effects = {
  none: { filter: '', range: [0, 100], step: 1, unit: '' },
  chrome: { filter: 'grayscale', range: [0, 1], step: 0.1, unit: '' },
  sepia: { filter: 'sepia', range: [0, 1], step: 0.1, unit: '' },
  marvin: { filter: 'invert', range: [0, 100], step: 1, unit: '%' },
  phobos: { filter: 'blur', range: [0, 3], step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', range: [1, 3], step: 0.1, unit: '' }
};
const effectButtons = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');


noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  connect: 'lower'
});

function updateEffect() {
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  const { filter, range, step, unit } = effects[currentEffect];

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: range[0], max: range[1] },
    step: step,
    start: range[1]
  });

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewImg.style.filter = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      effectLevelValue.value = Math.round(value);
      previewImg.style.filter = `${filter}(${value}${unit})`;
    });
  }
}

effectButtons.forEach((button) => {
  button.addEventListener('change', updateEffect);
});

updateEffect();
