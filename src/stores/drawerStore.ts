import { atom, map } from "nanostores";

export const isDrawerOpen = atom(false);

interface DrawerState {
  isOpen: boolean;
  view: string | null;
  payload: {
    title?: string;
    data?: any;
  } | null;
}

export const drawerStore = map<DrawerState>({
  isOpen: false,
  view: null,
  payload: null,
});

export const openDrawer = (view: string, payload: any = null) => {
  drawerStore.set({
    isOpen: true,
    view,
    payload,
  });
};

export const closeDrawer = () => {
  drawerStore.set({
    isOpen: false,
    view: null,
    payload: null,
  });
};
