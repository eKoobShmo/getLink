import { Injectable } from '@angular/core';
import {isUndefined} from "util";

@Injectable()
export class ValidationService {

  constructor() { }

    restrictNumeric(e) {


        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }

        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input)
    }

    errorInField(field: any) {
        return isUndefined(field) || field == null || field == "";
    }

}
