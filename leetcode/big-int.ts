/*

a + b
(-a) + b => b - a
a + (-b) => a - b
(-a) + (-b) => -(a + b)

two fundamental operations:
- add two positive numbers
- subtract two positive numbers

*/

class MyBigInt {
    value: string;

    constructor(value: string) {
        if (!value) {
            throw new Error('Empty string is not valid');
        }

        this.value = value;
    }

    add(b: MyBigInt): MyBigInt {
        const a = this;

        const aIsNegative = a.isNegative();
        const bIsNegative = b.isNegative();

        // a and b are both positive
        if (!aIsNegative && !bIsNegative) {
            const aArr = a.value.split('');
            const bArr = b.value.split('');

            let aPtr = aArr.length-1;
            let bPtr = bArr.length-1;
            let carry = 0;
            let out: string[] = [];

            while (aPtr >= 0 || bPtr >= 0 || carry > 0) {
                const aVal = aPtr >= 0 ? +aArr[aPtr] : 0;
                const bVal = bPtr >= 0 ? +bArr[bPtr] : 0;

                let val = aVal + bVal + carry; // could be up to 19
                carry = Math.floor(val/10);
                val -= carry * 10;

                out.push(`${val}`);
                aPtr--;
                bPtr--;
            }
            out.reverse();
            return new MyBigInt(out.join(''));
        } else if (aIsNegative && !bIsNegative) {  // a is negative and b is positive
            return b.subtract(a.getPositive());
        } else if (!aIsNegative && bIsNegative) { // a is positive and b is negative
            return a.subtract(b.getPositive());
        } else { // a and b are both negative
            const aPos = a.getPositive();
            const bPos = b.getPositive();
            const newVal = aPos.add(bPos);
            return new MyBigInt(`-${newVal.value}`);
        }
    }

    subtract(b: MyBigInt): MyBigInt {
        const a = this;

        const aIsNegative = a.isNegative();
        const bIsNegative = b.isNegative();

        if (!aIsNegative && !bIsNegative) {
            if (b.isGreaterThan(a)) {
                return new MyBigInt(`-${b.subtract(a).toString()}`);
            }

            const aArr = a.value.split('');
            const bArr = b.value.split('');

            let aPtr = aArr.length-1;
            let bPtr = bArr.length-1;
            let borrow = 0;
            let out: string[] = [];

            while (aPtr >= 0 || bPtr >= 0 || borrow > 0) {
                const aVal = aPtr >= 0 ? +aArr[aPtr] : 0;
                const bVal = bPtr >= 0 ? +bArr[bPtr] : 0;

                let val = aVal - bVal - borrow; // could be as low as -10
                borrow = val < 0 ? 1 : 0;
                val += borrow * 10;

                out.push(`${val}`);
                aPtr--;
                bPtr--;
            }

            while (out[out.length-1] === '0') {
                out.pop();
            }

            out.reverse();
            return new MyBigInt(out.join(''));
        } else if (aIsNegative && !bIsNegative) { // -a - b => -(a + b)
            const aPos = a.getPositive();
            const bPos = b.getPositive();
            const newVal = aPos.add(bPos);
            return new MyBigInt(`-${newVal.value}`);
        } else if (!aIsNegative && bIsNegative) { // a - (-b) => a + b
            return a.add(b.getPositive());
        } else { // -a - (-b) => -(a - b)
            const aPos = a.getPositive();
            const bPos = b.getPositive();
            const newVal = aPos.subtract(bPos);
            if (newVal.isNegative()) {
                return new MyBigInt(newVal.value.slice(1));
            } else {
                return new MyBigInt(`-${newVal.value}`);
            }
        }
    }

    toString(): string {
        return this.value;
    }

    isNegative(): boolean {
        return this.value[0] === '-';
    }

    getPositive(): MyBigInt {
        if (!this.isNegative) {
            return this;
        }
        return new MyBigInt(this.value.slice(1));
    }

    isGreaterThan(b: MyBigInt): boolean {
        const a = this;

        if (a.value === b.value) {
            return false;
        } else if (a.isNegative() && !b.isNegative()) {
            return false;
        } else if (!a.isNegative() && b.isNegative()) {
            return true;
        };
        
        if (!a.isNegative() && !b.isNegative()) {
            if (a.value.length !== b.value.length) {
                return a.value.length > b.value.length;
            }
            for (let i = 0; i < a.value.length; i++) {
                if (a.value[i] !== b.value[i]) {
                    return +a.value[i] > +b.value[i];
                }
            }
        } else {
            if (a.value.length !== b.value.length) {
                return a.value.length < b.value.length;
            }
            for (let i = 0; i < a.value.length; i++) {
                if (a.value[i] !== b.value[i]) {
                    return +a.value[i] <= +b.value[i];
                }
            }
        }

        return false;
    }
}

for (let i = 0; i < 100; i++) {
    const aVal = Math.round(Math.random()*2000-1000);
    const bVal = Math.round(Math.random()*2000-1000);

    const a = new MyBigInt(`${aVal}`);
    const b = new MyBigInt(`${bVal}`);

    if (a.add(b).toString() !== `${aVal + bVal}`) {
        console.log(`found error, ${aVal} + ${bVal}, expected: ${aVal + bVal}, actual: ${a.add(b).toString()}`);
    }
}
