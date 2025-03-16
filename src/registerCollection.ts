import { Armor, Weapon, Potion } from "./item.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";

export type OperationType = "buy" | "sell" | "return";
export type Operation = {hunter: Hunter, operation: OperationType, object: Armor | Weapon | Potion, merchant: Merchant};

export class RegisterCollection {
    protected _operations: Operation[] = [];

    constructor() {
        this._operations = [];
    }

    addOperation(newOperation: Operation): void {
        this._operations.push(newOperation);
    }

    get operations(): Operation[] {
        return this._operations;
    }

    get buyOperations(): Operation[] {
        let result: Operation[] = [];
        this._operations.forEach((o) => {
            if (o.operation === "buy") {
                result.push(o);
            }
        });
        return result
    }

    get sellOperations(): Operation[] {
        let result: Operation[] = [];
        this._operations.forEach((o) => {
            if (o.operation === "sell") {
                result.push(o);
            }
        });
        return result
    }

    get returnOperations(): Operation[] {
        let result: Operation[] = [];
        this._operations.forEach((o) => {
            if (o.operation === "return") {
                result.push(o);
            }
        });
        return result
    }

    getHunterOperations(hunter: Hunter): Operation[] {
        let result: Operation[] = [];
        this._operations.forEach((o) => {
            if (o.hunter === hunter) {
                result.push(o);
            }
        });
        return result
    }

    getMerchantOperations(merchant: Merchant): Operation[] {
        let result: Operation[] = [];
        this._operations.forEach((o) => {
            if (o.merchant === merchant) {
                result.push(o);
            }
        });
        return result
    }
}


