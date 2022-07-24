/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-sync-scripts */
import cookie from "js-cookie";
import axios from "axios";
import Head from "next/head";
import Top from "../../components/top";
import InfoProfileLayout from "../../layout/infoprofileLayout";
import { useRouter } from "next/router";
import useResize from "../../hooks/useResize";
import { GetToken } from "../../utils/getToken";

export async function getServerSideProps(context) {
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  try {
    const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res_user.data.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      token,
      user,
    },
  };
}

export default function InfoProfile({ user, token }) {
  const router = useRouter();
  const screen = useResize();

  return (
    <>
      <Head>
        <title>Info Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </Head>

      {screen.md ? (
        <Top>
          <p className="fs-4">Lengkapi Info Akun</p>
        </Top>
      ) : (
        <div className="d-flex d-row gap-2 m-3 fw-bold fs-4 justify-content-center">
          <i
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
            className="bi bi-arrow-left pe-3"
          ></i>
          <p className="">Lengkapi Info Akun</p>
        </div>
      )}

      {screen.md ? (
        <div className="col-4 offset-4 mt-3 d-flex flex-column justify-content-center">
          <i
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
            className="bi bi-arrow-left fs-3 pe-5"
          ></i>
          <InfoProfileLayout user={user} token={token} />
        </div>
      ) : (
        <div className="px-3">
          <InfoProfileLayout user={user} token={token} />
        </div>
      )}
    </>
  );
}
