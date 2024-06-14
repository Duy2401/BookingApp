const SubtitileBanner = ({ titleFirst, titleSecond, titleThird, ...props }) => {
  let user = true;
  const userName = "Duy";
  return (
    <div className="heading_website px-9">
      <div className="text-white h-36 mx-48 my-10">
        <h1 {...props}>
          {!user && <span>{titleFirst}</span>}
          {user && titleSecond && (
            <>
              <span>{userName}, </span>
              <span>{titleSecond}</span>
            </>
          )}
        </h1>
        <p className="text-2xl mt-3 tracking-widest ">{titleThird}</p>
      </div>
    </div>
  );
};

export default SubtitileBanner;
