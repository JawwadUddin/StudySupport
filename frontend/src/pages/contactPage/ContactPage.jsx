import { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    async function getData() {
      const url = "http://localhost:5000/api/family";
      const response = await (await fetch(url)).json();
      const data = response.results;
      console.log(data);
    }
    getData();
  }, []);

  return <div>ContactPage</div>;
};

export default ContactPage;
