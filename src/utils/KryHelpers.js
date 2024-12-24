import { ec as EC } from "elliptic";
import * as bip39 from "bip39";
import hdkey from "hdkey";
import CryptoJS from "crypto-js";
import bs58check from "bs58check";
import { Buffer } from "buffer"; 

// Initialize the elliptic curve secp256k1
const ec = new EC("secp256k1");

/**
 * Generates a private key, public key, and Base58-encoded POX address.
 * @returns {Object} Object containing mnemonic, privateKey, publicKey, and poxAddress (Base58-encoded).
 */
export const generateKeys = () => {
  // Generate a mnemonic
  const mnemonic = bip39.generateMnemonic();

  // Convert mnemonic to seed
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Create HD wallet from seed (BIP32)
  const root = hdkey.fromMasterSeed(seed);

  // Derive a path (POX usually follows the Ethereum path, but change as needed)
  const path = "m/44'/195'/0'/0/0";
  const child = root.derive(path);

  // Get the private key from the derived key
  const privateKey = child.privateKey.toString("hex");

  // Generate the public key from the private key
  const keyPair = ec.keyFromPrivate(privateKey);
  const publicKey = keyPair.getPublic("hex").slice(2); // Remove the leading '04'

  // Hash the public key using Keccak256 (Ethereum-like hashing)
  const publicKeyBytes = CryptoJS.enc.Hex.parse(publicKey);
  const keccak256 = CryptoJS.SHA3(publicKeyBytes, {
    outputLength: 256,
  }).toString();

  // The POX address is the last 20 bytes of the Keccak256 hash with '37' prefixed
  const poxAddressHex = "37" + keccak256.substring(24);

    // Convert POX address to Base58 format
    const decodedHex = Buffer.from(poxAddressHex, 'hex');
    const poxAddressBase58 = bs58check.encode(decodedHex);
    // const  = bs58.encode(Buffer.from(poxAddressHex, "hex"));

  return {
    mnemonic,
    privateKey,
    publicKey,
    poxAddress: poxAddressBase58,
  };
};
