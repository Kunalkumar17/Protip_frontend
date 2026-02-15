import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center items-center mt-48  gap-3">
      <h1 className=" text-4xl">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-4 font-bold">Home</Link>
    </div>
  );
}