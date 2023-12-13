import { defaultStateTypeTodos } from "../types";
import { ITodoData } from "../types";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface IDbData {
  data: ITodoData;
  id: number;
}

export enum Stores {
  TodosStore = "todosStore",
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB");

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(Stores.TodosStore)) {
        console.log("Creating Todos store");
        db.createObjectStore(Stores.TodosStore, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log("request.onsuccess - initDB", version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB");

    request.onsuccess = () => {
      console.log("request.onsuccess - getAllData");
      db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const deleteData = (
  storeName: string,
  key: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - deleteData", key);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};

export const clearData = (storeName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myDB", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - clearData");
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.clear();

      res.onsuccess = () => {
        resolve(true);
      };
      res.onerror = () => {
        resolve(false);
      };
    };
  });
};
