import GlobalStyles from "../components/GlobalStyles";
import Footer from "../components/Footer";

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Footer />
    <GlobalStyles />
  </>
);
