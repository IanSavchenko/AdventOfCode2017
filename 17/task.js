let input = 316;

// Part 1
{
    let buf = [0];

    let len = 1;
    let pos = 0;

    while(len < 2018) {        
        pos = (pos + input) % len;

        buf.splice(pos + 1, 0, len);

        len++;        
        pos++;
    }

    let result = buf[pos + 1];
    console.log(`Part 1: ${result}`); // 180
}

// Part 2
{
    let len = 1;
    let pos = 0;

    let result = 0;
    while(len < 50*1000*1000 + 1) {
        pos = (pos + input) % len;

        if (pos == 0) {
            result = len;
        }
      
        len++;
        pos++;
    }

    console.log(`Part 2: ${result}`); // 13326437
}