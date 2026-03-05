import { create } from 'zustand';
import type { InAppNotification } from '../types';

type NotificationState = {
  notifications: InAppNotification[];
  setNotifications: (notifications: InAppNotification[]) => void;
  markRead: (notificationId: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === notificationId ? { ...item, read: true } : item,
      ),
    })),
}));
