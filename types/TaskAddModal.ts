export type TaskAddModal = {
  isOpen: boolean;
  handleClose: () => void;
  getTasks: () => Promise<void>;
};
