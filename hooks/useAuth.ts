/* eslint-disable react-hooks/exhaustive-deps */
import { authKey } from "@/constance/authKey";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // const getUser = useCallback(
  //   async (id: string, role: string, token: string) => {
  //     try {
  //       const data: any = await getUserInfo(
  //         role === "job_seeker" ? "job-seeker" : "recruiter",
  //         token
  //       );
  //       console.log(data.data.user_id, id, "fdasfsdfsdfsdfs");
  //       if (data.data.user_id == id) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //         toast.error("Forbidden");
  //         router.replace("/auth/signin/job_seeker"); // Redirect if user ID does not match
  //       }
  //     } catch (error) {
  //       console.log(error);

  //       toast.error("Something went wrong!, try again");
  //       setIsAuthenticated(false);
  //       router.replace("/auth/signin/job_seeker"); // Redirect on error
  //     }
  //   },
  //   [router]
  // );

  useEffect(() => {
    const token = getFromLocalStorage(authKey);

    if (!token) {
      router.replace("/auth/signin/job_seeker"); // Redirect if no token
      toast.warning("Please login first");
      return;
    }

    const user = getUserRoleFromLocal(token);

    if (user?.account_type && user?.sub) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.error("Something went wrong!, try again");
      router.replace("/auth/signin/job_seeker");
    }
  }, []);

  return isAuthenticated;
}
