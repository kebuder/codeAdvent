import { Observable } from "rxjs";
import * as fs from "fs"

export class day3 {

    gridArray = Array<Array<string>>();

    constructor() {
        this.getInput().subscribe(res => {
            this.gridArray = res;
            this.assignment1();
            this.assignment2();
        });
    }

    assignment1() {
        console.log('Day 3, assignment 1!');
        console.time('calculation')
        const awnser = this.getTreeHitsFromSlope(3, 1);

        console.timeEnd('calculation')
        console.log(awnser);
    }


    assignment2() {
        console.log('Day 3, assignment 2!');
        console.time('calculation')
       
        const slope1 = this.getTreeHitsFromSlope(1, 1);
        const slope2 = this.getTreeHitsFromSlope(3, 1);
        const slope3 = this.getTreeHitsFromSlope(5, 1);
        const slope4 = this.getTreeHitsFromSlope(7, 1);
        const slope5 = this.getTreeHitsFromSlope(1, 2);

        const awnser = slope1 * slope2 * slope3 * slope4 * slope5;
        console.timeEnd('calculation')
        console.log(awnser);
    }

    getTreeHitsFromSlope(right: number, down: number): number {
        let treeHits = 0;
        let x = 0;
        let y = 0;

        while (y < this.gridArray.length) {
            if (this.getFromPosition(x, y) === '#') {
                treeHits++;
            }
            x += right;
            y += down;
        }
        return treeHits;
    }

    getFromPosition(x: number, y: number) {
        x = x % this.gridArray[0].length;
        return this.gridArray[y][x];
    }

    getInput(): Observable<Array<Array<string>>> {
        return new Observable(observable => {
            fs.readFile("./src/day3/day3Input.txt", (err, data) => {
                if (err) {
                    console.log(err);
                    observable.error(err);
                } else {
                    let gridArray = Array<Array<string>>();
                    const input = data.toString().split('\n');
                    input.forEach((position, index) => {
                        gridArray[index] = position.replace('\r', '').split('');
                    });
                    observable.next(gridArray);
                    observable.complete();
                }
            });
        });
    }

}