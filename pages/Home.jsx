import Blocklist from "../src/components/Blocklist";
import Friendlist from "../src/components/FriendList";
import Friendrequestlist from "../src/components/Friendrequestlist";
import Userlist from "../src/components/Userlist";

const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-x-10">
      <Friendrequestlist />
      <Friendlist />
      <Userlist />
      <Blocklist />
    </div>
  );
};

export default Home;
