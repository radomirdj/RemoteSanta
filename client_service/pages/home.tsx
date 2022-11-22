// import { getSession } from "next-auth/client";
// import UserProfile from '../components/profile/user-profile';

function HomePage() {
  return <div>Home Page</div>;
  //   return <UserProfile />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false
//       }
//     };
//   }
//   return {
//     props: {
//       session
//     }
//   };
// }

export default HomePage;
