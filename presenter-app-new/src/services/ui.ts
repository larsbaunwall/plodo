import { availableMonitors, primaryMonitor, getCurrentWindow } from '@tauri-apps/api/window';

export async function fetchMonitors() {
  const monitors = await availableMonitors();
  return monitors.map((m) => ({
    id: String(m.name ?? `${m.position?.x}-${m.position?.y}`),
    name: m.name ?? 'Display',
    bounds: {
      x: m.position?.x ?? 0,
      y: m.position?.y ?? 0,
      width: m.size.width,
      height: m.size.height
    },
    size: { width: m.size.width, height: m.size.height },
    scaleFactor: m.scaleFactor
  }));
}

export async function getPrimaryMonitor() {
  const m = await primaryMonitor();
  if (!m) return null;
  return {
    id: String(m.name ?? `${m.position?.x}-${m.position?.y}`),
    name: m.name ?? 'Primary',
    bounds: {
      x: m.position?.x ?? 0,
      y: m.position?.y ?? 0,
      width: m.size.width,
      height: m.size.height
    },
    size: { width: m.size.width, height: m.size.height },
    scaleFactor: m.scaleFactor
  };
}

export async function centerMainWindow() {
  const win = getCurrentWindow();
  await win.center();
  await win.show();
  await win.setFocus();
}
