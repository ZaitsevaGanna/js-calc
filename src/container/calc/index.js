class Calc {
  static #value = '0'
  static #isDot = false
  static #NAME = 'calc'

  static add = (newValue) => {
    this.#value = this.#value.concat(newValue)

    let lastChar = this.#value.charAt(
      this.#value.length - 1,
    )

    const isOp =
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '*' ||
      lastChar === '/' ||
      lastChar === ''

    if (this.#value.length > 2 && isOp) {
      return null
    }

    if (
      this.#value.length > 1 &&
      this.#value[0] === '0' &&
      this.#value[1] !== '.'
    ) {
      this.#value = this.#value.slice(1)
    }

    this.#output()
  }

  static dot() {
    if (this.#isDot) {
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static op(opValue) {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  static reset() {
    this.#value = '0'
    this.#output()
  }

  static result() {
    this.#value = String(eval(this.#value))
    this.#isDot = false
    this.#output()
  }

  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }
  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || '0'
  }

  static init = () => {
    this.#load()
    this.#output()
  }
}
Calc.init()

window.calc = Calc

console.log('Calc is init', window.calc)
