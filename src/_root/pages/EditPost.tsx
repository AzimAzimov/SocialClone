import PostForm from "@/components/forms/PostForm.tsx";
import { useParams } from "react-router-dom";
import { useGetPostById } from "@/lib/ract-query/queriesAndMutations.ts";
import Loader from "@/components/shared/Loader.tsx";

const EditPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostById(id || "");

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className={"flex flex-1"}>
      <div className={"common-container"}>
        <div
          className={
            "gap-4 items-center justify-items-start flex-start max-w-5xl w-full"
          }
        >
          <img
            src={"/assets/icons/add-post.svg"}
            alt={"add"}
            width={36}
            height={36}
          />
          <h2 className={"h3-bold md:h2-bold text-left w-full"}>Edit Post</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <PostForm action="Update" post={data && data} />
        )}
      </div>
    </div>
  );
};

export default EditPost;
