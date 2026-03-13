export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
  relatedTool: string;
}

export const GUIDES: Record<string, Guide> = {
  'json-formatting-explained': {
    slug: 'json-formatting-explained',
    title: 'JSON Formatting Explained',
    description: 'A comprehensive guide to JavaScript Object Notation, from syntax rules to best practices for modern APIs.',
    relatedTool: '/dev-tools/json-formatter',
    content: `
# What is JSON?
JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and extremely easy for machines to parse and generate. It has become the de facto standard for transmitting data in web applications.

## JSON Syntax Rules
At its core, JSON is built on two simple structures:
1. **A collection of name/value pairs** (often realized as an object, record, struct, dictionary, hash table, keyed list, or associative array).
2. **An ordered list of values** (realized as an array, vector, list, or sequence).

The syntax mandates that data is in name/value pairs, data is separated by commas, curly braces hold objects, and square brackets hold arrays. Keys must always be enclosed in double quotes.

## Valid Data Types
JSON supports the following data types:
- **String:** Sequence of zero or more Unicode characters enclosed in double quotes.
- **Number:** Integer or floating point number.
- **Boolean:** Either \`true\` or \`false\`.
- **Null:** An empty value represented by the word \`null\`.
- **Object:** Unordered collection of key/value pairs.
- **Array:** Ordered sequence of values.

## Why Format JSON?
Raw JSON often comes as a single continuous line of text (minified) from APIs to save bandwidth. While efficient for machines, this is practically unreadable for developers debugging data.
Formatting (or "prettifying") JSON adds consistent indentation and line breaks, making the hierarchical structure instantly obvious.

## Common JSON Errors
Even experienced developers run into JSON errors. The most common pitfalls include:
- **Missing quotes around keys:** In JSON, \`{ name: "John" }\` is invalid. It must be \`{ "name": "John" }\`.
- **Trailing commas:** Having a comma after the last item in an object or array (e.g., \`[1, 2, 3,]\`) is illegal.
- **Single quotes:** Using \`'value'\` instead of \`"value"\`. JSON strictly requires double quotes.

## Best Practices for APIs
When designing an API, always return valid JSON with proper Content-Type headers (\`application/json\`). Use consistent casing (like camelCase or snake_case) and structure your responses with top-level metadata like \`data\`, \`status\`, or \`error\`.

[Try our JSON Formatter Tool to validate and format your data instantly](/dev-tools/json-formatter)
    `
  },
  'what-is-base64': {
    slug: 'what-is-base64',
    title: 'What is Base64?',
    description: 'Understanding Base64 encoding, its use cases, and why it is a critical tool for safely transmitting data.',
    relatedTool: '/encoding-tools/base64-encoder',
    content: `
# Understanding Base64
Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. The term Base64 originates from a specific MIME content transfer encoding.

## How the Encoding Process Works
Base64 works by taking 3 bytes of binary data (24 bits) and dividing them into 4 chunks of 6 bits. Each 6-bit chunk maps to one of 64 characters in the Base64 alphabet: A-Z, a-z, 0-9, \`+\`, and \`/\`. 
If the input length is not a multiple of 3 bytes, padding characters (\`=\`) are added to the end to ensure the output is properly aligned.

## URL-safe Base64
Standard Base64 uses \`+\` and \`/\` characters, which have special meaning in URLs. To safely pass Base64 data in a query parameter, "URL-safe Base64" was created. It replaces \`+\` with \`-\` (dash) and \`/\` with \`_\` (underscore).

## Common Use Cases
Base64 encoding is widely used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data:
- **Data URIs:** Embedding small image data directly in HTML or CSS to reduce HTTP requests.
- **Email:** Transferring binary file attachments over SMTP protocols that expect text.
- **JWTs:** Encoding the header and payload of a JSON Web Token.

## Comparison with Hex Encoding
Hexadecimal encoding maps each byte to two characters (0-9, A-F), doubling the data size. Base64 is more efficient for binary-to-text translation because it only increases the data size by roughly 33% instead of 100%.

## Security Note
Base64 is an encoding algorithm, NOT an encryption algorithm. It provides zero security. Anyone can easily reverse Base64 back to its original form. Never use it to hide sensitive data without proper encryption.

[Try our Base64 Encoder/Decoder Tool](/encoding-tools/base64-encoder)
    `
  },
  'what-is-jwt': {
    slug: 'what-is-jwt',
    title: 'What is a JWT?',
    description: 'A deep dive into JSON Web Tokens: structure, claims, security considerations, and common vulnerabilities.',
    relatedTool: '/dev-tools/jwt-decoder',
    content: `
# JSON Web Tokens (JWT)
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

## The JWT Structure
A JWT typically looks like \`xxxxx.yyyyy.zzzzz\` and consists of three parts separated by dots:
1. **Header:** Contains the token type (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.
2. **Payload:** Contains the claims. Claims are statements about an entity (typically, the user) and additional data.
3. **Signature:** Created by taking the encoded header, encoded payload, a secret, and signing them using the specified algorithm.

## Understanding Claims
There are three types of claims:
- **Registered claims:** Predefined claims (like \`iss\` for issuer, \`exp\` for expiration time, \`sub\` for subject, \`aud\` for audience) that are not mandatory but recommended.
- **Public claims:** Custom claims defined by those using JWTs, but to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI.
- **Private claims:** Custom claims created to share information between parties that agree on using them.

## Token Lifecycle and Expiration
JWTs are stateless, meaning the server doesn't need to query a database to validate them. However, this makes revoking them difficult. It is highly recommended to keep JWT lifetimes short (e.g., 15 minutes) and use longer-lived Refresh Tokens to obtain new JWTs when they expire.

## Common Vulnerabilities
- **None Algorithm:** Older JWT libraries allowed the \`alg\` header to be set to \`none\`, bypassing signature validation entirely.
- **Weak Secrets:** Using a brute-forceable secret key for HMAC signatures.
- **Sensitive Data:** Storing passwords or PII in the payload. The payload is merely Base64Url encoded, NOT encrypted!

## When to use vs not use JWTs
JWTs are excellent for stateless API authentication and Server-to-Server authorization. They are less suitable for standard web session management (like logging into a normal website) where traditional HttpOnly cookies are often more secure and easier to revoke.

[Decode your JWTs safely offline with our JWT Decoder](/dev-tools/jwt-decoder)
    `
  },
  'password-security-guide': {
    slug: 'password-security-guide',
    title: 'Password Security Best Practices',
    description: 'How to create and manage secure passwords in the modern era of computing and defend against attacks.',
    relatedTool: '/security-tools/password-generator',
    content: `
# Password Security in 2025
The landscape of password security has evolved significantly. As computing power increases, older guidelines have become obsolete. Here are the modern best practices for password security.

## Length over Complexity
The most critical factor in password strength is length, which exponentially increases entropy. A 16-character password of random lowercase letters is generally harder to crack than an 8-character password with symbols and numbers. However, a long password (16+ chars) with mixed characters provides the ultimate defense against brute-force attacks.

## Common Attack Methods
Attackers rarely sit and guess passwords manually. They use sophisticated methods:
- **Dictionary Attacks:** Using massive lists of common words and known compromised passwords.
- **Brute Force:** Systematically trying every possible combination of characters.
- **Credential Stuffing:** Taking username/password pairs breached from one site and trying them on hundreds of other sites.

## Avoiding Predictable Patterns
Hackers use dictionaries of common substitutions (e.g., replacing 'a' with '@' or 'e' with '3'). These are known as "leet speak" and are trivial for cracking algorithms to bypass. Avoid these predictable patterns entirely.

## The Role of a Password Manager
Humans cannot realistically remember 50 unique, complex 16-character passwords. A password manager is an essential tool. Generate a unique, highly secure password for every single service, and store them in an encrypted vault secured by one very strong master password.

## Multi-Factor Authentication (2FA)
A strong password is only half the battle. Always enable 2FA wherever possible. Authenticator apps (TOTP) or physical security keys (like YubiKey) are vastly superior to SMS-based 2FA, which can be intercepted via SIM swapping.

## The Future: Passkeys
The industry is slowly moving toward Passkeys, leveraging public-key cryptography to eliminate passwords entirely. Until they are universally adopted, strong passwords remain our primary defense.

[Generate highly secure, random passwords locally with our Password Generator](/security-tools/password-generator)
    `
  }
};

export const GUIDES_LIST = Object.values(GUIDES);
