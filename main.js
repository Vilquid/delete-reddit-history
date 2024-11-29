import puppeteer from 'puppeteer';
import axios from 'axios';



const puppeteer_executable_path = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser';
const reddit_username = process.env.REDDIT_USERNAME;
const reddit_password = process.env.REDDIT_PASSWORD;

let errors = 0;
while (errors < 3)
{
	try
	{
		await deleteRedditHistory(puppeteer_executable_path, reddit_username, reddit_password);
		process.exit(1);
	}
	catch (error)
	{
		errors++;
		// await sleep(1000 * 60 * 2);
		// await sendToList(`Reprise du scraping à ${await getCurrentTime()}`, liste_logs, false);
	}
}

process.exit(1);

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

async function deleteRedditHistory(puppeteer_executable_path, reddit_username, reddit_password)
{
	console.log('Dans la fonction deleteRedditHistory');

	let browser;
	let page;

	console.log('Aller sur reddit');
	browser = await puppeteer.launch({
		executablePath: puppeteer_executable_path,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars', '--disable-extensions', '--disable-breakpad', '--disable-sync'], // '--incognito',
		protocolTimeout: 60000,
	});

	page = await browser.newPage();
	await page.goto('https://www.reddit.com/');
	console.log(page);
	// sleep a random time
	await sleep(getRandomArbitrary(1000, 5000));

	console.log('Cliquer sur le bouton de connexion');
	await page.click('#login-button');
	await sleep(getRandomArbitrary(1000, 5000));

	console.log('Entrer les identifiants');
	await page.type('#login-username', reddit_username, {delay: 120});
	await sleep(getRandomArbitrary(1000, 5000));
	await page.type('#login-password', reddit_password, {delay: 120});

	console.log('Ouvrir le menu de profil');
	await sleep(getRandomArbitrary(1000, 5000));

	console.log('Cliquer sur Settings');
	await sleep(getRandomArbitrary(1000, 5000));

	console.log('Cliquer sur Privacy');
	await sleep(getRandomArbitrary(1000, 5000));



	console.log('Scroller tout en bas');
	await sleep(getRandomArbitrary(1000, 5000));



	console.log('Cliquer sur Clear history');
	await sleep(getRandomArbitrary(1000, 5000));


	await browser.close();

}

async function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}
