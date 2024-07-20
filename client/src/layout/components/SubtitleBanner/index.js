import { useSelector } from "react-redux";

const SubtitileBanner = ({ titleFirst, titleSecond, titleThird, ...props }) => {
  const customers = useSelector((state) => state.customers?.customers);
  return (
    <div className="px-9 pb-8">
      <div className="text-white mx-48 my-10 font-Nunito">
        <h1 {...props}>
          {!customers && <span>{titleFirst}</span>}
          {customers && titleSecond && (
            <>
              <span>{customers.customer_name}, </span>
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
