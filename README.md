# Application Setup and Run Guide

## Step 1: Setup and Run `packages/root`
```bash
cd packages/root
pnpm install
pnpm install concurrently --save-dev
pnpm run build
pnpm run dev
```

##  Step 2: Setup and Run packages/host
```bash
cd ../host
pnpm install
pnpm run dev
```

## Step 3: Access the Application
Open your browser and navigate to:

http://localhost:5000/
You should see the application running.
