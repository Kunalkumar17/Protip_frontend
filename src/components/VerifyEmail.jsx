import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          setStatus("Invalid verification link.");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await response.json();

        if (!response.ok) {
          setStatus(data.message || "Verification failed.");
          return;
        }

        // Show success message
        setSuccess(true);
        setStatus("Email verified successfully!");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("Something went wrong while verifying your email.");
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div>
      <h1>{status}</h1>

      {success && (
        <p>
          Redirecting you to login...
        </p>
      )}
    </div>
  );
}