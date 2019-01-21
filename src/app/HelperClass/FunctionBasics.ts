export class FunctionsBasics {
    static openModal(variable: boolean):boolean {
        console.log("entro al modal")
        variable = true;
        return variable
    }
    static closeModal(variable: boolean):boolean {
        variable = false;
        return variable;
    }
}