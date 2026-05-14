// Polyfill `crypto.randomUUID` for non-secure contexts.
// Browsers only expose it on HTTPS / localhost / 127.0.0.1; on plain HTTP
// public IPs the API is undefined, which breaks libraries like Label Studio
// that call `crypto.randomUUID()` to generate result IDs.

if (typeof window !== "undefined") {
  if (!window.crypto) {
    window.crypto = {};
  }

  if (typeof window.crypto.randomUUID !== "function") {
    window.crypto.randomUUID = function randomUUID() {
      const bytes = new Uint8Array(16);
      if (typeof window.crypto.getRandomValues === "function") {
        window.crypto.getRandomValues(bytes);
      } else {
        for (let i = 0; i < bytes.length; i += 1) {
          bytes[i] = Math.floor(Math.random() * 256);
        }
      }

      // Per RFC 4122 v4: set version + variant bits.
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
      return (
        hex.slice(0, 4).join("") +
        "-" +
        hex.slice(4, 6).join("") +
        "-" +
        hex.slice(6, 8).join("") +
        "-" +
        hex.slice(8, 10).join("") +
        "-" +
        hex.slice(10, 16).join("")
      );
    };
  }
}
