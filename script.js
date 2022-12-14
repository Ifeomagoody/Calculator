class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }


    clear(){                                          //function to clear all variables
this.currentOperand = ''
this.previousOperand = ''
this.Operation = undefined
    }

    delete(){                                        //function to clear "a" variable
this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {                                 //function for adding a number to the screen whenever a user clicks a number
if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()     //it is converted to a string because Js will just add the number but we want the numbers appended until an operation is clicked on
    }

    chooseOperation(operation) {                              //whenever a user clicks on an operation(+,- etc.)
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
        this.compute()
    }
        this.operation = operation                                //it takes away previous operations and focuses on the present  this is what the three lines are meant for
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

    compute() {
let computation
const prev = parseFloat(this.previousOperand)
const current = parseFloat(this.currentOperand)
if(isNaN(prev) || isNaN(current)) return
switch (this.operation) {
    case '+':
        computation = prev + current
        break
        case '-':
            computation = prev - current
            break
            case '*':
                computation = prev * current
                break
                case '/':
                    computation = prev / current
                    break
                    default: 
                    return
}
this.currentOperand = computation
this.operation = undefined
this.previousOperand = ''
    }

    getDisplayNumber(number){

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
       let integerDisplay
       if(isNaN(integerDigits)) {
        integerDisplay = ''
       } else{
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
       }
       if(decimalDigits != null){
        return `${integerDisplay}.${decimaldigits}`                    
       }else{
        return integerDisplay
       }

    }

    updateDisplay(){                                       //the previous, current operand displayed and the operation
this.currentOperandTextElement.innerText = 
this.getDisplayNumber(this.currentOperand)
if(this.operation != null) {
    this.previousOperandTextElement.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
}else{
    this.previousOperandTextElement.innerText = ''
    
}
    }

    }


const numberButtons = document.querySelectorAll('[data-number]')    
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {                          //looping through the whole button
    button.addEventListener('click', () => {                //whenever the button is clicked something is to be performed
        calculator.appendNumber(button.innerText)          //whatever thing that is in the button clicked is displayed
        calculator.updateDisplay()                         //anything that is clicked on is constantly displayed on the screen
    })
})

operationButtons.forEach(button => {                          //looping through the whole button
    button.addEventListener('click', () => {                //whenever the button is clicked something is to be performed
        calculator.chooseOperation(button.innerText)          //whatever thing that is in the button clicked is displayed
        calculator.updateDisplay()                         //anything that is clicked on is constantly displayed on the screen
    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})