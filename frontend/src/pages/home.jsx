import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";

const Home = () => {
  
  const {user, checkAuth} = useUserStore();
  useEffect(() => {
    checkAuth()
  },[checkAuth])
  return (
    <div>
      <h3 className="text-3xl text-specialColor">Website&apos;s Home</h3>
      {
        user && <>
          <h3>Welcome User {user.name}</h3>
        </>
      }
    </div>
  );
};

export default Home;
