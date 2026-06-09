# VERCEL.md

## Goal

Deploy this static Website.md site to Vercel.

## Two-Step Path

### 1. Push to GitHub

Create a GitHub repo, then push this folder.

```bash
git init
git add .
git commit -m "Initial Website.md site"
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

Use the user's actual GitHub repo URL.

### 2. Import in Vercel

In Vercel:

```txt
New Project
Import GitHub repo
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: /
Deploy
```

After deploy, give the user the Vercel preview URL.

## Custom Domain

In Vercel:

```txt
Project Settings
Domains
Add domain
```

Use the DNS records Vercel shows. Common records:

```txt
A      @      216.198.79.1
CNAME  www    cname.vercel-dns.com
```

After DNS updates, verify:

```bash
curl -I https://example.com/
curl -I https://www.example.com/
```

## Agent Response Template

After a successful deploy, tell the user:

```txt
Your site is live:
https://your-vercel-url.vercel.app/

To connect your domain, add it in Vercel under Project Settings -> Domains and copy the DNS records Vercel gives you.
```
