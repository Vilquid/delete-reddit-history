import puppeteer from 'puppeteer';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from "node:fs";


const puppeteer_executable_path = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser';
const reddit_username = process.env.REDDIT_USERNAME;
const reddit_password = process.env.REDDIT_PASSWORD;

let errors = 0;
while (errors < 1)
{
	try
	{
		await deleteRedditHistory(puppeteer_executable_path, reddit_username, reddit_password);
		process.exit(1);
	}
	catch (error)
	{
		process.exit(1);
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
	let browser;
	let page;

	console.log('Aller sur reddit');
	browser = await puppeteer.launch({
		executablePath: puppeteer_executable_path,
		args: ['--no-sandbox', '--disable-setuid-sandbox'], // '--incognito',
		protocolTimeout: 60000,
	});

	page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
	await page.goto('https://www.reddit.com/',{ waitUntil: 'networkidle2' });
	await sleep(getRandomArbitrary(1000, 5000));

	console.log('Cliquer sur le bouton de connexion');
	try {
		await sleep(5000);
		const button = await page.evaluate(() => {
			return document.evaluate("//button[contains(., 'Log In')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		});
		if (button) {
			await button.click();
			console.log('Le bouton a été cliqué avec succès.');
		}
		await page.screenshot({
			path: 'reddit.png'
		});
	} catch (error) {
		console.error('Erreur lors du clic sur le bouton de connexion:', error);
		await browser.close();
		return;
	}
	// try {
	// 	// /html/body/shreddit-app/reddit-header-large/reddit-header-action-items/header/nav/div[3]/span[4]/faceplate-tracker/faceplate-tooltip/a/span/span
	// 	// await page.click('#login-button');
	// 	// await page.locator('/html/body/shreddit-app/reddit-header-large/reddit-header-action-items/header/nav/div[3]/span[4]/faceplate-tracker/faceplate-tooltip/a/span/span').click();
	// 	const selector = '#login-button > span:nth-child(1)';
	//
	// 	// Attendre que le sélecteur soit présent et visible dans le DOM
	// 	await page.waitForSelector(selector, { visible: true, timeout: 60000 });
	//
	// 	await sleep(getRandomArbitrary(1000, 5000));
	//
	// 	// Récupérer l'élément
	// 	const button = await page.$(selector);
	// 	if (button) {
	// 		// Cliquer sur l'élément
	// 		await button.click();
	// 		console.log('Le bouton a été cliqué avec succès.');
	// 	} else {
	// 		console.log('Élément non trouvé avec le sélecteur CSS fourni.');
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	await browser.close
	// 	return;
	// }

	// await sleep(getRandomArbitrary(1000, 5000));
	//
	// console.log('Entrer les identifiants');
	// console.log(reddit_username);
	// console.log(reddit_password);
	// await page.type('#login-username', reddit_username, {delay: 120});
	// await sleep(getRandomArbitrary(1000, 5000));
	// await page.type('#login-password', reddit_password, {delay: 120});
	//
	// console.log('Cliquer sur le bouton de connexion');
	// await page.click('.login');
	// await sleep(getRandomArbitrary(5000, 6000));
	//
	// console.log('Ouvrir le menu de profil');
	// await page.click('.-scale-x-100 > div:nth-child(3) > svg:nth-child(1)');
	// await sleep(getRandomArbitrary(1000, 5000));
	//
	// console.log('Cliquer sur Settings');
	// await sleep(getRandomArbitrary(1000, 5000));
	//
	// console.log('Cliquer sur Privacy');
	// await sleep(getRandomArbitrary(1000, 5000));
	//
	//
	//
	// console.log('Scroller tout en bas');
	// await sleep(getRandomArbitrary(1000, 5000));
	//
	//
	//
	// console.log('Cliquer sur Clear history');
	// await sleep(getRandomArbitrary(1000, 5000));


	await browser.close();

}

async function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}
