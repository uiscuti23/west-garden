'use strict';
const getEl = idArr => idArr.map((idStr, index) => document.getElementById(idArr[index]));

const [s1, s2, s3, s4] = getEl(['s1', 's2', 's3', 's4']);
const [r1, r2, r3, r4, r5, r6, r7] = getEl(['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7']);
const [f1, f2, f3] = getEl(['f1', 'f2', 'f3']);
const [g1, g2, g3] = getEl(['g1', 'g2', 'g3']);
const [p1, p2, p3, p4] = getEl(['p1', 'p2', 'p3', 'p4']);

const enjoy = {
	class: '.enjoy',

	arrows: '.enjoy .slider__arrows',
	prevArrow: '.enjoy .arrows__prev',
	nextArrow: '.enjoy .arrows__next',
	prevTarget: null,
	nextTarget: null,

	checkboxes: [s1, s2, s3, s4],
	curCheckbox: null,
	curCheckboxIndex: null,
	prevCheckbox: null,
	nextCheckbox: null,

	labelsArea: '.enjoy .nav-slider__labels',
	labelsArray: Array.from(document.querySelectorAll('.enjoy .nav-slider__item')),
	firstTouch: null,
	x1: null,
	y1: null,
	x2: null,
	y2: null,
	xDiff: null,
	yDiff: null,
};

const green = {
	class: '.green',

	arrows: '.green .slider__arrows',
	prevArrow: '.green .arrows__prev',
	nextArrow: '.green .arrows__next',
	prevTarget: null,
	nextTarget: null,

	checkboxes: [g1, g2, g3],
	curCheckbox: null,
	curCheckboxIndex: null,
	prevCheckbox: null,
	nextCheckbox: null,

	labelsArea: '.green .nav-slider__labels',
	labelsArray: Array.from(document.querySelectorAll('.green .nav-slider__item')),
	firstTouch: null,
	x1: null,
	y1: null,
	x2: null,
	y2: null,
	xDiff: null,
	yDiff: null,
};

const playground = {
	class: '.playgrounds',

	arrows: '.playgrounds .slider__arrows',
	prevArrow: '.playgrounds .arrows__prev',
	nextArrow: '.playgrounds .arrows__next',
	prevTarget: null,
	nextTarget: null,

	checkboxes: [p1, p2, p3, p4],
	curCheckbox: null,
	curCheckboxIndex: null,
	prevCheckbox: null,
	nextCheckbox: null,

	labelsArea: '.playgrounds .nav-slider__labels',
	labelsArray: Array.from(document.querySelectorAll('.playgrounds .nav-slider__item')),
	firstTouch: null,
	x1: null,
	y1: null,
	x2: null,
	y2: null,
	xDiff: null,
	yDiff: null,
};

const corpRiv = {
	class: '.river',

	arrows: '.river .slider__arrows',
	prevArrow: '.river .arrows__prev',
	nextArrow: '.river .arrows__next',
	prevTarget: null,
	nextTarget: null,

	checkboxes: [r1, r2, r3, r4, r5, r6, r7],
	curCheckbox: null,
	curCheckboxIndex: null,
	prevCheckbox: null,
	nextCheckbox: null,

	descript: Array.from(document.querySelectorAll('.river .slider__description')),
};

const corpPark = {
	class: '.park',

	arrows: '.park .slider__arrows',
	prevArrow: '.park .arrows__prev',
	nextArrow: '.park .arrows__next',
	prevTarget: null,
	nextTarget: null,

	checkboxes: [f1, f2, f3],
	curCheckbox: null,
	curCheckboxIndex: null,
	prevCheckbox: null,
	nextCheckbox: null,

	descript: Array.from(document.querySelectorAll('.park .slider__description')),
};

const sliderList = [enjoy, corpRiv, corpPark, green, playground];

const telInputs = Array.from(document.querySelectorAll('.tel'));
const telInput = document.getElementById('pres__tel');

// eListeners -------------

document.addEventListener('focus', findInput, true);

window.addEventListener('resize', function () {
	sliderList.forEach(i => {
		if (i.labelsArea) {
			document.querySelector(i.labelsArea).setAttribute('style', `margin-left: 0px`);
		}
	});
	changeText();
});

document.addEventListener('click', function (e) {
	let slider = null;
	sliderList.forEach(i => {
		if (e.target.closest(i.class)) {
			slider = i;

			if (e.target.closest(i.arrows)) {
				scrollSlideByArrow(e, slider);
			}
			if (e.target.closest(i.labelsArea)) {
				changeLabelArea(e, slider);
			}
		}
	});
});

