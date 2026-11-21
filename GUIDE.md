# Launch guide: put your portfolio online

Follow these steps in order. Each one takes about 2–10 minutes, and everything here is **free**.

---

## Step 1: Make the contact form send to your Gmail (Web3Forms)

1. Go to **https://web3forms.com**.
2. Under **"Create your Access Key"**, type your email: `nguilimyhamid0727@gmail.com`.
3. Click **Create Access Key**.
4. Open your Gmail. You'll get an email from Web3Forms containing a key like
   `a1b2c3d4-e5f6-7890-abcd-ef1234567890`. Copy it.
5. Open `src/config.js` and paste it here:
   ```js
   export const contactForm = {
     web3formsKey: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // ← your key
   }
   ```
6. Test it: run `npm run dev`, open the site, and send yourself a message from the form.
   You should see **"Message sent ✓"** and get an email within a minute. Check your **Spam** folder the first time.

> This key is meant to be used in websites, so it's safe for it to be in your code.

---

## Step 2: Add your CV (optional, but recruiters love it)

1. Export your CV as a PDF and name it `cv.pdf`.
2. Put it in the `public` folder, so you have `public/cv.pdf`.
3. In `src/config.js` set:
   ```js
   cv: '/cv.pdf',
   ```
   A **"Download CV"** button now appears in the hero and the contact section.

---

## Step 3: Fill in what's still missing (in `src/config.js`)

- [ ] `socials.linkedin`: your LinkedIn profile URL
- [ ] `socials.twitter`: your X profile URL (or leave `''` to hide it)
- [ ] `testimonials`: replace the placeholder quotes with real ones (a lecturer, classmate or client),
      or ask Claude to remove that section
- [ ] `skills`: adjust the percentages so they're honest

---

## Step 4: Put the code on GitHub

1. Go to **https://github.com/new**.
2. Repository name: `portfolio` → **Public** → don't tick any boxes → **Create repository**.
3. Open a terminal in this folder (in VS Code: **Terminal → New Terminal**) and run these lines one by one:
   ```bash
   git init
   git add .
   git commit -m "My portfolio"
   git branch -M main
   git remote add origin https://github.com/nguilimy/portfolio.git
   git push -u origin main
   ```
   If Git asks you to sign in, use your GitHub account.

---

## Step 5: Publish it with Vercel

1. Go to **https://vercel.com** → **Sign Up** → **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find your `portfolio` repository → **Import**.
4. **Project Name:** type `hamid-ahmat`. This makes your address **https://hamid-ahmat.vercel.app**.
   (If that name is taken, pick another and see the note below.)
5. Vercel detects **Vite** automatically. Don't change anything → **Deploy**.
6. After about 1 minute your site is live. 🎉

> **If your address is different** (another name, or your own domain later), open the `.env` file and change
> `VITE_SITE_URL=` to your real address, then push again (Step 6). This keeps the WhatsApp/LinkedIn preview working.

---

## Step 6: Updating the site later

Every time you change something:
```bash
git add .
git commit -m "Update portfolio"
git push
```
Vercel rebuilds and updates your live site automatically within about a minute.

---

## Step 7: Check that everything works

- [ ] Open your site on your **phone** and on a **laptop**
- [ ] Try the **dark/light** toggle (top right)
- [ ] Send a test message through the **contact form**
- [ ] Paste your link into the **LinkedIn Post Inspector** (https://www.linkedin.com/post-inspector/) to check the preview card
- [ ] Send the link to yourself on **WhatsApp**: you should see your photo, name and role

---

## Optional extras

- **Your own domain** (e.g. `hamidahmat.dev`, about $10–15/year): buy it on Namecheap or Cloudflare, then add it
  in Vercel → your project → **Settings → Domains**. Remember to update `VITE_SITE_URL` in `.env`.
- **Visitor statistics:** in Vercel → your project → **Analytics** → **Enable** (free plan available).

---

### Where things are

| I want to change… | File |
|---|---|
| Name, role, email, links, CV, skills, projects, testimonials | `src/config.js` |
| Theme colours | `src/config.js` → `theme` |
| Photos | `src/assets/photo.jpg` (standing) and `src/assets/me.jpg` (seated) |
| Tech logos | `src/logos.js` |
| Link-preview image | `public/og-image.jpg` |
