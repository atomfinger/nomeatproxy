const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const yaml = require("js-yaml");

const script = fs.readFileSync(path.join(__dirname, "..", "src", "script.js"), "utf8");

const translationsDir = path.join(__dirname, "..", "src", "_data", "translations");
const locales = fs
	.readdirSync(translationsDir)
	.filter((file) => /\.ya?ml$/.test(file))
	.map((file) => file.replace(/\.ya?ml$/, ""));

function createShareButton(t, locale) {
	t.mock.timers.enable({ apis: ["setTimeout"] });
	const translation = yaml.load(fs.readFileSync(
		path.join(__dirname, "..", "src", "_data", "translations", `${locale}.yaml`),
		"utf8"
	));
	const url = `https://nomeatproxy.com/${locale === "en" ? "" : `${locale}/`}`;
	const label = { textContent: translation.share.copyLabel };
	const classes = new Set();
	const copiedUrls = [];
	let clickHandler;
	const button = {
		querySelector: () => label,
		getAttribute: (name) => ({
			"data-url": url,
			"data-copied-label": translation.share.copiedLabel,
		})[name],
		classList: {
			add: (name) => classes.add(name),
			remove: (name) => classes.delete(name),
		},
		addEventListener: (event, handler) => {
			assert.equal(event, "click");
			clickHandler = handler;
		},
	};
	vm.runInNewContext(script, {
		document: {
			querySelectorAll: () => [],
			getElementById: (id) => id === "share-button" ? button : null,
		},
		window: { addEventListener() {} },
		navigator: {
			clipboard: {
				writeText: async (value) => { copiedUrls.push(value); },
			},
		},
		setTimeout,
		clearTimeout,
	}, { filename: "src/script.js" });
	return {
		label,
		classes,
		copiedUrls,
		url,
		copyLabel: translation.share.copyLabel,
		copiedLabel: translation.share.copiedLabel,
		async click() {
			clickHandler();
			await Promise.resolve();
		},
	};
}

for (const locale of locales) {
	test(`${locale}: copies the page URL, shows the translated label, and restores it after 1800 ms`, async (t) => {
		const share = createShareButton(t, locale);
		await share.click();

		assert.deepEqual(share.copiedUrls, [share.url]);
		assert.equal(share.label.textContent, share.copiedLabel);
		assert.ok(share.classes.has("copied"));

		t.mock.timers.tick(1799);
		assert.equal(share.label.textContent, share.copiedLabel);
		assert.ok(share.classes.has("copied"));
		t.mock.timers.tick(1);
		assert.equal(share.label.textContent, share.copyLabel);
		assert.ok(!share.classes.has("copied"));
	});
}

test("clicking again keeps the copied label for 1800 ms after the latest copy", async (t) => {
	const share = createShareButton(t, "ko");
	await share.click();
	t.mock.timers.tick(1000);
	await share.click();
	assert.deepEqual(share.copiedUrls, [share.url, share.url]);

	t.mock.timers.tick(800);
	assert.equal(share.label.textContent, share.copiedLabel);
	assert.ok(share.classes.has("copied"));
	t.mock.timers.tick(999);
	assert.equal(share.label.textContent, share.copiedLabel);
	t.mock.timers.tick(1);
	assert.equal(share.label.textContent, share.copyLabel);
	assert.ok(!share.classes.has("copied"));
});
