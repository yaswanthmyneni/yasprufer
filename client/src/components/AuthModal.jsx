import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ showAuthModal, onClose }) => {
  const navigate = useNavigate();
  if (!showAuthModal) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-100 w-[500px] max-h-[80vh] overflow-y-auto rounded-xl relative px-10 py-16 text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black text-xl hover:text-red-400 cursor-pointer"
        >
          ✕
        </button>
        <h1 className="text-3xl">Please Log In</h1>
        <p className="mt-6">You need to login to access AI.</p>
        <p
          className="mt-4 text-blue-400 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login from here
        </p>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export { AuthModal };
