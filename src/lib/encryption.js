import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32; // bytes for AES-256

/**
 * Gets the encryption key from the environment variable.
 * Pads or truncates to exactly 32 bytes for AES-256.
 * 
 * @returns {Buffer} 32-byte encryption key
 */
function getKey() {
  const keyStr = process.env.STORAGE_ENCRYPTION_KEY;
  if (!keyStr) {
    throw new Error(
      "STORAGE_ENCRYPTION_KEY is not set in environment variables. " +
      "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  // Normalize to exactly 32 bytes
  return Buffer.from(keyStr.padEnd(KEY_LENGTH, "0").slice(0, KEY_LENGTH));
}

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Returns a single base64 string: iv:authTag:ciphertext
 * 
 * @param {string} text - The plaintext to encrypt
 * @returns {string} Encrypted string
 */
export function encrypt(text) {
  if (!text) return null;
  const key = getKey();
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Combine iv + authTag + ciphertext into a single base64 string
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 * 
 * @param {string} encryptedText - The base64 encrypted string (iv:authTag:ciphertext)
 * @returns {string} Decrypted plaintext
 */
export function decrypt(encryptedText) {
  if (!encryptedText) return null;
  const key = getKey();
  const combined = Buffer.from(encryptedText, "base64");

  // Extract components: 12 bytes IV + 16 bytes authTag + rest is ciphertext
  const iv = combined.subarray(0, 12);
  const authTag = combined.subarray(12, 28);
  const ciphertext = combined.subarray(28);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
