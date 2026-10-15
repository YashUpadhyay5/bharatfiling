import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { ENV } from '../config/env.js';

// Ensure upload directory exists
if (!fs.existsSync(ENV.STORAGE_DIR)) {
  fs.mkdirSync(ENV.STORAGE_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ENV.STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    // Fully random name: uploads are served statically, so the URL must not be guessable
    // and must not echo user-controlled text.
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomBytes(24).toString('hex')}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.jpg', '.jpeg', '.png', '.pdf'];

  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only PDF, JPG, JPEG, and PNG files are accepted.'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
    files: 1,
  },
  fileFilter,
});

const SIGNATURES = [
  { ext: ['.pdf'], bytes: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { ext: ['.png'], bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { ext: ['.jpg', '.jpeg'], bytes: [0xff, 0xd8, 0xff] },
];

/**
 * Confirms the first bytes of the stored file match the extension it claims.
 */
export const verifyUploadedFileSignature = (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const sig = SIGNATURES.find((s) => s.ext.includes(ext));
    if (!sig) return false;
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(sig.bytes.length);
    fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    return sig.bytes.every((b, i) => buf[i] === b);
  } catch {
    return false;
  }
};
