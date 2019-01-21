export class FunctionsBasics {
    static valueEficiencyOne: number = 0.1;
    static valueEficiencyTwo: number = 0.9
    static openModal(variable: boolean): boolean {
        console.log("entro al modal")
        variable = true;
        return variable
    }
    static closeModal(variable: boolean): boolean {
        variable = false;
        return variable;
    }
}