const dragElementClassNames = {
	directly: 'drag',
	rowbox: 'drag__rowbox',
	row: 'drag__row',
	box: 'drag__box',
	dragCursor: 'drag__draggable',
};

class DragElement {
	constructor(element, options = {}) {
		this.llilillillllllllliil = element;
		this.lliililiiillliiiiiill = {
			liilllilllilililiiii: options.liilllilllilililiiii || 0.25,
			iiliiiliililiiiiilii: options.iiliiiliililiiiiilii || 10,
			illilllliilillliilili: options.illilllliilillliilili || 0.08,
		};

		this.ilillilillllliilliii = this.ilillilillllliilliii.bind(this);
		this.liliiiliiiliiillllll = this.liliiiliiiliiillllll.bind(this);
		this.iiiilliiiillliiiilll = this.iiiilliiiillliiiilll.bind(this);
		this.illiiliilliiillilili = this.illiiliilliiillilili.bind(this);
		this.lliliillllliillilili = this.lliliillllliillilili.bind(this);
		this.liiliililiilililiiil = this.liiliililiilililiiil.bind(this);
		this.iiiilllliiililliiili = this.iiiilllliiililliiili.bind(this);
		this.lillliiiillliiiiilil = this.lillliiiillliiiiilil.bind(this);
		this.liiililiilllliiillll = this.liiililiilllliiillll.bind(this);
		this.illlillliiiiilliilli = this.illlillliiiiilliilli.bind(this);
		this.illiiilliiililiiilii = this.illiiilliiililiiilii.bind(this);
		this.iiliiiiliililllilill = this.iiliiiiliililllilill.bind(this);

		this.ilillilillllliilliii();
		this.liliiiliiiliiillllll();
		this.illlillliiiiilliilli();
	}

	ilillilillllliilliii() {
		this.llilillillllllllliil.classList.add(dragElementClassNames.directly);
		this.llilillillllllllliil.innerHTML = `
		<div class="${dragElementClassNames.rowbox}">
			<div class="${dragElementClassNames.row}">
				<div class="${dragElementClassNames.box}">
					${this.llilillillllllllliil.innerHTML}
				</div>
			</div>
		</div>
		`;
	}

	liliiiliiiliiillllll() {
		this.iilliliiiiiiililliil = this.llilillillllllllliil.querySelector('.drag__box');
		this.iillillliiilliiliili = this.iilliliiiiiiililliil.children[0].getBoundingClientRect().width;
		this.liiililiilllliiillll();
		this.iilliliiiiiiililliil.style.width = `${this.iillillliiilliiliili}px`;
		this.iiiilllliiililliiili();

		this.iliilliilllllliillil = this.llilillillllllllliil.getBoundingClientRect().width;
		this.iiiilliiillliiiiilii = this.iillillliiilliiliili - this.iliilliilllllliillil;

		this.llilllllillilillllli = this.iiiilliiillliiiiilii <= 0 ? false : true;

		this.llliliiilliillllilli = this.llliliiilliillllilli ?? 0;

		this.iiiilllliiililliiili();
	}

	iiiilliiiillliiiilll(e) {
		if (this.llilllllillilillllli) {
			this.liiliilliilllllilill = e.pageX;
			this.iilllllliiiillliiill = e.pageY;
			this.iiliiililliilliiilll = this.llliliiilliillllilli;

			this.liiililiilllliiillll();
			this.llilillillllllllliil.classList.add(dragElementClassNames.dragCursor);
			window.addEventListener('pointermove', this.illiiliilliiillilili);
		}
	}

	iiliiiiliililllilill() {
		this.llilillillllllllliil.style.touchAction = Math.abs(this.lllliiililllliliiili) > Math.abs(this.iiilliiiliiiilililli) ? 'none' : 'auto';
	}

	illiiliilliiillilili(e) {
		if (this.llilllllillilillllli) {
			this.liililliiliiillillii = e.pageX;
			this.lililiillliiliiiilll = e.pageY;

			this.lllliiililllliliiili = this.liiliilliilllllilill - this.liililliiliiillillii;
			this.iiilliiiliiiilililli = this.iilllllliiiillliiill - this.lililiillliiliiiilll;

			debounce(this.iiliiiiliililllilill(), 20);

			this.lllililililiiilliiii = this.liililliiliiillillii - this.liiliilliilllllilill;
			const illllliililiillllilii = this.lllililililiiilliiii / this.lliililiiillliiiiiill.iiliiiliililiiiiilii;
			this.llliliiilliillllilli = Math.max(Math.min(this.iiliiililliilliiilll + this.lllililililiiilliiii, illllliililiillllilii), -this.iiiilliiillliiiiilii + illllliililiillllilii);

			if (this.llliliiilliillllilli >= this.iliilliilllllliillil * this.lliililiiillliiiiiill.illilllliilillliilili) {
				this.llliliiilliillllilli = this.iliilliilllllliillil * this.lliililiiillliiiiiill.illilllliilillliilili;
			}
			if (this.llliliiilliillllilli <= -this.iiiilliiillliiiiilii - this.iliilliilllllliillil * this.lliililiiillliiiiiill.illilllliilillliilili) {
				this.llliliiilliillllilli = -this.iiiilliiillliiiiilii - this.iliilliilllllliillil * this.lliililiiillliiiiiill.illilllliilillliilili;
			}

			this.iiiilllliiililliiili();
		}
	}

	lliliillllliillilili() {
		if (this.llilllllillilillllli) {
			window.removeEventListener('pointermove', this.illiiliilliiillilili);
			this.llilillillllllllliil.classList.remove(dragElementClassNames.dragCursor);
			if (this.llliliiilliillllilli >= 0) {
				this.llliliiilliillllilli = 0;
			}
			if (this.llliliiilliillllilli <= -this.iiiilliiillliiiiilii) {
				this.llliliiilliillllilli = -this.iiiilliiillliiiiilii;
			}
			this.iiiilllliiililliiili();
			this.lillliiiillliiiiilil();
		}
	}

	liiliililiilililiiil() {
		this.llliliiilliillllilli = 0;
		this.liliiiliiiliiillllll();
	}

	iiiilllliiililliiili() {
		this.iilliliiiiiiililliil.style.transform = `translate3d(${this.llliliiilliillllilli}px, 0, 0)`;
	}

	lillliiiillliiiiilil() {
		this.iilliliiiiiiililliil.style.transition = `all ${this.lliililiiillliiiiiill.liilllilllilililiiii}s ease 0s`;
	}

	liiililiilllliiillll() {
		this.iilliliiiiiiililliil.style.transition = `all 0s ease 0s`;
	}

	illlillliiiiilliilli() {
		this.liilliiiiiliiliiilli = debounce(this.liiliililiilililiiil);

		window.addEventListener('resize', this.liilliiiiiliiliiilli);
		this.iilliliiiiiiililliil.addEventListener('pointerdown', this.iiiilliiiillliiiilll);
		window.addEventListener('pointerup', this.lliliillllliillilili);
		window.addEventListener('pointercancel', this.lliliillllliillilili);
	}

	illiiilliiililiiilii() {
		window.removeEventListener('resize', this.liilliiiiiliiliiilli);
		this.iilliliiiiiiililliil.removeEventListener('pointerdown', this.iiiilliiiillliiiilll);
		window.removeEventListener('pointerup', this.lliliillllliillilili);
		window.removeEventListener('pointercancel', this.lliliillllliillilili);
	}
}

// helpers

function debounce(func, time = 100) {
	let timer;
	return function (e) {
		clearTimeout(timer);
		timer = setTimeout(func, time, e);
	};
}
