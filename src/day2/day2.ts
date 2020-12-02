import { Observable } from "rxjs";
import * as fs from "fs"
import * as util from 'util'

export class day2 {
    input = [];
    policyMap = [];
    regexTemplate = '^[^%s]*(\%s[^%s]*){%s}$'

    constructor() {
        this.getInput().subscribe(() => {
            this.assignment1();
            this.assignment1Version2();
            this.assignment2();
        });
    }

    assignment1() {
        let correct = 0;
        console.log('Day 2, assignment 1!');
        console.time('calculation')
        this.input.forEach((password, index) => {
            const char = this.policyMap[index].key;
            const amount = this.policyMap[index].value;
            const regex = util.format(this.regexTemplate, char, char, char, amount)
            if (new RegExp(regex).test(password)) {
                correct++;
            };
        });
        console.log(correct);
        console.timeEnd('calculation')
    }

    assignment1Version2() {
        let correct = 0;
        console.log('Day 2, assignment 1! v2');
        console.time('calculation')
        this.input.forEach((password: string, index) => {
            const char = this.policyMap[index].key;
            const amountArray = this.policyMap[index].value.split(',');
            const amount = password.split(char).length - 1;

            if (amount >= amountArray[0] && amount <= amountArray[1]) {
                correct++;
            }
        });
        console.timeEnd('calculation')
        console.log(correct);
    }

    assignment2() {
        let correct = 0;
        console.log('Day 2, assignment 2!');
        console.time('calculation')
        this.input.forEach((password: string, index) => {
            const char = this.policyMap[index].key;
            const amountArray = this.policyMap[index].value.split(',');
            
            if (password.charAt(amountArray[0] - 1) === char) {
                if (password.charAt(amountArray[1] - 1) !== char) {
                    correct++;
                }
            } else{
                if (password.charAt(amountArray[1] - 1) === char) {
                    correct++;
                }
            }

        });
        console.timeEnd('calculation')
        console.log(correct);
    }

    getInput(): Observable<void> {
        return new Observable(observable => {
            const file = fs.readFile("./src/day2/day2Input.txt", (err, data) => {
                if (err) {
                    console.log(err);
                    observable.error(err);
                } else {
                    const input = data.toString().split(/[\n,\r, ]+/);
                    const position = 0;

                    for (let i = 0; i < input.length; i += 3) {
                        const amount = input[i].replace('-', ',');
                        const letter = input[i + 1].replace(':', '');;
                        const password = input[i + 2];
                        this.policyMap.push(new KeyValue(letter, amount));
                        this.input.push(password);
                    }
                    observable.next();
                    observable.complete();
                }
            });
        });
    }

}

export class KeyValue {

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    key: string;
    value: string;
}