// image-store.js — persist scanned food images in IndexedDB (keeps localStorage small)

const DB_NAME = 'nutrivision_images';
const DB_VERSION = 1;
const STORE = 'images';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
  });
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed'));
    tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted'));
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = String(dataUrl).split(',');
  const mime = (header.match(/data:([^;]+);base64/) || [])[1] || 'image/jpeg';
  const bin = atob(base64 || '');
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Failed to read blob'));
    reader.readAsDataURL(blob);
  });
}

async function makeThumbnailDataUrl(dataUrl, maxDim = 320, quality = 0.82) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(dataUrl);
    }, 800);

    const img = new Image();
    img.onload = () => {
      clearTimeout(timeout);
      const w = img.width || 1;
      const h = img.height || 1;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      const tw = Math.max(1, Math.round(w * scale));
      const th = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement('canvas');
      canvas.width = tw;
      canvas.height = th;
      canvas.getContext('2d').drawImage(img, 0, 0, tw, th);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}

export async function saveScannedImage(dataUrl) {
  const id = generateId();
  const blob = dataUrlToBlob(dataUrl);
  const thumbDataUrl = await makeThumbnailDataUrl(dataUrl, 320, 0.82);

  const db = await openDb();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put({ id, blob, createdAt: Date.now() });
  await txDone(tx);
  db.close();

  return { imageId: id, thumbDataUrl };
}

export async function getImageBlob(imageId) {
  if (!imageId) return null;
  const db = await openDb();
  const tx = db.transaction(STORE, 'readonly');
  const req = tx.objectStore(STORE).get(imageId);
  const record = await new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error || new Error('IndexedDB get failed'));
  });
  await txDone(tx);
  db.close();
  return record?.blob || null;
}

export async function getImageObjectUrl(imageId) {
  const blob = await getImageBlob(imageId);
  if (!blob) return { url: '', revoke: () => {} };
  const url = URL.createObjectURL(blob);
  return { url, revoke: () => URL.revokeObjectURL(url) };
}

export async function deleteImage(imageId) {
  if (!imageId) return;
  const db = await openDb();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).delete(imageId);
  await txDone(tx);
  db.close();
}

// Utility: export a stored image as dataUrl (rarely needed; convenient for sharing/debug)
export async function getImageDataUrl(imageId) {
  const blob = await getImageBlob(imageId);
  if (!blob) return '';
  return blobToDataUrl(blob);
}
