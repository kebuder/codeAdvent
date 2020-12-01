import { Observable, observable } from "rxjs";
import * as fs from "fs"

export class day1 {
    input = [];
    sumValue = 2020;

    constructor() {
        this.getInput().subscribe(res => {
            this.input = res;
            this.assignment1();
            this.assignment2();
        });
    }

    getInput(): Observable<Array<number>> {
        return new Observable(observable => {
            const file = fs.readFile("./src/day1/day1Input.txt", function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    observable.next(data.toString().split("\n").map(stringValue => +stringValue))
                }
            });
        });
    }

    assignment1() {
        console.log('Day 1, assignment 1!');
        console.time('calculation')
        let found = false;
        for (let index = 0; index < this.input.length; index++) {
            const first = this.input[index];
            if (found) {
                break;
            }
            for (let i = this.input.length; i > 0; i--) {
                const second = this.input[i];
                if (second !== first) {
                    if ((second + first) === this.sumValue) {
                        console.timeEnd('calculation')
                        console.log(first + ' + ' + second + ' = ' + 2020 + ' | answer: ' + first * second)
                        found = true;
                        break;
                    }
                }
            }
        }
    }

    assignment2() {
        console.log('Day 1, assignment 2!');
        console.time('calculation')
        let found = false;
        for (let i1 = 0; i1 < this.input.length; i1++) {
            if (found) {
                break;
            }
            const first = this.input[i1];
            for (let i2 = this.input.length; i2 > 0; i2--) {
                if (found) {
                    break;
                }
                const second = this.input[i2];
                if (second === first) {
                    continue;
                } else if (second + first >= 2020) {
                    continue;
                }
                for (let i3 = 0; i3 < this.input.length; i3++) {
                    const third = this.input[i3];
                    if (first === third || second === third) {
                        break;
                    } else if ((first + second + third) === this.sumValue) {
                        console.timeEnd('calculation')
                        console.log(first + ' + ' + second + ' + ' + third + ' = ' + 2020 + ' | answer: ' + (first * second * third))
                        found = true;
                        break;
                    }
                }
            }
        }
    }

}



new day1();
