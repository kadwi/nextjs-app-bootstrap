"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [websiteName, setWebsiteName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [logoPath, setLogoPath] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Load current config from server or local storage (mocked here)
    fetch("/api/admin/config")
      .then((res) => res.json())
      .then((data) => {
        setWebsiteName(data.websiteName);
        setDisplayName(data.displayName);
        setLogoPath(data.logoPath);
        setDomains(data.allowedDomains);
      })
      .catch(() => {
        setMessage("Failed to load config");
      });
  }, []);

  const addDomain = () => {
    if (newDomain && !domains.includes(newDomain)) {
      setDomains([...domains, newDomain]);
      setNewDomain("");
    }
  };

  const removeDomain = (domainToRemove: string) => {
    setDomains(domains.filter((d) => d !== domainToRemove));
  };

  const saveConfig = async () => {
    try {
      const response = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteName,
          displayName,
          logoPath,
          allowedDomains: domains,
        }),
      });
      if (response.ok) {
        setMessage("Configuration saved successfully");
      } else {
        setMessage("Failed to save configuration");
      }
    } catch {
      setMessage("Failed to save configuration");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {message && <p className="mb-4 text-yellow-400">{message}</p>}
      <div className="space-y-6 max-w-lg">
        <div>
          <label className="block mb-1 font-semibold">Website Name</label>
          <input
            type="text"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Display Name (WXMAIL)</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Logo Path (URL or local path)</label>
          <input
            type="text"
            value={logoPath}
            onChange={(e) => setLogoPath(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Allowed Domains</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Add new domain"
              className="flex-grow p-2 rounded bg-gray-800 border border-gray-700"
            />
            <button
              onClick={addDomain}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {domains.map((domain) => (
              <li key={domain} className="flex justify-between items-center">
                <span>{domain}</span>
                <button
                  onClick={() => removeDomain(domain)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={saveConfig}
          className="w-full py-3 bg-green-600 rounded hover:bg-green-700 font-semibold"
        >
          Save Configuration
        </button>
        <section className="mt-10 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
          <p className="mb-2">
            <strong>GET /api/admin/config</strong>: Retrieve the current admin configuration.
          </p>
          <p className="mb-2">
            <strong>POST /api/admin/config</strong>: Update the admin configuration. Send JSON body with keys: <code>websiteName</code>, <code>displayName</code>, <code>logoPath</code>, <code>allowedDomains</code>.
          </p>
          <p className="mb-2">
            <strong>GET /api/emails?email=EMAIL_ADDRESS</strong>: Fetch emails for the specified email address.
          </p>
          <p className="mb-2">
            <strong>POST /api/emails/create</strong>: Create a new temporary email. Send JSON body with optional <code>domain</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
