Vercel deployment guide for this project

Structure expected by these files
├─ shared/                 # contains schema.ts
├─ client/                 # Vite app
│  ├─ index.html
│  └─ src/...
├─ api/                    # Vercel Serverless Functions (add this folder)
│  └─ contact.ts           # POST /api/contact
├─ package.json            # already includes dependencies like zod
└─ vercel.json

Steps
1) Copy the 'api' folder and 'vercel.json' into the repository root, next to 'client' and 'shared'.
2) Push to GitHub/GitLab.
3) In Vercel:
   - Import the repo.
   - Root Directory: repository root.
   - Build Command: npm --prefix client ci && npm --prefix client run build
   - Output Directory: client/dist
   - Node.js Version: 20
4) Deploy. The SPA will be served from client/dist. The form posts to /api/contact.
5) Optional email sending: replace the console.log in api/contact.ts with a call to your provider.

Notes
- No Express server is needed on Vercel. The static client is built by Vite. The API runs as a serverless function.
- The client already posts to '/api/contact', so no frontend changes are required.
