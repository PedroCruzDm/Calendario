// hooks/useToast.js
import { toast } from 'react-toastify';


const useToast = () => {
  const notify = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast.info(msg),
    warn: (msg) => toast.warn(msg),
    default: (msg) => toast(msg),
  };

  return notify;
};

export default useToast;