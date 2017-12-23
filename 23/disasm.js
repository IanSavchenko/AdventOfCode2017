console.time('Execution time');
let a = 1;

let b = 99;
let c = b;

if (a) {
    b *= 100;
    b += 100000;
    c = b;
    c += 17000;
}

let h = 0;

do {
    let f = 1;
    let d = 2;

    // actually, checking if 'b' is a composite number
    do {
        let e = 2;
        do {
            // optimization
            if (d * e > b) {
                break;
            }

            if (d * e == b) {
                f = 0;
                break; // optimization
            }

            e++;            
        } while (e != b);

        d += 1;
    } while (d != b && f); // && f = optimization

    if (f == 0) {
        h++;
    }

    if (b == c) {
        break;
    }

    b += 17;
} while (true);

console.log(`Part 2: ${h}`); // 913
console.timeEnd('Execution time');

// the same thing, but with less cryptic names
{
    console.time('Execution time');
    let num = 99 * 100 + 100000;
    let max = num + 17000;

    let composite = 0;
    while (num <= max) {
        let isPrime = true;

        // checking if num is a result of multiplication
        let a = 2; 
        do {
            b = 2;
            do {
                if (a * b > num) {
                    break;
                }
    
                if (a * b == num) {
                    isPrime = false;
                    break; 
                }
    
                b++;            
            } while (b != num);
    
            a += 1;
        } while (a != num && isPrime);

        if (!isPrime) {
            composite++;
        }

        num += 17;
    }

    console.log(`Part 2 (less cryptic solution): ${composite}`); // 913
    console.timeEnd('Execution time');
}

// shorter/faster
{
    console.time('Execution time');
    let num = 99 * 100 + 100000;
    let max = num + 17000;

    let composite = 0;
    while (num <= max) {
        for (let i = 2, s = Math.sqrt(num); i < s; i++) {
            if (num % i == 0) {
                composite++;
                break;
            }
        }

        num += 17;
    }

    console.log(`Part 2 (shorter/faster solution): ${composite}`); // 913
    console.timeEnd('Execution time');
}