export const profile = {
  name: "Fatin Kazi",
  initials: "FK",
  role: "Full Stack Software Engineer",
  profileImageUrl: "https://media.licdn.com/dms/image/v2/D5603AQF04WPzHQvmGQ/profile-displayphoto-crop_800_800/B56ZwyhnIyKMAI-/0/1770374200921?e=1777507200&v=beta&t=8D0wic9JJMd6QX_5poESdK6BQr27AB25ebQjcZGKJaU",
  linkedinUrl: "https://www.linkedin.com/",
};

export const careerSummary =
  "Software engineer with a strong back-end skillset grown through product environments. Proven in developing and maintaining scalable services, integrating systems, and collaborating across cross-functional teams.";

export const skills = {
  programming: ["Ruby", "Java", "C#", "TypeScript", "Node.js", "React", "Jest", "SQL", "CSS", "HTML"],
  infrastructure: ["Kafka", "PostgreSQL", "GraphQL", "REST", "AWS", "Terraform"],
  development: ["Git", "CI/CD", "Microservices", "Monitoring", "API design"],
};

export const experience = [
  {
    company: "Kantar",
    title: "Associate Software Engineer",
    period: "Jan 2025 - Present",
    highlights: [
      "Own financial microservice. Independently maintain and upgrade microservice to support 850,000 transaction per month, totaling $2mm USD on average. Safely automate retries and refunds without duplication.",
      "Transferred complete company-critical database data with no downtime. Migrated services from Heroku to AWS without data loss or performance issues, handling approximately 20M records, including 800K PayPal clean-ups.",
      "Liaise with department directors to improve UX. User-first approach using latest UX learnings applied to both internal- and external-facing applications. In-depth discussions with User Rewards director, working to simplify and automate their workflow to allow for faster product additions, greater inventory analysis and more confidence in live product health. Responsive development with User Support team to build granular permissions-based tooling for self-sufficiency and faster, more accurate case resolution.",
    ],
  },
  {
    company: "NMI",
    title: "Placement Software Engineer",
    period: "Sep 2023 - Sep 2024",
    highlights: [
      "Implemented core payment backend features end-to-end. Built data-receiving endpoints and supporting domain classes, designed database procedures, and improved reliability through automated testing and structured validation. Troubleshot delivery issues quickly using clear logging and debugging workflows.",
      "Improved delivery speed and team productivity in cross-functional Agile squads. Partnered with product and engineering teams to ship features such as EV charging support, and automated repetitive half-day workflows to improve productivity by roughly 50%. Delivered across Window Server Upgrades, Communication Issue, 3DS 2.2 Exemption, and Incremental Auth.",
    ],
  },
];

export const education = {
  degree: "BSc Computer Science (Placement Year)",
  institution: "Queen Mary University of London",
  period: "2020 - 2024",
  summary:
    "Graduated with focus on software engineering and applied AI, with practical project work in systems, data, and human-centered design.",
  details: [
    "Hey Alexa, What's the Mood? Developed a mood journaling application using Amazon Alexa to support effective self-management of mental health. Integrated mood tracking with experiential feedback to provide users with interactive tools for assessing and improving mental wellness.",
    "Studied practices of good software design. Covered Agile approaches and SOLID principles, implemented AI algorithms including neural networks, pathfinding, and data mining, and learned functional and concurrent programming. Studied SQL and NoSQL database design and implemented protections against SQL and HTML injection.",
    "Studied Human-Computer Interaction, Law and Ethics. Learned interface design, communication, and analysis linked to human psychology and culture. Analysed past computer-system failures and debated current and future laws, including ethical responsibilities, criminal liability, and professional accreditation in computing.",
  ],
};

export const interests = [
  {
    title: "Mental Health and Wellness",
    description: "Exploring approaches to improving mental health and well-being through technology and community.",
  },
  {
    title: "Languages",
    description: "Learning conversational languages and communication patterns.",
  },
  {
    title: "Developer Experience",
    description: "Building tools and workflows that make teams move faster.",
  },
  {
    title: "Politics and History",
    description: "Following policy, institutions, and long-term global trends.",
  },
];

