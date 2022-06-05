import { axios } from "axios";
import qs from 'qs';
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [value, setValue] = useState({
    codes: [""],
    tipe: "",
    nama: "",
    rasa: "",
    tepung: "",
    telur: "",
    gula: "",
    mentega: "",
    keju: "",
    garam: "",
    deskripsi: "",
  });

  const getAllData = async () => {
    const BASE_URL = "http://localhost:3030/cookies/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX d: <http://ayaa-cookies.com/data#>
      SELECT ?tipe ?nama ?rasa ?tepung ?telur ?gula ?mentega ?keju ?garam ?deskripsi
      WHERE {
        ?sub d:tipe ?tipe.
        ?sub d:nama ?nama.
        ?sub d:rasa ?rasa.
  		  ?sub d:tepung ?tepung.
        ?sub d:telur ?telur.
        ?sub d:gula ?gula.
        ?sub d:mentega ?mentega.
        ?sub d:keju ?keju.
        ?sub d:garam ?garam.
        ?sub d:deskripsi ?deskripsi.
      } `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // const getData = async () => {
  //   const BASE_URL = "http://localhost:3030/cookies/query";

  //   const headers = {
  //     Accept: "application/sparql-results+json,*/*;q=0.9",
  //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   };

  //   const queryData = {
  //     query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  //     PREFIX d: <http://ayaa-cookies.com/data#>
  //     SELECT ?tipe ?nama ?rasa ?tepung ?telur ?gula ?mentega ?keju ?garam ?deskripsi
  //     WHERE {
  //       ?sub d:tipe ?tipe.
  //       ?sub d:nama ?nama.
  //       ?sub d:rasa ?rasa.
  // 		  ?sub d:tepung ?tepung.
  //       ?sub d:telur ?telur.
  //       ?sub d:gula ?gula.
  //       ?sub d:mentega ?mentega.
  //       ?sub d:keju ?keju.
  //       ?sub d:garam ?garam.
  //       ?sub d:deskripsi ?deskripsi.
  //     FILTER(
  //       regex(?tipe, "^${value.input}", "i") ||
  //       regex(?nama, "^${value.input}", "i") ||
  //       regex(?rasa, "^${value.input}", "i") ||
  //       regex(?tepung, "^${value.input}", "i") ||
  //       regex(?telur, "^${value.input}", "i") ||
  //       regex(?gula, "^${value.input}", "i") ||
  //       regex(?mentega, "^${value.input}", "i") ||
  //       regex(?keju, "^${value.input}", "i") ||
  //       regex(?garam, "^${value.input}", "i") ||
  //       regex(?deskripsi, "^${value.input}", "i")
  //     )
  //     } `,
  //   };

  //   try {
  //     const { data } = await axios(BASE_URL, {
  //       method: "POST",
  //       headers,
  //       data: qs.stringify(queryData),
  //     });
  //     console.log(data);

  //     // Convert Data
  //     const formatted_data = data.results.bindings.map((code, index) =>
  //       formatter(code, index)
  //     );
  //     console.log(formatted_data);

  //     setValue({
  //       ...value,
  //       codes: formatted_data,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const formatter = (codes, index) => {
    return {
      id: index,
      tipe: codes.tipe.value,
      nama: codes.nama.value,
      rasa: codes.rasa.value,
      tepung: codes.tepung.value,
      telur: codes.telur.value,
      gula: codes.gula.value,
      mentega: codes.mentega.value,
      keju: codes.keju.value,
      garam: codes.garam.value,
      deskripsi: codes.deskripsi.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const content = value.codes.map((code) => (
    <tr key={code.id}>
      <td>{code.id + 1}</td>
      <td>{code.nama}</td>
      <td>{code.tipe}</td>
      <td>{code.rasa}</td>
      <td>{code.tepung}</td>
      <td>{code.telur}</td>
      <td>{code.gula}</td>
      <td>{code.mentega}</td>
      <td>{code.keju}</td>
      <td>{code.garam}</td>
      <td>{code.deskripsi}</td>
    </tr>
  ));

  // useEffect(() => {
  //   getAllData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      {/* <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              setvalue={value.input}
              onChange={handleChange}
              required="required"
              onKeyPress={(event) => {
                event.key === "Enter" && getData();
              }}
            />
            <div>
              <button
                className="search-button"
                type="button"
                value="Search"
                onClick={getData}
              >
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </form> */}
      <table>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Tipe Kue</th>
          <th>Rasa</th>
          <th>Tepung</th>
          <th>Telur</th>
          <th>Gula</th>
          <th>Mentega</th>
          <th>Keju</th>
          <th>Garam</th>
          <th>Deskripsi</th>
        </tr>
        {content}
      </table>
    </div>
  );
}
