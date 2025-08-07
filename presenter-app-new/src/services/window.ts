import { WebviewWindow, getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { LogicalPosition, LogicalSize } from '@tauri-apps/api/dpi';
import { useMainStore } from '../stores/main';

let celebration: WebviewWindow | null = null;

export async function showMain() {
  const win = getCurrentWebviewWindow();
  await win.show();
  await win.setFocus();
}

export async function toggleMain() {
  const win = getCurrentWebviewWindow();
  const visible = await win.isVisible();
  if (visible) await win.hide();
  else await showMain();
}

export async function showCelebration() {
  const store = useMainStore();
  const label = 'celebration';
  if (!celebration) {
    celebration = new WebviewWindow(label, {
      url: '#/celebrate',
      transparent: true,
      decorations: false,
      alwaysOnTop: true,
      visible: false,
      focus: false,
      width: store.celebrationScreen?.size.width ?? 800,
      height: store.celebrationScreen?.size.height ?? 600,
      x: store.celebrationScreen?.bounds.x ?? 0,
      y: store.celebrationScreen?.bounds.y ?? 0
    });
    celebration.once('tauri://created', async () => {
      await celebration?.setAlwaysOnTop(true);
      await celebration?.show();
    });
  } else {
    await celebration.setAlwaysOnTop(true);
    await celebration.show();
  }
}

export async function hideCelebration() {
  if (celebration) {
    await celebration.hide();
  }
}

export async function relocateCelebration() {
  if (!celebration) return;
  const store = useMainStore();
  const s = store.celebrationScreen;
  if (!s) return;
  await celebration.setSize(new LogicalSize(s.size.width, s.size.height));
  await celebration.setPosition(new LogicalPosition(s.bounds.x, s.bounds.y));
}