document.addEventListener(
	'touchstart',
	function (e) {
		let slider = null;
		sliderList.forEach(i => {
			if (i.labelsArea && e.target.closest(i.labelsArea)) {
				slider = i;
				handleTouchStart(e, slider);
			}
		});
	},
	false
);

document.addEventListener(
	'touchmove',
	function (e) {
		let slider = null;
		sliderList.forEach(i => {
			if (i.labelsArea && e.target.closest(i.labelsArea)) {
				slider = i;
				handleTouchMove(e, slider);
			}
		});
	},
	false
);

changeText();
sliderList.forEach(i => {
	if (i.labelsArea) {
		stylizeLabel(i);
	}
	if (i.descript) {
		stylizeDesc(i);
	}
});

// slider func-s --------------------

function stylizeLabel(slider, index = 0) {
	slider.labelsArray[index].classList.add('_add-line-under-tab');
	slider.labelsArray[index].firstElementChild.classList.add('_add-color-to-tab');
}
function unStylizeLabel(slider, index = 0) {
	slider.labelsArray[index].classList.remove('_add-line-under-tab');
	slider.labelsArray[index].firstElementChild.classList.remove('_add-color-to-tab');
}
function stylizeDesc(slider, index = 0) {
	slider.descript[index].classList.add('_opaci');
}
function unStylizeDesc(slider, index = 0) {
	slider.descript[index].classList.remove('_opaci');
}

function removeSideArrows(slider) {
	slider.curCheckboxIndex === 0 ? document.querySelector(slider.prevArrow).classList.add('_hide__arrow') : document.querySelector(slider.prevArrow).classList.remove('_hide__arrow');

	slider.curCheckboxIndex === slider.checkboxes.length - 1
		? document.querySelector(slider.nextArrow).classList.add('_hide__arrow')
		: document.querySelector(slider.nextArrow).classList.remove('_hide__arrow');
}

function findItemChecked(slider) {
	slider.checkboxes.forEach((i, index) => {
		if (i.checked) {
			slider.curCheckbox = i;
			slider.curCheckboxIndex = index;
		}
	});
}

function checkItem(slider, countStr) {
	let value = (slider.curCheckboxIndex ?? 0) + +countStr;

	slider.checkboxes[value].checked = true;
	slider.curCheckbox = slider.checkboxes[value];
	slider.curCheckboxIndex = value;
}

function changeLabelArea(e, slider) {
	if (!e.target.closest('.nav-slider__item')) {
		return;
	}

	slider.labelsArray.forEach((i, index) => {
		unStylizeLabel(slider, index);
	});

	setTimeout(() => {
		findItemChecked(slider);
		stylizeLabel(slider, slider.curCheckboxIndex);
	}, 0);

	setTimeout(() => {
		removeSideArrows(slider);
	}, 0);
}

function scrollSlideByArrow(e, slider) {
	e.preventDefault();

	slider.prevTarget = e.target.closest('.arrows__prev');
	slider.nextTarget = e.target.closest('.arrows__next');

	if (!(slider.prevTarget || slider.nextTarget)) {
		return;
	}

	findItemChecked(slider);

	if (!slider.curCheckbox) {
		checkItem(slider, '0');
	}

	if (slider.labelsArray) {
		unStylizeLabel(slider, slider.curCheckboxIndex);
	}
	if (slider.descript) {
		unStylizeDesc(slider, slider.curCheckboxIndex);
	}

	if (slider.curCheckboxIndex === 0) {
		slider.prevCheckbox = null;
	}
	if (slider.curCheckboxIndex === slider.checkboxes.length - 1) {
		slider.nextCheckbox = null;
	}

	if (slider.curCheckboxIndex !== 0) {
		slider.prevCheckbox = slider.checkboxes[slider.curCheckboxIndex - 1];
	}
	if (slider.curCheckboxIndex !== slider.checkboxes.length - 1) {
		slider.nextCheckbox = slider.checkboxes[slider.curCheckboxIndex + 1];
	}

	if (slider.prevTarget && slider.prevCheckbox) {
		checkItem(slider, '-1');
	}
	if (slider.nextTarget && slider.nextCheckbox) {
		checkItem(slider, '1');
	}

	if (slider.labelsArray) {
		stylizeLabel(slider, slider.curCheckboxIndex);
	}
	if (slider.descript) {
		stylizeDesc(slider, slider.curCheckboxIndex);
	}

	setTimeout(() => {
		removeSideArrows(slider);
	}, 0);
}

