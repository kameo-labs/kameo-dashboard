
require('dotenv').config({ path: '../.env' });
const axios = require('axios');
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// --- 3. TARGETING REFINEMENT ---
const CITIES = ['Neuilly-sur-Seine', 'Boulogne-Billancourt', 'Levallois-Perret', 'Versailles', 'Saint-Maur-des-Fossés', 'Rueil-Malmaison', 'Courbevoie'];
const JOBS = ['Plombier', 'Serrurier', 'Vitrier', 'Débouchage canalisation'];
const FORBIDDEN_TOOLS = ['intercom', 'crisp', 'drift', 'tawk.to', 'zendesk', 'hubspot', 'whatsapp-widget', 'facebook-chat'];

// --- SUPABASE CLIENT ---
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// --- HELPERS ---
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- CORE SCRAPER ---
async function hunt() {
    console.log("🏹 Kameo Hunter v5: Chameleon Edition...");

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) throw new Error("❌ Missing GOOGLE_PLACES_API_KEY");

    // Launch Browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
    });

    // RUN 3 BATCHES
    for (let i = 0; i < 3; i++) {
        const city = randomItem(CITIES);
        const job = randomItem(JOBS);
        const query = `${job} ${city}`;
        console.log(`\n-----------------------------------`);
        console.log(`🎯 Batch ${i + 1}/3: "${query}"`);
        console.log(`-----------------------------------`);

        await processBatch(query, apiKey, browser, job, city);
    }

    await browser.close();
    console.log("🏁 Patrol Finished.");
}

