import { map } from "nanostores";

interface ModalState {
  isOpen: boolean;
  view: string | null;
  payload: {
    title?: string;
    data?: any;
    paragraph?: string;
  } | null;
}

export const modalStore = map<ModalState>({
  isOpen: false,
  view: null,
  payload: null,
});

export const openModal = (view: string, payload: any = null) => {
  modalStore.set({
    isOpen: true,
    view,
    payload,
  });
};

export const closeModal = () => {
  modalStore.set({
    isOpen: false,
    view: null,
    payload: null,
  });
};
