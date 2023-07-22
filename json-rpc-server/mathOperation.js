
/**
 * Допустимые математицеские выражения, указываются одним математическим символом.
 * Будут использоваться в выражениях с двумя аргументами вида:  A <операция> B
 */
const allOperation = ['+', '-', '*', '/'];

/**
 * Генерирует простое математическое выражение для двух аргументов, выражение указывается одним символом
 * в `typeOperation` и должно быть одним из допустимых, указанным в `allOperation`
 * 
 * В случае неудачного определения вернет функцию возвращающую NaN.
 * 
 * @param {*} typeOperation символ математической операции
 * @returns функция, в коде которой, сгенерированное математическое выражение
 */
function selectOperation(typeOperation) {
    let mathematicalExpression = function (a, b) { return NaN }

    let operation = allOperation
        .find(operation => typeOperation == operation)

    if (operation && operation.length == 1) {
        mathematicalExpression = function (a, b) {
            return eval("a " + operation + " b")   // eval is evil but extensible code is goodness
        }
    }

    return mathematicalExpression;
}

module.exports = {
    selectOperation: selectOperation,
    allOperation: allOperation
};