import { useStore } from "@nanostores/react";
import { modalStore } from "../../../stores/modalStore";
import ModalBranches from "./ModalBranches";
import ModalService from "./ModalService";
import ModalReviewFrom from "./ModalReviewFrom";
import ModalSelectBranch from "./ModalSelectBranch";

const ModalManager = () => {
  const { isOpen, view } = useStore(modalStore);
  if (!isOpen) return null;

  switch (view) {
    case "MODAL_BRANCHES":
      return <ModalBranches />;
    case "MODAL_SERVICE":
      return <ModalService />;
    case "MODA_REVIEW_FROM":
      return <ModalReviewFrom />;
    case "MODAL_SELECT_BRANCH":
      return <ModalSelectBranch />;
    default:
      return null;
  }
};

export default ModalManager;
