export function setSessionData(key: string, data: any): boolean {
  try {
    const jsonData = JSON.stringify(data);
    sessionStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error("Error setting session data:", error);
    return false;
  }
}

export function getSessionData<T>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  } catch (error) {
    console.error("Error getting session data:", error);
    return null;
  }
}

export function removeSessionData(key: string): boolean {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing session data:", error);
    return false;
  }
}

export function clearSessionData(): boolean {
  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing session data:", error);
    return false;
  }
}
