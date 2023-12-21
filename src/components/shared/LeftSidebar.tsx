import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { sidebarLinks } from "@/constants";
import { INavLink } from "../../../types";

const LeftSidebar = () => {
  // const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  // const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (isSuccess) navigate(0);
  // }, [isSuccess]);

  return (
    <nav className={"leftsidebar"}>
      <div className={"flex flex-col gap-11"}>
        <Link to={"/"} className={"flex gap-3 items-center"}>
          <img
            src={"/assets/images/logo.svg"}
            alt={"logo"}
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className={"flex items-center gap-3"}>
          <img
            className={"h-14 w-14 rounded-full"}
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt={"profileImage"}
          />
          <div className={"flex flex-col"}>
            <p className={"body-bold"}>{user.name}</p>
            <p className={"small-regular text-light-3"}>@{user.username}</p>
          </div>
        </Link>

        <ul className={"flex flex-col gap-6"}>
          {sidebarLinks.map((item: INavLink) => {
            const isActive = pathname === item.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={item.label}
              >
                <NavLink
                  to={item.route}
                  className={"flex items-center gap-4 p-4"}
                >
                  <img
                    src={item.imgURL}
                    alt={item.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant={"ghost"} className={"shad-button_ghost"}>
        <img src={"/assets/icons/logout.svg"} alt={"logout"} />
        <p className={"small-medium lg:base-medium"}>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
