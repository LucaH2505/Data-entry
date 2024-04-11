const readline = require('readline');
const fs = require('fs');

function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

function writeToCSV(data) {
    const csvHeader = 'Datum, Uren gewerkt, Project\n';

    fs.appendFile('urenregistratie.csv', data, err => {
        if (err) throw err;
        console.log('De gegevens zijn toegevoegd aan urenregistratie.csv');
    });
}

async function main() {
    console.log('Data entry voor het urenregistratie systeem\n');

    const datum = await promptUser('Datum (dd-mm-jjjj): ');
    const urenGewerkt = await promptUser('Uren gewerkt: ');
    const project = await promptUser('Project: ');

    const data = `${datum},${urenGewerkt},${project}\n`;

    writeToCSV(data);
}

main();
