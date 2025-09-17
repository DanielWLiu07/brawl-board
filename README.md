# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BrawlBoard

**Multi-person collaborative Brawl Stars planning app** — built with React (client), Node.js (server), and WebSockets for real-time collaboration. Plan maps, draft teams, annotate strategies, and coordinate with teammates in live sessions.

---

## Key Features
- Real-time multi-user collaboration via WebSockets (live updates for map pins, team drafts, and chat)  
- Interactive map editor for planning spawns, lanes, and positioning  
- Drag-and-drop draft board for brawler/team selection and counters  
- Persistent sessions: save/load boards and session history (server-side)  
- Lightweight chat and user presence indicators (who’s online / who’s editing)  
- Simple role system (host, editor, viewer) for session control

---

## Tech Stack
- **Client:** React (Vite), CSS  
- **Server:** Node.js + Express (or Fastify)  
- **Realtime:** WebSocket
- **Data store:**  
- **Build & run:** npm