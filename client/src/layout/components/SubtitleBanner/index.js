const SubtitileBanner = ({ titleFirst, titleSecond, titleThird, ...props }) => {
  let user = false;
  const userName = "Duy";
  return (
    <div className="px-9 pb-8">
      <div className="text-white mx-48 my-10">
        <h1 {...props}>
          {!user && <span>{titleFirst}</span>}
          {user && titleSecond && (
            <>
              <span>{userName}, </span>
              <span>{titleSecond}</span>
            </>
          )}
        </h1>
        <p className="text-2xl mt-3 tracking-widest w-3/4">{titleThird}</p>
      </div>
    </div>
  );
};

export default SubtitileBanner;
