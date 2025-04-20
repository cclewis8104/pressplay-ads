// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// PressPlay Full Admin Dashboard
// Built with React + TailwindCSS (no shadcn/ui)
// Features: Campaigns, Creatives, Placements, Assignments, Analytics

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [creatives, setCreatives] = useState<Array<{ id: string; name: string; imageUrl: string; clickUrl: string }>>([]);
  const [placements, setPlacements] = useState<Array<{ id: string; name:string; description: string}>>([]);
  const [campaigns, setCampaigns] = useState<Array<{ id: string; name: string; status: string}>>([]);
  const [assignments, setAssignments] = useState([]);

  const [newCreative, setNewCreative] = useState({ id: '', name: '', imageUrl: '', clickUrl: '' });
  const [newPlacement, setNewPlacement] = useState({ id: '', name: '', description: '' });
  const [newCampaign, setNewCampaign] = useState({ name: '', status: 'active' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [c1, p1, c2, a1] = await Promise.all([
      fetch('/v1/creatives').then(r => r.json()),
      fetch('/v1/placements').then(r => r.json()),
      fetch('/v1/campaigns').then(r => r.json()),
      fetch('/v1/assignments').then(r => r.json()),
    ]);
    setCreatives(c1);
    setPlacements(p1);
    setCampaigns(c2);
    setAssignments(a1);
  };

  const handleCreativeSubmit = async () => {
    await fetch('/v1/creatives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCreative),
    });
    setNewCreative({ id:'', name: '', imageUrl: '', clickUrl: '' });
    fetchData();
  };

  const handlePlacementSubmit = async () => {
    await fetch('/v1/placements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlacement),
    });
    setNewPlacement({ id: '', name: '', description: '' });
    fetchData();
  };

  const handleCampaignSubmit = async () => {
    await fetch('/v1/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCampaign),
    });
    setNewCampaign({ name: '', status: 'active' });
    fetchData();
  };

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">🎛️ PressPlay Admin Dashboard</h1>

      {/* Creatives Section */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📁 Creatives</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Creative Name"
            value={newCreative.name}
            onChange={e => setNewCreative({ ...newCreative, name: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Image URL"
            value={newCreative.imageUrl}
            onChange={e => setNewCreative({ ...newCreative, imageUrl: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Click URL"
            value={newCreative.clickUrl}
            onChange={e => setNewCreative({ ...newCreative, clickUrl: e.target.value })}
          />
          <button onClick={handleCreativeSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add Creative</button>
        </div>
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th>Preview</th>
              <th>Click URL</th>
            </tr>
          </thead>
          <tbody>
            {creatives.map(c => (
              <tr key={c.id} className="border-t">
                <td className="py-2">{c.name}</td>
                <td><img src={c.imageUrl} alt={c.name} className="h-12" /></td>
                <td>{c.clickUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Placements Section */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📌 Placements</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Placement ID"
            value={newPlacement.id}
            onChange={e => setNewPlacement({ ...newPlacement, id: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Description"
            value={newPlacement.description}
            onChange={e => setNewPlacement({ ...newPlacement, description: e.target.value })}
          />
          <button onClick={handlePlacementSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add Placement</button>
        </div>
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {placements.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-2">{p.id}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Campaigns Section */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📣 Campaigns</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 w-full md:w-auto"
            placeholder="Campaign Name"
            value={newCampaign.name}
            onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
          />
          <button onClick={handleCampaignSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add Campaign</button>
        </div>
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id} className="border-t">
                <td className="py-2">{c.name}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