function handleTouchStart(e, slider) {
	slider.firstTouch = e.touches[0];

	slider.x1 = slider.firstTouch.clientX;
	slider.y1 = slider.firstTouch.clientY;
}

function handleTouchMove(e, slider) {
	if (!slider.x1 || !slider.y1) {
		return false;
	}

	slider.x2 = e.touches[0].clientX;
	slider.y2 = e.touches[0].clientY;

	slider.xDiff = slider.x2 - slider.x1;
	slider.yDiff = slider.y2 - slider.y1;

	if (Math.abs(slider.xDiff) > Math.abs(slider.yDiff)) {
		let area = document.querySelector(slider.labelsArea);

		if (area.offsetWidth - window.innerWidth < 0) {
			return false;
		}

		slider.xDiff > 0 ? area.setAttribute('style', `margin-left: 0px`) : area.setAttribute('style', `margin-left: -${area.offsetWidth - window.innerWidth + 16}px`);

		// (slider.yDiff > 0) ? log('down') : log('up');
	}

	slider.x1 = null;
	slider.y1 = null;
}

// input func --------------------------

function findInput(e) {
	let target, cursorPosition;

	if (e.target.closest('.tel')) {
		target = e.target;
		target.addEventListener('keydown', checkPhoneKey);

		target.addEventListener('blur', deleteEventListeners);

		function deleteEventListeners(e) {
			target.removeEventListener('keydown', checkPhoneKey);
			target.removeEventListener('blur', deleteEventListeners);
		}
	}

	function checkPhoneKey(e) {
		let key =
			(e.key >= '0' && e.key <= '9') /* e.key == '+' || e.key == '(' || e.key == ')' || e.key == '-' || */ ||
			e.key == 'ArrowLeft' ||
			e.key == 'ArrowRight' ||
			e.key == 'Delete' ||
			e.key == 'Backspace';
		if (!key) {
			e.preventDefault();
			return false;
		}

		const saveCursorPos = () => (cursorPosition = target.selectionEnd);
		saveCursorPos();

		if (e.key >= '0' && e.key <= '9') {
			if (target.value.length === 3) {
				target.value += ' ';
			}
			if (target.value.length === 7 || target.value.length === 10) {
				target.value += '-';
			}
			doTelMask(target);
		}
		if (e.key == 'Backspace' || e.key == 'Delete') {
			doTelMask(target);
		}

		function deleteSideSymbols(input) {
			if (input.value.at(-1) === '-' || input.value.at(-1) === ' ') {
				input.value = input.value.slice(0, input.value.length - 1);
			}
		}

		function removeSymbols(input) {
			for (let j = 0; j < input.value.length; j++) {
				if ((input.value[j] === ' ' && j !== 3) || (input.value[j] === '-' && j !== 7 && j !== 10)) {
					input.value = input.value.slice(0, j) + input.value.slice(j + 1);
					j -= 1;
				}
			}
		}
		function addSymbolToPos(input, pos, symbol, callFn = false) {
			if (input.value.length >= pos + 1 && input.value[pos] !== symbol) {
				input.value = input.value.slice(0, pos) + symbol + input.value.slice(pos);

				if (callFn) {
					removeSymbols(input);
				}
			}
		}
		function doTelMask(input, delay = 0) {
			setTimeout(() => {
				deleteSideSymbols(input);
			}, 0);
			setTimeout(() => {
				removeSymbols(input);
				setTimeout(() => {
					addSymbolToPos(input, 3, ' ', true);
					addSymbolToPos(input, 7, '-');
					addSymbolToPos(input, 10, '-');
					// input.selectionStart = input.selectionEnd = cursorPosition;
				}, 0);
			}, delay);
		}
	}
}

// header func ---------------

function showIndicator(boolean = true) {
	const indicators = document.querySelectorAll('._indicator');
	const status = document.querySelectorAll('._status');
	const footerStatus = document.querySelector('.footer__status');
	if (!boolean) {
		indicators.forEach(i => (i.hidden = true));
		status.forEach(i => (i.textContent = 'не работаем'));
		footerStatus.style.paddingLeft = '0px';
	} else {
		footerStatus.style.paddingLeft = '9px';
	}
	if (boolean) {
		indicators.forEach(i => (i.hidden = false));
	}
}
showIndicator();

