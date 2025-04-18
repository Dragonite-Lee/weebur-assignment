interface ViewTypeProps {
  key: string;
  value?: string;
  expiryHour?: number;
}

export function setViewType({ key, value, expiryHour = 24 }: ViewTypeProps) {
  const now = new Date();

  const expiryTime = now.getTime() + expiryHour * 60 * 60 * 1000;

  const item = {
    value: value,
    expiry: expiryTime,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getViewType({ key }: ViewTypeProps) {
  const viewTypeObject = localStorage.getItem(key);

  if (!viewTypeObject) {
    return null;
  }

  const viewType = JSON.parse(viewTypeObject);
  const now = new Date();

  if (now.getTime() > viewType.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return viewType.value;
}