export const blogPosts = [
  {
    slug: "jose",
    title: "JavaScript Object Signing and Encryption (JOSE)",
    summary:
      "JOSE is a specification for signing and encrypting request and response bodies in web requests. Fundamentally, JOSE is not too complicated, but it can be overwhelming to get started with. This post explains the concepts and shows what the flow looks like in real systems (JWKS endpoints, caching, verification, and optional encryption).",
    blocks: [
      {
        heading: "JavaScript Object Signing and Encryption (JOSE)",
        paragraphs: [
          "JavaScript Object Signing and Encryption (JOSE) is a specification for signing, encrypting, decrypting and verifying payloads. The term payload refers to a request body or a response body. This means that for a GET request, the outbound request is not signed or encrypted, but the response may be if it contains a response body.",
          "In a JOSE system, when we send and receive requests they are signed and encrypted using JOSE methods. This is an asymmetrical form of signing and encrypting payloads, meaning that the Sender and Receiver each have their own public/private key pairs, and the private keys do not need to be shared outside the organisation. This also means that in the event of a leak, the other party does not need to update their keys.",
          "The payload is signed to prove that the sender is who they claim to be. The payload is encrypted so that only the intended receiver can't read the contents of the payload.",
        ],
      },

      {
        heading: "How it works between two services (sender and receiver)",
        paragraphs: [
          "In a typical service-to-service setup you have a Sender (Service A) and a Receiver (Service B). Each service owns its own keys and only publishes public keys via JWKS endpoints.",
          "Service A signs messages with its private signing key. Service B verifies that signature using Service A’s public signing key fetched from Service A’s JWKS.",
          "For confidentiality, Service A encrypts to Service B using Service B’s public encryption key fetched from Service B’s JWKS. Only Service B can decrypt because only Service B has the matching private encryption key.",
        ],
        list: [
          "Service A publishes signing public keys: `https://service-a/.well-known/jwks.json`.",
          "Service B publishes encryption public keys: `https://service-b/.well-known/jwks.json`.",
          "A signs payload → JWS, then encrypts JWS → JWE using B’s public key.",
          "B decrypts JWE using B’s private key, then verifies JWS using A’s public key.",
          "Summary: ",
          " A signs with A’s private key, encrypts with B’s public key.",
          " B decrypts with B’s private key, verifies with A’s public key.",
          "Sign - JWS provides Integrety + authenticity",
          "JWE Encrypt the JWT confidentially + integrity",
          "JWE(JWS(JWT)) signed then encrypted JWT all three"
        ],
      },

      {
        heading: "Overview of sending a payload",
        list: [
          "Sign the payload using Sender’s private key to produce a signed token (JWS/JWT).",
          "Encrypt signed payload token using a randomly-generated Content Encryption Key (CEK).",
          "Encrypt CEK using Receiver’s public key.",
          "Create token containing encrypted signed token and encrypted CEK (JWE).",
          "Send token.",
        ],
      },

      {
        heading: "Overview of decrypting and verifying a payload",
        list: [
          "Decrypt CEK using Receiver’s private key (matching pair of the public key used for encryption).",
          "Use decrypted CEK to decrypt received token and get signed payload token (JWS).",
          "Use Sender’s public key to verify signature on signed payload token.",
        ],
      },

      {
        heading: "Requirements for using JOSE",
        paragraphs: [
          "There are libraries available for creating keys, signing, verifying, encrypting and decrypting. You should use a JOSE library instead of trying to write your own.",
          "Each party need to produce at least two public/private key pairs. One key pair will be used for signing, and one will be used for encryption. A signing key pair is generated using a signing algorithm, and an encryption key pair is generated using an encryption algorithm.",
          "Make sure you choose an asymmetric key type (RSA, EC or ECDH/OKP). Each party needs to support the same algorithms. Public keys must be stored in JSON Web Key form.",
        ],
      },

      {
        callout: "RFC 7518 contains the full list of accepted algorithms for signing and encryption.",
      },

      {
        heading: "JSON Web Key (JWK) and JWKS endpoints",
        paragraphs: [
          "A JSON Web Key (JWK) is a JSON form for storing keys. A key in JWK form contains attributes describing the key, the algorithm(s) used to generate it, and the identifier for the key.",
          "You should host your keys in a JWK Keyset (JWKS) - this is a JSON format with a single attribute `keys` which holds an array of JWKs.",
          "In real systems, keys are commonly published through an open GET endpoint such as `/.well-known/jwks.json` (or sometimes `/jwks` or `/keys`). This is safe to expose publicly because it contains public keys only.",
          "Services use `kid` (key id) in the JOSE header to select the correct public key from the JWKS. This enables key rotation without breaking older tokens immediately.",
        ],
      },

      {
        heading: "Why `kid` enables safe key rotation",
        paragraphs: [
          "A JWKS endpoint usually returns multiple keys at once because services rotate keys over time. Each key in the JWKS has a `kid`, and each token header also includes a `kid`.",
          "When a receiver verifies a token, it reads the token header `kid`, finds the matching key in the JWKS (by `kid`), and uses that specific public key to verify the signature. No guessing, and no trying every key.",
          "During a planned rotation you publish the old and new public keys together. New tokens are signed with the new private key (new `kid`), but old tokens can still be verified because the old public key remains in JWKS until those tokens expire.",
          "In an incident (private key compromise), you typically remove the compromised key from JWKS to immediately invalidate tokens signed with that key, and switch signing to a new key pair.",
        ],
        code: `// Example: token header includes a kid
{ "alg": "RS256", "kid": "key-2026-01" }

// JWKS publishes multiple public keys during rotation
{
  "keys": [
    { "kid": "key-2025-09", "kty": "RSA", "use": "sig", "n": "...", "e": "AQAB" },
    { "kid": "key-2026-01", "kty": "RSA", "use": "sig", "n": "...", "e": "AQAB" }
  ]
}`,
      },

      {
        heading: "Preparing a payload to be sent",
        paragraphs: [
          "Signing usually combines a protected header, a payload, and a key to produce a compact token representation. Encryption follows a similar flow but with encryption-specific algorithms and key material.",
        ],
      },

      {
        subheading: "Signing",
        paragraphs: [
          "The signing process takes three elements and produces a single, base64url-encoded token. The three elements are the Signature Header, the Payload, and the Signing JWK (private key).",
          "The output is a JSON Web Signature (JWS). In many systems this is used as a JSON Web Token (JWT) when the payload contains claims.",
        ],
      },

      {
        subheading: "Signature Header",
        paragraphs: [
          "The Signature Header is a JSON object containing data about the JWS. It has two required keys: `alg` and `kid`.",
          "It may also have custom fields. If you add custom header fields, list them in `crit` so verifiers know they must understand them.",
        ],
        list: ["`alg` - the signing algorithm used.", "`kid` - the key ID used to identify which key pair signed the token."],
        code: `{
  "alg": "RS384",
  "kid": "service_2025_sig_rsa_RS384",
  "exp": 165297738,
  "crit": ["exp"]
}`,
      },

      {
        subheading: "Payload",
        paragraphs: ["The request body you want to send - can contain any data in JSON form."],
        code: `{
  "email": "user@example.com",
  "password": "6N6E<lk/\`!0(ySsm"
}`,
      },

      {
        subheading: "Signing JWK",
        paragraphs: [
          "The signing JWK contains the data for the signing algorithm and key to use to produce a signature. In practice, your service stores the private key securely and publishes only the public portion via JWKS.",
        ],
        code: `{
  "kty": "RSA",
  "use": "sig",
  "alg": "RS384",
  "e": "AQAB",
  "kid": "service_2025_sig_rsa_RS384",
  "n": "xORciQJITiY1Dy7HI_vZQl1Td3zV8lKZ4RS1HarZ4zW4CzdVtQ7lpWdlnC"
}`,
      },

      {
        subheading: "JWS output",
        paragraphs: [
          "The output of the signing process will be a compact token string. The token contains the Header, the Payload, and a signature.",
        ],
        code: `"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ"`,
      },

      {
        heading: "Encrypting",
        paragraphs: [
          "The encryption process takes four elements and produces a single, base64url-encoded token. The four elements are the Encryption Header, the Signed Payload, the Content Encryption Key (CEK) and the Encrypting JWK.",
          "The output is a JSON Web Encryption (JWE). JWE uses hybrid encryption: a random CEK (symmetric) encrypts the content, and the CEK is encrypted (wrapped) using the receiver’s public key.",
        ],
      },

      {
        subheading: "Encryption Header",
        paragraphs: [
          "The Encryption Header is a JSON object containing data about the JWE. It has three required keys: `enc`, `alg`, and `kid`.",
        ],
        list: [
          "`enc` - the content encryption algorithm used to encrypt the signed payload (e.g., A256GCM).",
          "`alg` - the key management algorithm used to encrypt the CEK (e.g., RSA-OAEP-256).",
          "`kid` - the key ID used to identify which receiver public key was used.",
        ],
        code: `{
  "alg": "RSA-OAEP-256",
  "enc": "A256GCM",
  "kid": "service_2025_enc_rsa_RSA-OAEP-256",
  "zip": "DEF"
}`,
      },

      {
        subheading: "Signed Payload",
        paragraphs: [
          "The Signed Payload is the JWS token generated in the signing step, passed in as a string. It is encrypted using the CEK and the algorithm specified in the `enc` header.",
          "Technically, JWE does not require the payload to be signed, but signing first gives you sender authenticity and tamper protection end-to-end.",
        ],
      },

      {
        subheading: "Content Encryption Key (CEK)",
        paragraphs: [
          "The CEK is a randomly-generated key used with the algorithm specified in the `enc` header to encrypt the Signed Payload.",
          "The CEK itself is then encrypted using the algorithm specified in the `alg` header so only the receiver can recover it.",
        ],
        code: `"\\x99\\x16\\x02\\xCB\\x81f\\xC0\\x90s\\xABB\\xC3\\x93\\xB2\\xAB\\xA0\\xFCx\\\\\\x14\\xB5\\xBB\\x88\\xF8R\\r\\x96\\xAFW\\x17\\xE4\\xAF"`,
      },

      {
        subheading: "Encrypting JWK",
        paragraphs: [
          "The encrypting JWK is the receiver’s public key from their JWKS endpoint. Your sender service picks the right key by matching the `kid` in the header.",
        ],
        code: `{
  "kty": "RSA",
  "use": "enc",
  "alg": "RSA-OAEP-256",
  "e": "AQAB",
  "enc": "A128GCM",
  "kid": "service_2025_enc_rsa_RSA-OAEP-256",
  "n": "3K1ODfxz_bHAqFuLlKv4NMicKku7KB93u_nkMu5DxS2u8U3wK-L3"
}`,
      },

      {
        subheading: "JWE output",
        paragraphs: [
          "The output of the encryption process will be a compact token string. The token contains the Header, the encrypted CEK, the Initialisation Vector (if required), the ciphertext (encrypted signed payload), and an Authentication Tag used to verify integrity of the ciphertext.",
        ],
        code: `eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.OKOawDo13gRp2ojaHV7LFpZcgV7T6DVZKTyKOMTYUmKoTCVJRgckCL9kiMT03JGe...XFBoMYUZodetZdvTiFvSkQ`,
      },

      {
        heading: "How this works in an actual system (JWT + JWKS)",
        paragraphs: [
          "A very common real-world JOSE setup is: services mint signed JWTs (JWS) and other services verify them by fetching the issuer’s JWKS from a `/.well-known/jwks.json` endpoint.",
          "The issuer keeps the private key. The verifier fetches only the public keys. Verification is secure because public keys can verify signatures but cannot create them.",
        ],
      },

      {
        subheading: "Issuer side (build payload + sign JWT)",
        paragraphs: ["First you build the business payload and include standard JWT metadata (claims)."],
        code: `payload = { sub: user_guid, panel: panel, iss: 'redemptions' }
token_id = SecureRandom.uuid`,
      },

      {
        subheading: "Business claims and standard claims",
        paragraphs: [
          "`sub` is the subject (the user). `panel` is an app-specific claim. `iss` identifies who minted the token. `jti` is a unique token id. `iat` and `exp` control token lifetime.",
        ],
        code: `{
  "sub": "user-guid",
  "panel": "kpp",
  "iss": "redemptions",
  "iat": 1700000000,
  "exp": 1700001800,
  "jti": "uuid"
}`,
      },

      {
        subheading: "Encode (signing) example (Ruby-style)",
        paragraphs: [
          "This example selects a signing key (private key) from your local key material and signs the JWT. The `kid` is placed into the header so verifiers can pick the matching public key from JWKS.",
        ],
        code: `def encode!
  jwk = Utils::JsonWebKeys.jwks.first
  return nil unless jwk

  JWT.encode(
    @payload.merge(payload_metadata),
    jwk.signing_key,
    jwk[:alg],
    kid: jwk[:kid]
  )
end`,
      },

      {
        subheading: "Verifier side (Node + jose + JWKS caching)",
        paragraphs: [
          "On the receiving service, you typically read the token from the `Authorization` header and verify it using the issuer’s public keys from their JWKS endpoint.",
          "Because services may verify lots of tokens, JWKS responses are usually cached (e.g., in Redis) to avoid fetching keys on every request.",
        ],
        code: `const token = req.headers.authorization?.split(" ")[1];
// Expects: Authorization: Bearer <jwt>`,
      },

      {
        subheading: "Fetch + cache the JWKS",
        paragraphs: ["If the JWKS is not in cache, the verifier fetches it with a simple GET and stores it with a TTL."],
        code: `const key = \`\${KEY_PREFIX}:\${jwksetUrl}\`;
let jwkset = await Redis.getInstance().client.get(key);

if (!jwkset) {
  const response = await fetch(jwksetUrl);
  const data = await response.json();
  jwkset = JSON.stringify(data);
  await Redis.getInstance().client.setEx(key, 172800, jwkset); // 2 days
}`,
      },

      {
        subheading: "Convert JWKS into a keystore and verify",
        paragraphs: [
          "The keystore contains one or more trusted public keys. The verifier checks the token header (`kid`, `alg`) and uses the matching public key to verify the signature.",
          "This is where the open GET JWKS endpoint becomes useful: it distributes public keys safely while keeping private keys private.",
        ],
        code: `const keystore = await jose.JWK.asKeyStore(JSON.parse(jwkset));

const verifier = jose.JWS.createVerify(keystore);
const result = await verifier.verify(token);`,
      },

      {
        heading: "Symmetric vs asymmetric (what changes?)",
        paragraphs: [
          "JOSE supports both asymmetric and symmetric algorithms. In asymmetric setups (RSA/EC), the issuer signs with a private key and verifiers use the public key from JWKS.",
          "In symmetric setups, both sides share a secret. For signing you may see HS256/HS384/HS512 (HMAC). For encryption you may see direct encryption (`alg: 'dir'`) with an AEAD `enc` algorithm.",
          "Symmetric is simpler but riskier operationally: if the shared secret leaks, an attacker may be able to forge signatures and/or decrypt traffic. Asymmetric is usually preferred for distributed systems because you can publish public keys openly and rotate keys more cleanly.",
        ],
      },
    ],
  },
  {
    slug: "kafka-kantar-learnings",
    title: "Kafka: Lessons from Kantar",
    summary:
      "A brief post on what I learned using Kafka at Kantar: where it fits in microservice architecture, why it helps with decoupling services, and the operational trade-offs to watch. This draft is intentionally short and will be expanded later.",
    blocks: [
      {
        heading: "Kafka in a microservice architecture",
        paragraphs: [
          "Kafka is commonly used as an event streaming backbone in microservice systems. Instead of tightly coupling services with direct request chains, producers publish events and consumers process them asynchronously. This improves scalability and failure isolation when traffic grows or downstream services are temporarily unavailable.",
          "At Kantar, this pattern helped separate responsibilities between services and made integrations more resilient. Teams could evolve consumers independently while keeping a stable event contract between systems.",
        ],
      },
      {
        heading: "What I learned in practice",
        list: [

        ],
      },
      {
        callout:
          "Work in progress:",
      },
    ],
  },
];
