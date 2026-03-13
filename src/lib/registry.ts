import { 
  FileJson, Key, FileType, Braces, 
  Binary, Shield, Lock, FileCode2,
  Cpu, Network, Database, Globe
} from "lucide-react";
import React from "react";

export type CategorySlug = 'dev-tools' | 'security-tools' | 'encoding-tools' | 'network-tools';

export interface ToolMeta {
  id: string;
  title: string;
  description: string;
  category: CategorySlug;
  path: string;
  icon: React.ElementType;
  tags: string[];
  relatedTools: string[];
}

export const CATEGORIES: Record<CategorySlug, { title: string; description: string; icon: React.ElementType }> = {
  'dev-tools': {
    title: 'Developer Tools',
    description: 'Essential utilities for modern software development. Format, parse, and debug your code with locally-run tools.',
    icon: Cpu
  },
  'security-tools': {
    title: 'Security Tools',
    description: 'Cryptography, hashing, and password utilities. Generate secure credentials and verify data integrity safely.',
    icon: Shield
  },
  'encoding-tools': {
    title: 'Encoding Tools',
    description: 'Data format conversion and encoding utilities. Safely convert data formats without sending payloads over the network.',
    icon: Binary
  },
  'network-tools': {
    title: 'Network Tools',
    description: 'Networking and connectivity diagnostics. Troubleshoot routing and analyze network configurations quickly.',
    icon: Network
  }
};

export const TOOLS_REGISTRY: ToolMeta[] = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON data instantly. Ensure your API payloads are well-formed and easy to read.',
    category: 'dev-tools',
    path: '/dev-tools/json-formatter',
    icon: Braces,
    tags: ['json', 'format', 'prettify', 'minify', 'validate'],
    relatedTools: ['json-to-ts', 'jwt-decoder']
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens securely offline. View headers and payloads without exposing sensitive claims.',
    category: 'dev-tools',
    path: '/dev-tools/jwt-decoder',
    icon: Key,
    tags: ['jwt', 'token', 'decode', 'auth'],
    relatedTools: ['base64-encoder', 'json-formatter']
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate single or bulk v4 UUIDs instantly. Create universally unique identifiers for your database records.',
    category: 'dev-tools',
    path: '/dev-tools/uuid-generator',
    icon: Database,
    tags: ['uuid', 'guid', 'generate', 'random'],
    relatedTools: ['password-generator', 'hash-generator']
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test regular expressions against target strings. Build, validate, and debug complex RegEx patterns in real-time.',
    category: 'dev-tools',
    path: '/dev-tools/regex-tester',
    icon: FileCode2,
    tags: ['regex', 'regular expression', 'match', 'test'],
    relatedTools: ['json-formatter', 'json-to-ts']
  },
  {
    id: 'json-to-ts',
    title: 'JSON to TypeScript',
    description: 'Convert JSON objects to TypeScript interfaces. Instantly generate static types for your API responses.',
    category: 'dev-tools',
    path: '/dev-tools/json-to-typescript',
    icon: FileType,
    tags: ['json', 'typescript', 'types', 'interface', 'convert'],
    relatedTools: ['json-formatter', 'regex-tester']
  },
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode or decode text to Base64 format. Easily handle binary data serialization for URLs or databases.',
    category: 'encoding-tools',
    path: '/encoding-tools/base64-encoder',
    icon: FileJson,
    tags: ['base64', 'encode', 'decode', 'text'],
    relatedTools: ['jwt-decoder', 'hash-generator']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong, secure, customized passwords. Generate highly entropic secrets locally for maximum privacy.',
    category: 'security-tools',
    path: '/security-tools/password-generator',
    icon: Lock,
    tags: ['password', 'security', 'generate', 'strong'],
    relatedTools: ['hash-generator', 'uuid-generator']
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Calculate MD5, SHA-1, SHA-256, and SHA-512 hashes. Compute cryptographic digests to verify file integrity.',
    category: 'security-tools',
    path: '/security-tools/hash-generator',
    icon: Shield,
    tags: ['hash', 'md5', 'sha256', 'sha512', 'crypto'],
    relatedTools: ['password-generator', 'base64-encoder']
  },
  {
    id: 'ip-info',
    title: 'IP Info Lookup',
    description: 'View your public IP address, geolocation, ISP, timezone, and network details. Instantly see how the internet sees you.',
    category: 'network-tools',
    path: '/network-tools/ip-info',
    icon: Globe,
    tags: ['ip', 'address', 'geolocation', 'isp', 'network', 'location', 'whois'],
    relatedTools: ['hash-generator', 'base64-encoder']
  }
];

export function getToolById(id: string): ToolMeta | undefined {
  return TOOLS_REGISTRY.find(t => t.id === id);
}

export function getToolsByCategory(category: CategorySlug): ToolMeta[] {
  return TOOLS_REGISTRY.filter(t => t.category === category);
}

export function searchTools(query: string): ToolMeta[] {
  const lowerQuery = query.toLowerCase();
  return TOOLS_REGISTRY.filter(t => 
    t.title.toLowerCase().includes(lowerQuery) || 
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.includes(lowerQuery))
  );
}

export function getRelatedTools(toolId: string): ToolMeta[] {
  const tool = getToolById(toolId);
  if (!tool) return [];
  return tool.relatedTools.map(id => getToolById(id)).filter(Boolean) as ToolMeta[];
}
