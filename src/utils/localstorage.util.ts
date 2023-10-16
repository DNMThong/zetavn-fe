export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Thêm một đối tượng vào LocalStorage với một key cụ thể
export function setLocalStorageItem<T>(key: string, data: T): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to LocalStorage:", error);
    }
  }
}

// Thêm một mảng đối tượng vào LocalStorage với một key cụ thể
export function setLocalStorageArrayItem<T>(key: string, item: T): void {
  const existingItems = getLocalStorageItem<T[]>(key) || [];
  existingItems.push(item);
  setLocalStorageItem(key, existingItems);
}

export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      if (item && isValidJSON(item)) {
        return JSON.parse(item) as T;
      }
    } catch (error) {
      console.error("Error retrieving data from LocalStorage:", error);
    }
  }
  return null;
}

// Lấy một mảng đối tượng từ LocalStorage bằng key
export function getLocalStorageArrayItem<T>(key: string): T[] {
  const item = getLocalStorageItem<T[]>(key);
  return item || [];
}

// Xóa một item từ LocalStorage bằng key
export function removeLocalStorageItem(key: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from LocalStorage:", error);
    }
  } else {
    console.error("LocalStorage is not available in this environment.");
  }
}
