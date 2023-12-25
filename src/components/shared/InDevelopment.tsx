const InDevelopment = () => {
  return (
    <div className={"flex-center flex-col"}>
      <h2 className={"h3-bold md:h2-bold text-left w-full mb-2 text-center"}>
        The page is under development
      </h2>
      <img src={"/assets/icons/dev.svg"} alt={"dev"} width={400} height={400} />
    </div>
  );
};

export default InDevelopment;
