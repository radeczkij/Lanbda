console.time("Time passed:");
const fs = require("fs");

async function uniqueValues() {
  try {
    const unique = new Set();
    for (let i = 0; i < 20; i++) {
      const duplicates = await fs.readFileSync(
        `./words/2kk/out${i}.txt`,
        "utf-8"
      );
      const words = duplicates.split("\n");
      for (const word of words) {
        unique.add(word);
      }
    }

    console.log(`Unique values in all files: ${unique.size}`);
  } catch {
    (err) => {
      if (err) console.log(err.message);
    };
  }
}

async function isInEveryFile() {
  try {
    let result = [];
    for (let i = 0; i < 20; i++) {
      const duplicates = await fs.readFileSync(
        `./words/2kk/out${i}.txt`,
        "utf-8"
      );
      const unique = new Set(duplicates.split("\n"));
      result.push(unique);
    }
    const uniqueElements = new Set(result.reduce((a, c) => [...a, ...c], []));
    let inEveryFile = [];
    await uniqueElements.forEach((uniqueEl) => {
      let counter = 0;
      result.forEach((el) => {
        if (el.has(uniqueEl)) {
          counter++;
          if (counter === 20) {
            inEveryFile.push(uniqueEl);
          }
        }
      });
    });
    console.log(
      `Number of unique combinations for 20 files: ${inEveryFile.length}`
    );
  } catch {
    (err) => {
      if (err) console.log(err.message);
    };
  }
}

async function isInTenFiles() {
  try {
    let result = [];
    for (let i = 0; i < 20; i++) {
      const duplicates = await fs.readFileSync(
        `./words/2kk/out${i}.txt`,
        "utf-8"
      );
      const unique = new Set(duplicates.split("\n"));
      result.push(unique);
    }
    const uniqueElements = new Set(result.reduce((a, c) => [...a, ...c], []));
    let inEveryFile = [];
    await uniqueElements.forEach((uniqueEl) => {
      let counter = 0;
      result.forEach((el) => {
        if (el.has(uniqueEl)) {
          counter++;
          if (counter === 10) {
            inEveryFile.push(uniqueEl);
          }
        }
      });
    });
    console.log(
      `Number of unique combinations for 10 files: ${inEveryFile.length}`
    );
  } catch {
    (err) => {
      if (err) console.log(err.message);
    };
  }
}
uniqueValues();
isInEveryFile();
isInTenFiles();
console.timeEnd("Time passed:");
