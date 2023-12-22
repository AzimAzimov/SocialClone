import Loader from "@/components/shared/Loader.tsx";
import { useGetPostById } from "@/lib/ract-query/queriesAndMutations.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateString } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";

const PostsDetails = () => {
  const { id } = useParams();
  const { data: post, isPending: isLoading } = useGetPostById(id || "");
  const navigate = useNavigate();

  return (
    <div className={"post_details-container"}>
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      {isLoading ? (
        <div className={"h-full w-full flex-center"}>
          <Loader />
        </div>
      ) : (
        <div className={"post_details-card"}>
          <img
            src={post?.imageUrl}
            alt={"post"}
            className={"post_details-img"}
          />
          <div className={"post_details-info"}>
            <div className={"flex-between w-full"}></div>
            <Link to={`/profile/${post?.creator.$id}`}>
              <img
                src={
                  post?.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt={"creator"}
                className={"rounded-full w-12 lg:h-12"}
              />
            </Link>
            <div className={"flex flex-col"}>
              <p className={"base-medium lg:body-bold text-light-1"}>
                {post?.creator.name}
              </p>
              <div className={"flex-center gap-2 text-light-3"}>
                <p className={"subtle-semibold lg:small-regular"}>
                  {formatDateString(post?.$createdAt)}
                </p>
                -
                <p className={"subtle-semibold lg:small-regular"}>
                  {post?.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsDetails;
