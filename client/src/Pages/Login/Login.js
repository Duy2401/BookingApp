import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Button/button";
import { useFetchData } from "../../services/useFetchData";
function Login() {
  const [body, setBody] = useState({
    customer_email: "",
    customer_password: "",
  });
  const { mutate, data, error, status, isLoading } = useFetchData();
  const handleChangeValue = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitValue = async (e) => {
    e.preventDefault();
    try {
      await mutate(
        {
          url: "http://localhost:8000/api/auth/login",
          method: "POST",
          body: body,
        },
        {
          onSuccess: (data) => {
            toast.success("Đăng nhập thành công");
            console.log(data);
          },
          onError: (error) => {
            toast.error("Tài khoản không tồn tại, vui lòng thử lại");
            console.log(error);
          },
        }
      );
    } catch (error) {}
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer toast={"Đăng Ký Thành Công"} icon={true} />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-box_shawdow_100">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                SIGN IN
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmitValue}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    id="email"
                    value={body.customer_email}
                    onChange={handleChangeValue}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required="Vui Lòng Nhập Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="customer_password"
                    value={body.customer_password}
                    onChange={handleChangeValue}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="Vui Lòng Nhập Email"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the
                      <Button
                        href="/policy"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Terms and Conditions
                      </Button>
                    </label>
                  </div>
                </div>
                <Button
                  type="sbumit"
                  disabled={isLoading}
                  className="w-full bg-btnSearch text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Button
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
