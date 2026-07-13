# simple thoughts — Eleventy + Decap CMS

Your blog, rebuilt as a real static site so you can write posts from a
browser instead of hand-editing HTML. The design is unchanged — same CSS,
same layout, same everything. What changed is *how content gets in*:

- Each post is now a Markdown file in `src/posts/`.
- `/admin` is a content editor (Decap CMS) where you write a post, hit
  **Publish**, and it commits the Markdown file to GitHub for you.
- Netlify rebuilds the site automatically every time something is published.

No database, no server to maintain, no monthly CMS fee.

## 1. Try it locally (optional but recommended)

```bash
npm install
npm run start
```

This runs Eleventy's dev server at `http://localhost:8080`. Edit anything
in `src/`, save, and the browser reloads automatically.

To just build the static files without a server:

```bash
npm run build
```

Output goes to `_site/` — that's the folder that eventually gets deployed.

## 2. Push this project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new **empty** repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

## 3. Deploy on Netlify (free)

1. Go to [app.netlify.com](https://app.netlify.com) and sign up/log in with GitHub.
2. Click **Add new site → Import an existing project**, pick your repo.
3. Build settings should auto-fill from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Click **Deploy site**. In a minute or two you'll have a live URL like
   `https://your-site-name.netlify.app`.

## 4. Turn on the CMS login (Netlify Identity + Git Gateway)

This is the one-time step that lets `/admin` actually save posts back to GitHub.

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity**.
2. Under Identity settings, set **Registration** to **Invite only** (so
   random people can't sign up and edit your blog).
3. Still under Identity, go to **Services → Git Gateway** and click **Enable Git Gateway**.
   This lets Netlify Identity users publish to your GitHub repo without
   needing their own GitHub account or personal access token.
4. Go to the **Identity** tab at the top of your site dashboard and
   **Invite a user** — invite yourself with your email. You'll get an
   email with a link to set a password.

## 5. Start writing

Visit `https://your-site-name.netlify.app/admin`, log in, and you'll see
a **Posts** collection with a **New Post** button — title, date, tags,
featured image, excerpt, and a rich text body, all in a form. Hit
**Publish now** and Netlify rebuilds your live site within a minute.

There's also an **About page** entry in the CMS so you can edit your
bio, photo, and links without touching code.

## Editing the design

Everything visual still lives in plain files, same as before:

- `src/assets/css/style.css` — all styling
- `src/_includes/base.njk` — shared header/footer/nav
- `src/_includes/post.njk` — the single-article layout
- `src/index.njk`, `src/about.njk`, `src/categories.njk` — page templates

## Replacing the placeholder images

Posts currently point at generated placeholder SVGs in
`src/assets/images/`. Upload real photos through the CMS's image field
(they'll land in that same folder), or drop files in manually and update
the `image:` field in a post's front matter.