async function processBatch(query, apiKey, browser, job, city) {
    let places = [];
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params: { query, key: apiKey }
        });
        places = res.data.results || [];
        console.log(`🔎 Found ${places.length} raw results.`);
    } catch (e) {
        console.error("❌ Google API Error:", e.message);
        return;
    }

    for (const place of places) {
        const name = place.name;

        // CHECK A: PROOF OF LIFE
        if (!place.user_ratings_total || place.user_ratings_total < 10) continue;
        if (place.user_ratings_total > 400) continue;
        if (place.rating < 3.5) continue;

        // FETCH DETAILS
        let details = {};
        try {
            const dRes = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
                params: { place_id: place.place_id, fields: 'website,formatted_phone_number,international_phone_number', key: apiKey }
            });
            details = dRes.data.result || {};
        } catch (e) { continue; }

        if (!details.website) continue;

        // CHECK B: TECHNICAL & EXTRACT
        const url = details.website;
        console.log(`   👉 Checking: ${name} (${url})`);

        let page;
        try {
            page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });

            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
            } catch (timeout) {
                console.log("      ⚠️ Timeout/Error loading site -> Skip");
                await page.close();
                continue;
            }

            const content = await page.content();
            const lowerContent = content.toLowerCase();

            if (FORBIDDEN_TOOLS.some(tool => lowerContent.includes(tool))) {
                console.log(`      ❌ Has Competitor Chat -> Skip`);
                await page.close();
                continue;
            }

            let email = extractEmail(content);
            if (!email) {
                try {
                    const contactLink = await page.evaluate(() => {
                        const links = Array.from(document.querySelectorAll('a'));
                        const contact = links.find(l => l.href.includes('contact') || l.href.includes('mentions'));
                        return contact ? contact.href : null;
                    });

                    if (contactLink) {
                        await page.goto(contactLink, { waitUntil: 'domcontentloaded', timeout: 10000 });
                        const contactContent = await page.content();
                        email = extractEmail(contactContent);
                    }
                } catch (e) { }
            }

            if (!email) {
                console.log("      ❌ No Email Found -> Skip");
                await page.close();
                continue;
            }

            console.log(`      📧 Email: ${email}`);

            // Go back to home if we moved
            if (page.url() !== url && !page.url().includes(url.replace('www.', ''))) {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
            }

            // --- CHAMELEON INJECTION ---
            const dominantColor = await page.evaluate(() => {
                // 1. Detect Dominant Color
                const scanTags = ['a', 'button', '.btn', '.button', 'header', 'nav'];
                const colorCounts = {};
                let maxCount = 0;
                let bestColor = '#2563eb'; // Default Blue

                const processElement = (el) => {
                    const style = window.getComputedStyle(el);
                    const bg = style.backgroundColor;
                    // Check opaque backgrounds
                    if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('rgb(255, 255, 255)') && !bg.includes('rgb(0, 0, 0)')) {
                        colorCounts[bg] = (colorCounts[bg] || 0) + 1;
                    }
                };

                scanTags.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => processElement(el));
                });

                Object.entries(colorCounts).forEach(([color, count]) => {
                    if (count > maxCount) {
                        maxCount = count;
                        bestColor = color;
                    }
                });

                return bestColor;
            });

            console.log(`      🎨 Chameleon: Detected Brand Color ${dominantColor}`);

            await page.evaluate((brandColor) => {
                // A. COOKIE MONSTER & SCROLL UNLOCK
                const keywords = ['cookie', 'consent', 'gdpr', 'bandeau', 'tarteaucitron', 'didomi', 'onetrust', 'rgpd', 'banner'];
                document.querySelectorAll('*').forEach(el => {
                    if ((el.id && keywords.some(k => el.id.toLowerCase().includes(k))) ||
                        (el.className && typeof el.className === 'string' && keywords.some(k => el.className.toLowerCase().includes(k)))) {
                        el.remove();
                    }
                });
                document.querySelectorAll('div, section, aside, nav').forEach(el => {
                    const style = window.getComputedStyle(el);
                    if (style.position === 'fixed' && style.bottom === '0px' && el.offsetHeight < 300) el.remove();
                });
                document.body.style.setProperty('overflow', 'visible', 'important');
                document.documentElement.style.setProperty('overflow', 'visible', 'important');

                // B. INJECT MOCK WIDGET (Dynamic Color)
                const container = document.createElement('div');
                container.id = 'kameo-mock-widget';
                container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 350px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); display: flex; flex-direction: column; z-index: 2147483647 !important; border: 1px solid #e5e7eb; font-family: sans-serif; overflow: hidden; opacity: 0; transform: translateY(20px); transition: all 0.5s ease-out;';

                const header = document.createElement('div');
                // Use brandColor for background
                header.style.cssText = `background: ${brandColor}; color: white; padding: 16px; font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-family: sans-serif;`;
                header.innerHTML = '<div style="width: 10px; height: 10px; background: #4ade80; border-radius: 50%;"></div> Assistant ' + (document.title.split('-')[0].trim() || 'Site');

                const body = document.createElement('div');
                body.style.cssText = 'flex: 1; padding: 20px; background: #f8fafc; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; font-family: sans-serif;';

                const msgBot = document.createElement('div');
                msgBot.style.cssText = 'background: white; padding: 14px; border-radius: 12px 12px 12px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-size: 14px; color: #1f2937; line-height: 1.5; max-width: 90%; border: 1px solid #f1f5f9; font-family: sans-serif;';
                msgBot.innerHTML = 'Bonjour 👋, je peux vous faire une estimation de prix immédiate. <br><strong>Quel est votre besoin ?</strong>';

                const fakeInput = document.createElement('div');
                fakeInput.style.cssText = 'padding: 16px; border-top: 1px solid #e5e7eb; background: white; font-family: sans-serif;';
                fakeInput.innerHTML = '<div style="width: 100%; height: 40px; border: 1px solid #e2e8f0; border-radius: 20px; background: #f8fafc; display: flex; align-items: center; padding-left: 15px; color: #94a3b8; font-size: 14px;">Écrivez votre message...</div>';

                body.appendChild(msgBot);
                container.appendChild(header);
                container.appendChild(body);
                container.appendChild(fakeInput);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }, 100);
            }, dominantColor);

            console.log("      📸 Taking Snapshot...");
            await sleep(3000);

            const screenshotBuffer = await page.screenshot({ encoding: 'base64' });
            await page.close();

            console.log("      ☁️ Uploading Screenshot...");
            const fileName = `ghost_${place.place_id}.png`;
            const { error: uploadError } = await supabase.storage
                .from('prospects')
                .upload(fileName, Buffer.from(screenshotBuffer, 'base64'), { upsert: true, contentType: 'image/png' });

            if (uploadError) console.log("      ⚠️ Upload Error from Supabase:", uploadError.message);

            let screenshotUrl = null;
            if (!uploadError) {
                const { data: { publicUrl } } = supabase.storage.from('prospects').getPublicUrl(fileName);
                screenshotUrl = publicUrl + `?t=${Date.now()}`;
            }

            console.log("      💾 Saving to DB...");
            const { error: dbError } = await supabase.from('kameo_prospects').upsert({
                place_id: place.place_id,
                business_name: name,
                business_type: job,
                city: city,
                url: url,
                rating: place.rating,
                rating_count: place.user_ratings_total,
                phone: details.formatted_phone_number || details.international_phone_number,
                email: email,
                hunt_status: 'qualified',
                demo_screenshot_url: screenshotUrl
            }, { onConflict: 'place_id' });

            if (!dbError) {
                console.log(`      ✅ SAVED!`);
            } else {
                console.error(`      ❌ DB Upsert Error: ${JSON.stringify(dbError)}`);
            }

        } catch (err) {
            console.error(`      ❌ Error: ${err.message}`);
            if (page) await page.close().catch(() => { });
        }
    }
}

function extractEmail(html) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const matches = html.match(emailRegex) || [];
    const blacklist = ['sentry', 'wix', 'wordpress', 'react', 'noreply', 'domain', 'sentry.io', 'example', '2x.png', '.jpg', '.js', '.css', 'bootstrap', 'google', 'cloudflare', 'fontawesome', 'core'];
    const valid = matches.filter(e => !blacklist.some(b => e.toLowerCase().includes(b)));
    if (valid.length === 0) return null;
    return valid.find(e => e.includes('contact') || e.includes('info') || e.includes('devis')) || valid[0];
}

hunt();
