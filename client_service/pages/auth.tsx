// import { getSession } from "next-auth/client";
// import AuthForm from '../components/auth/auth-form';
import LoginBth from "../components/login-btn";

function AuthPage() {
  //   return <AuthForm />;
  return <LoginBth />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (session) {
//     return {
//       redirect: {
//         destination: "/home",
//         permanent: false
//       }
//     };
//   }
//   return {
//     props: {}
//   };
// }

export default AuthPage;
