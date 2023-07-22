
/**
 * Допустимые математицеские выражения, указываются одним математическим символом.
 * Будут использоваться в выражениях с двумя аргументами вида:  A <операция> B
 */
const allOperation = ['+', '-', '*', '/'];

/**
 * Генерирует простое математическое выражение для двух аргументов, выражение указывается одним символом
 * в `typeOperation` и должно быть одним из допустимых, указанным в `allOperation`
 * 
 * @param {*} typeOperation символ математической операции
 * @returns функция, в коде которой, сгенерированное математическое выражение
 */
function selectOperation(typeOperation) {
    let operation = allOperation
        .find(operation => typeOperation == operation)

    if (operation && operation.length == 1) {
        return function (a, b) {
            return eval("a " + operation + " b")   // eval is evil but extensible code is goodness
        }
    } else
        throw new Error("Неверный операнд выражения.");
}

module.exports = {
    selectOperation: selectOperation,
    allOperation: allOperation
};