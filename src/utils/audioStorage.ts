// Persistent Audio Storage for KipuFin lessons using IndexedDB
// Keeps user-provided voice recordings (e.g., Ahorro 1.mp3) safely stored in the browser/PWA

const DB_NAME = 'kipufin_audio_db';
const DB_VERSION = 1;
const STORE_NAME = 'lesson_audios';

interface StoredAudioRecord {
  lessonId: string;
  blob: Blob;
  fileName: string;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'lessonId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveLessonAudio(lessonId: string, file: File): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const record: StoredAudioRecord = {
      lessonId,
      blob: file,
      fileName: file.name,
      updatedAt: Date.now(),
    };
    const req = store.put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getLessonAudio(lessonId: string): Promise<{ blob: Blob; fileName: string; objectUrl: string } | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(lessonId);

      req.onsuccess = () => {
        const record = req.result as StoredAudioRecord | undefined;
        if (record && record.blob) {
          const objectUrl = URL.createObjectURL(record.blob);
          resolve({
            blob: record.blob,
            fileName: record.fileName,
            objectUrl,
          });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not read audio from IndexedDB:', err);
    return null;
  }
}

export async function deleteLessonAudio(lessonId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(lessonId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not delete audio from IndexedDB:', err);
  }
}
