import React from 'react';
import { RegistryCredentials } from '../types';

interface RegistryFormProps {
  credentials: RegistryCredentials;
  onChange: (credentials: RegistryCredentials) => void;
}

export function RegistryForm({ credentials, onChange }: RegistryFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Registry URL</label>
        <input
          type="text"
          value={credentials.url}
          onChange={(e) => onChange({ ...credentials, url: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="registry.example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => onChange({ ...credentials, username: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => onChange({ ...credentials, password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
}