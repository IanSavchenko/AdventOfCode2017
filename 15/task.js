// PART 1
{
    let g1 = 783;
    let g2 = 325;

    let result = 0;
    let times = 40*1000*1000;
    while (times-- > 0) {
        g1 *= 16807;
        g2 *= 48271;

        g1 = g1 % 2147483647;
        g2 = g2 % 2147483647;

        if ((g1 & 0xFFFF) == (g2 & 0xFFFF)) {
            result++;
        }
    }

    console.log(`Part 1: ${result}`); // 650
}

// PART 2
{
    let g1 = 783;
    let g2 = 325;

    let g1List = [];
    let g2List = [];

    let times = 5*1000*1000;
    while (g1List.length < times || g2List.length < times) {
        g1 *= 16807;
        g2 *= 48271;

        g1 = g1 % 2147483647;
        g2 = g2 % 2147483647;

        if (g1 % 4 == 0) {
            g1List.push(g1);
        }

        if (g2 % 8 == 0) {
            g2List.push(g2);
        }
    }

    let result = 0;
    let i = 0;
    while (i < g1List.length && i < g2List.length) {
        if ((g1List[i] & 0xFFFF) == (g2List[i] & 0xFFFF)) {
            result++;
        }

        i++;
    }

    console.log(`Part 2: ${result}`); // 336
}

// Note: could have been done with generators, but they appeared to be much slower