// text func ----------------

function changeText() {
	let winWidth = window.innerWidth;

	const h1 = document.querySelector('h1');
	const awards = document.querySelector('.awards__row p');
	const mapText = document.querySelector('.map__text .main-font');
	const enjoyH2 = document.querySelector('.enjoy h2');
	const [present_1, present_2, present_3] = document.querySelectorAll('.presentation__item .main-font');
	const [desc1, desc2] = document.querySelectorAll('.first__description');
	const lobbyHead = document.querySelector('.lobby h2');
	const flatsHead = document.querySelector('.flats h2');
	const fireplace = document.querySelectorAll('.flats .default__heading h5')[1];
	const windowsText = document.querySelector('.windows__text');
	const comfortHeading = document.querySelector('.comfort h2');
	const fourQuestions = document.querySelectorAll('.how__text');
	const finishingSub = document.querySelector('.finishing__subtitle');
	const interiorDesc = document.querySelector('.variants-one__text');
	const formatsHeading = document.querySelector('.formats__heading');
	const parkingH2 = document.querySelector('.parking h2');
	const parkingSub = document.querySelector('.parking__subtitle');
	const placeParkingText = document.querySelectorAll('.place-parking__text')[1];
	const parkingTxtblockHeading = document.querySelector('.textblock-parking__heading');
	const greenH2 = document.querySelector('.green h2');
	const greenSub = document.querySelector('.green__subtitle');
	const playgSub = document.querySelector('.playgrounds__subtitle');
	const complexTitle = document.querySelector('.complex h2');
	const complexHeading1 = document.querySelector('.complex .default__heading--1 h5');
	const complexHeading2 = document.querySelector('.complex .default__heading--2 h5');
	const complexHeading3 = document.querySelector('.complex .default__heading--3 h5');
	const comlexSubheading1 = document.querySelector('.complex .default__text--1');
	const environmentH2 = document.querySelector('.environment__title h2');
	const milieuH2 = document.querySelector('.milieu h2');
	const everyTitle = document.querySelector('.every__title');
	const everySub = document.querySelector('.every__subtitle');
	const everyAgreement = document.querySelector('.every .agreement');
	const developTitle = document.querySelector('.develop__title');
	const developSub = document.querySelector('.develop__subtitle');
	const developSubh1 = document.querySelector('.develop__subh--1');
	const developSubh3 = document.querySelector('.develop__subh--3');
	const banksH2 = document.querySelector('.banks__title h2');
	const creditSubh1 = document.querySelectorAll('.credit__subh')[0];
	const creditSubh2 = document.querySelectorAll('.credit__subh')[1];
	const footerTitle = document.querySelector('.footer__title');

	if (winWidth >= 504) {
		footerTitle.innerHTML = `Жилой комплекс «West&nbsp;Garden» —${'<br>'}все преимущества жизни на&nbsp;природе`;
	} else {
		footerTitle.innerHTML = `Жилой комплекс «West&nbsp;Garden» — все преимущества жизни на&nbsp;природе`;
	}

	if (winWidth >= 550) {
		creditSubh2.innerHTML = `Беспроцентная рассрочка от&nbsp;застройщика${'<br>'}на&nbsp;12&nbsp;месяцев при первоначальном взносе&nbsp;30%`;
	} else {
		creditSubh2.innerHTML = `Беспроцентная рассрочка от&nbsp;застройщика на&nbsp;12&nbsp;месяцев при первоначальном взносе&nbsp;30%`;
	}

	if (winWidth >= 760 && winWidth <= 1024) {
		creditSubh1.innerHTML = `Наш ипотечный брокер подберет для&nbsp;вас лучшие условия${'<br>'}от&nbsp;20&nbsp;банков; Господдержка на&nbsp;протяжении всего срока ипотеки`;
	} else {
		creditSubh1.innerHTML = `Наш ипотечный брокер подберет для&nbsp;вас лучшие условия от&nbsp;20&nbsp;банков; Господдержка на&nbsp;протяжении всего срока ипотеки`;
	}

	if ((winWidth >= 590 && winWidth <= 1024) || winWidth >= 1400) {
		banksH2.innerHTML = `Самые выгодные условия${'<br>'}кредитования от&nbsp;20&nbsp;банков`;
	} else if (winWidth >= 1025 && winWidth <= 1399) {
		banksH2.innerHTML = `Самые выгодные${'<br>'}условия кредитования${'<br>'}от&nbsp;20&nbsp;банков`;
	} else {
		banksH2.innerHTML = `Самые выгодные условия кредитования от&nbsp;20&nbsp;банков`;
	}

	if (winWidth >= 1336) {
		developSubh1.innerHTML = `на&nbsp;рынке недвижимости${'<br>'}Москвы и&nbsp;регионов`;
		developSubh3.innerHTML = `общая площадь готовых${'<br>'}объектов`;
	} else {
		developSubh1.innerHTML = `на&nbsp;рынке недвижимости Москвы и&nbsp;регионов`;
		developSubh3.innerHTML = `общая площадь готовых объектов`;
	}

	if (winWidth >= 1025) {
		developTitle.innerHTML = `Девелопер${'<br>'}ИНТЕКО`;
	} else {
		developTitle.innerHTML = `Девелопер ИНТЕКО`;
	}

	if (winWidth >= 768 && winWidth <= 1024) {
		developSub.innerHTML = `Реализует лучшие проекты в&nbsp;сфере недвижимости${'<br>'}на&nbsp;основе анализа и&nbsp;прогноза предпочтений человека`;
	} else if (winWidth >= 1025 && winWidth <= 1365) {
		developSub.innerHTML = `Реализует лучшие проекты в&nbsp;сфере недвижимости${'<br>'}на&nbsp;основе анализа и&nbsp;прогноза предпочтений человека`;
	} else if (winWidth >= 1366) {
		developSub.innerHTML = `Реализует лучшие проекты в&nbsp;сфере${'<br>'}недвижимости на&nbsp;основе анализа${'<br>'}и&nbsp;прогноза предпочтений человека`;
	} else {
		developSub.innerHTML = `Реализует лучшие проекты в&nbsp;сфере недвижимости на&nbsp;основе анализа и&nbsp;прогноза предпочтений человека`;
	}

	if (winWidth >= 1025) {
		everySub.innerHTML = `Зафиксируйте текущую цену на&nbsp;квартиру${'<br>'}прямо сейчас`;
		everyAgreement.innerHTML = `Нажимая на&nbsp;кнопку, вы даёте согласие на&nbsp;обработку персональных данных и&nbsp;соглашаетесь${'<br>'}c&nbsp;<a href="#" class="policy">политикой&nbsp;конфиденциальности</a>`;
	} else {
		everySub.innerHTML = `Зафиксируйте текущую цену на&nbsp;квартиру прямо сейчас`;
		everyAgreement.innerHTML = `Нажимая на&nbsp;кнопку, вы даёте согласие на&nbsp;обработку персональных данных и&nbsp;соглашаетесь c&nbsp;<a href="#" class="policy">политикой&nbsp;конфиденциальности</a>`;
	}

	if (winWidth >= 585 && winWidth <= 1024) {
		everyTitle.innerHTML = `Каждые 10&nbsp;дней стоимость${'<br>'}квартиры растет на&nbsp;5%`;
	} else {
		everyTitle.innerHTML = `Каждые 10&nbsp;дней стоимость квартиры растет на&nbsp;5%`;
	}

	if (winWidth >= 556 && winWidth <= 767) {
		milieuH2.innerHTML = `Максимально комфортная${'<br>'}среда для жизни`;
	} else if (winWidth >= 768) {
		milieuH2.innerHTML = `Максимально комфортная${'<br>'}<span class="lined">среда для жизни</span>`;
	} else {
		milieuH2.innerHTML = `Максимально комфортная среда для жизни`;
	}

	if (winWidth >= 462) {
		environmentH2.innerHTML = `Статусное окружение${'<br>'}вашего будущего дома`;
	} else {
		environmentH2.innerHTML = `Статусное окружение вашего будущего дома`;
	}

	if (winWidth >= 500 && winWidth <= 767) {
		complexTitle.innerHTML = `Жилой комплекс${'<br>'}с&nbsp;собственной инфраструктурой`;
	} else if (winWidth >= 768 && winWidth <= 1024) {
		complexTitle.innerHTML = `Жилой комплекс <span class="lined">с&nbsp;собственной инфраструктурой</span>`;
	} else if (winWidth >= 1025 && winWidth <= 1200) {
		complexTitle.innerHTML = `Жилой комплекс${'<br>'}с&nbsp;собственной${'<br>'}<span class="lined">инфраструктурой</span>`;
	} else if (winWidth >= 1200) {
		complexTitle.innerHTML = `Жилой комплекс${'<br>'}<span class="lined">с&nbsp;собственной инфраструктурой</span>`;
	} else {
		complexTitle.innerHTML = `Жилой комплекс с&nbsp;собственной инфраструктурой`;
	}

	if (winWidth >= 1366) {
		comlexSubheading1.innerHTML = `Супермаркет, ресторан, кофейня,${'<br>'}медицинский центр, салон красоты,${'<br>'}детский клуб. Всё, что нужно для${'<br>'}комфортной жизни прямо под домом.`;
	} else if (winWidth >= 1025 && winWidth <= 1335) {
		comlexSubheading1.innerHTML = `Супермаркет, ресторан, кофейня, медицинский центр, салон красоты, детский клуб.${'<br>'}Всё, что нужно для комфортной жизни прямо под домом.`;
	} else {
		comlexSubheading1.innerHTML = `Супермаркет, ресторан, кофейня, медицинский центр, салон красоты, детский клуб. Всё, что нужно для комфортной жизни прямо под домом.`;
	}

	if (winWidth >= 1366) {
		complexHeading1.innerHTML = `Все необходимые услуги${'<br>'}и магазины на&nbsp;первых${'<br>'}этажах корпусов`;
		complexHeading2.innerHTML = `Детский сад${'<br>'}«West&nbsp;Garden»`;
		complexHeading3.innerHTML = `Безопасность${'<br>'}и охрана 24/7`;
	} else if (winWidth >= 1025 && winWidth <= 1335) {
		complexHeading1.innerHTML = `Все необходимые услуги и магазины${'<br>'}на&nbsp;первых этажах корпусов`;
		complexHeading2.innerHTML = `Детский сад «West&nbsp;Garden»`;
		complexHeading3.innerHTML = `Безопасность и охрана 24/7`;
	} else {
		complexHeading1.innerHTML = `Все необходимые услуги и магазины на&nbsp;первых этажах корпусов`;
		complexHeading2.innerHTML = `Детский сад «West&nbsp;Garden»`;
		complexHeading3.innerHTML = `Безопасность и охрана 24/7`;
	}

	if (winWidth >= 1366) {
		playgSub.innerHTML = `Игры на&nbsp;таких площадках помогут предотвратить трудности${'<br>'}в&nbsp;детском саду или&nbsp;школе. Спроектированы совместно${'<br>'}со&nbsp;специалистами в&nbsp;области неврологии, психологии и архитектуры.`;
	} else {
		playgSub.innerHTML = `Игры на&nbsp;таких площадках помогут предотвратить трудности в&nbsp;детском саду или&nbsp;школе. Спроектированы совместно со&nbsp;специалистами в&nbsp;области неврологии, психологии и архитектуры.`;
	}

	if (winWidth >= 768) {
		greenSub.innerHTML = `Погрузитесь в&nbsp;мир будущего с&nbsp;современными архитектурными${'<br>'}строениями посреди сада`;
	} else {
		greenSub.innerHTML = `Погрузитесь в&nbsp;мир будущего с&nbsp;современными архитектурными строениями посреди сада`;
	}

	if (winWidth >= 768) {
		greenH2.innerHTML = `<span class="lined">Зелёный оазис</span>${'<br>'}в&nbsp;старых границах Москвы`;
	} else if (winWidth >= 390 && winWidth <= 663) {
		greenH2.innerHTML = `<span class="lined">Зелёный оазис</span> в&nbsp;старых${'<br>'}границах Москвы`;
	} else {
		greenH2.innerHTML = `<span class="lined">Зелёный оазис</span> в&nbsp;старых границах Москвы`;
	}

	if (winWidth >= 360 && winWidth <= 664) {
		parkingTxtblockHeading.innerHTML = `Машины попадают на&nbsp;подземный${'<br>'}паркинг без&nbsp;заезда во&nbsp;двор`;
	} else {
		parkingTxtblockHeading.innerHTML = `Машины попадают на&nbsp;подземный паркинг без&nbsp;заезда во&nbsp;двор`;
	}

	if (winWidth >= 768 && winWidth <= 1365) {
		placeParkingText.innerHTML = `на гостевой парковке${'<br>'}за&nbsp;территорией ЖК`;
	} else {
		placeParkingText.innerHTML = `на гостевой парковке за&nbsp;территорией ЖК`;
	}

	if (winWidth >= 720 && winWidth <= 1024) {
		parkingSub.innerHTML = `Наслаждайтесь изобилием деревьев и&nbsp;кустарников во&nbsp;дворе, никаких машин&nbsp;—${'<br>'}только пустые тротуарные дорожки и&nbsp;обилие цветов и&nbsp;кустарников`;
	} else if (winWidth >= 1025) {
		parkingSub.innerHTML = `Наслаждайтесь изобилием деревьев и&nbsp;кустарников во&nbsp;дворе,${'<br>'}никаких машин&nbsp;— только пустые тротуарные дорожки и&nbsp;обилие${'<br>'}цветов и&nbsp;кустарников`;
	} else {
		parkingSub.innerHTML = `Наслаждайтесь изобилием деревьев и&nbsp;кустарников во&nbsp;дворе, никаких машин&nbsp;— только пустые тротуарные дорожки и&nbsp;обилие цветов и&nbsp;кустарников`;
	}

	if (winWidth >= 513 && winWidth <= 650) {
		parkingH2.innerHTML = `<span class="lined">Двор без машин</span> — вся парковка${'<br>'}под&nbsp;землёй`;
	} else if (winWidth >= 768) {
		parkingH2.innerHTML = `<span class="lined">Двор без машин</span> —${'<br>'}вся парковка под&nbsp;землёй`;
	} else {
		parkingH2.innerHTML = `<span class="lined">Двор без машин</span> — вся парковка под&nbsp;землёй`;
	}

	if ((winWidth >= 336 && winWidth <= 469) || winWidth >= 1025) {
		formatsHeading.innerHTML = `Посмотрите${'<br>'}все планировки${'<br>'}и&nbsp;форматы квартир`;
	} else if (winWidth >= 470 && winWidth <= 1024) {
		formatsHeading.innerHTML = `Посмотрите все планировки${'<br>'}и&nbsp;форматы квартир`;
	} else {
		formatsHeading.innerHTML = `Посмотрите все планировки и&nbsp;форматы квартир`;
	}

	if (winWidth >= 868 && winWidth <= 1024) {
		interiorDesc.innerHTML = `Сочетание белых стен и&nbsp;светлой напольной доски с&nbsp;текстурой дерева расширяет пространство,${'<br>'}формируя гармоничную, наполненную светом атмосферу`;
	} else {
		interiorDesc.innerHTML = `Сочетание белых стен и&nbsp;светлой напольной доски с&nbsp;текстурой дерева расширяет пространство, формируя гармоничную, наполненную светом атмосферу`;
	}

	if (winWidth >= 1074) {
		finishingSub.innerHTML = `${'<span class="lined">'}Экономьте на&nbsp;стоимости ремонта, покупая квартиру с&nbsp;готовой отделкой${'</span>'}`;
	} else {
		finishingSub.innerHTML = `Экономьте на&nbsp;стоимости ремонта, покупая квартиру с&nbsp;готовой отделкой`;
	}

	if (winWidth >= 500) {
		fourQuestions.forEach(i => (i.innerHTML = `Ответьте на 4&nbsp;вопроса, чтобы подобрать${'<br>'}идеальный вариант недвижимости`));
	} else {
		fourQuestions.forEach(i => (i.innerHTML = `Ответьте на 4&nbsp;вопроса, чтобы подобрать идеальный вариант недвижимости`));
	}

	if (winWidth >= 378) {
		comfortHeading.innerHTML = `Максимальный комфорт${'<br>'}в&nbsp;квартире`;
	} else {
		comfortHeading.innerHTML = `Максимальный комфорт в&nbsp;квартире`;
	}

	if (winWidth >= 768) {
		windowsText.innerHTML = `Планировки квартир продуманы таким образом, что панорамный${'<br>'}вид на&nbsp;город открывается уже при&nbsp;входе в&nbsp;квартиру`;
	} else {
		windowsText.innerHTML = `Планировки квартир продуманы таким образом, что панорамный вид на&nbsp;город открывается уже при&nbsp;входе в&nbsp;квартиру`;
	}

	if (winWidth >= 1366) {
		fireplace.innerHTML = `Настоящий дровяной${'<br>'}камин`;
	} else {
		fireplace.innerHTML = `Настоящий дровяной камин`;
	}

	if (winWidth >= 560) {
		flatsHead.innerHTML = `Более 100 свободных квартир${'<br>'}<span class="lined">редких форматов</span>`;
	} else if (winWidth <= 305 || (winWidth >= 336 && winWidth <= 399)) {
		flatsHead.innerHTML = `Более 100 свободных квартир <span class="lined">редких</span> <span class="lined">форматов</span>`;
	} else {
		flatsHead.innerHTML = `Более 100 свободных квартир <span class="lined">редких форматов</span>`;
	}

	if (winWidth >= 485) {
		lobbyHead.innerHTML = `Современная эстетика лобби`;
	} else {
		lobbyHead.innerHTML = `Современная${'<br>'}эстетика лобби`;
	}

	if (winWidth >= 500) {
		desc1.innerHTML = `Восемь жилых корпусов по&nbsp;12&nbsp;-&nbsp;14 этажей${'<br>'}выстроенны вдоль реки Раменки`;
		desc2.innerHTML = `Семь 14&nbsp;-&nbsp;этажных жилых корпусов,${'<br>'}расположенных вдоль Матвеевского&nbsp;леса`;
	} else {
		desc1.innerHTML = `Восемь жилых корпусов по&nbsp;12&nbsp;-&nbsp;14 этажей выстроенны вдоль реки Раменки`;
		desc2.innerHTML = `Семь 14&nbsp;-&nbsp;этажных жилых корпусов, расположенных вдоль Матвеевского&nbsp;леса`;
	}

	if ((winWidth >= 440 && winWidth < 487) || (winWidth >= 768 && winWidth < 840)) {
		present_1.innerHTML = `Подробно расскажем про${'<br>'}жилой комплекс`;
		present_2.innerHTML = `Ознакомитесь со&nbsp;всеми${'<br>'}планировками и&nbsp;ценами`;
		present_3.innerHTML = `Прогуляетесь по${'<br>'}благоустроенной набережной`;
	} else {
		present_1.innerHTML = `Подробно расскажем про жилой комплекс`;
		present_2.innerHTML = `Ознакомитесь со&nbsp;всеми планировками и&nbsp;ценами`;
		present_3.innerHTML = `Прогуляетесь по благоустроенной набережной`;
	}

	if (winWidth >= 360 && winWidth < 448) {
		enjoyH2.innerHTML = `Наслаждайтесь${'<br>'}видами из окон своей квартиры`;
	} else if (winWidth >= 448) {
		enjoyH2.innerHTML = `Наслаждайтесь видами${'<br>'}из окон своей квартиры`;
	} else {
		enjoyH2.innerHTML = `Наслаждайтесь видами из окон своей квартиры`;
	}

	if (winWidth >= 648) {
		mapText.innerHTML = `ЖК West Garden окружен Матвеевским&nbsp;лесом, набережной реки${'<br>'}Раменки и природным заказником «Долина&nbsp;реки&nbsp;Сетунь»`;
	} else {
		mapText.innerHTML = `ЖК West Garden окружен Матвеевским&nbsp;лесом, набережной реки Раменки и природным заказником «Долина&nbsp;реки&nbsp;Сетунь»`;
	}

	if (winWidth >= 648 && winWidth < 1024) {
		h1.innerHTML = `Жизнь в&nbsp;зеленом оазисе${'<br>'}в&nbsp;статусном районе Москвы`;
	} else {
		h1.innerHTML = `Жизнь в&nbsp;зеленом оазисе в&nbsp;статусном районе Москвы`;
	}

	if (winWidth >= 768) {
		awards.innerHTML = `Победитель${'<br>'}федеральной премии Urban Awards 2019`;
	} else {
		awards.innerHTML = `Победитель федеральной премии&nbsp;Urban Awards 2019`;
	}
}

// drag element class -------------

const DragElementClass = new DragElement(document.getElementById('banks__slider'), {
	liilllilllilililiiii: 0.25,
	iiliiiliililiiiiilii: 10,
	illilllliilillliilili: 0.08,
});

// map
let center = [55.71193764117759, 37.49946674328607];

function init() {
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 13,
	});

	let placemark = new ymaps.Placemark([55.718125893312845, 37.497914837929905], {}, {});

	map.controls.remove('geolocationControl');
	map.controls.remove('searchControl');
	map.controls.remove('trafficControl');
	map.controls.remove('typeSelector');
	map.controls.remove('fullscreenControl');
	map.controls.remove('zoomControl');
	map.controls.remove('rulerControl');
	map.behaviors.disable(['scrollZoom']);

	map.geoObjects.add(placemark);
}

ymaps.ready(init);
