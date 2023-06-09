import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [person, setPerson] = useState(null);
  const [personArr, setPersonArr] = useState([]);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random user");

  const getUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const person = data.results[0];
    const { phone, email, gender } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    const newPerson = {
      phone,
      email,
      gender,
      image,
      password,
      age,
      name: `${first} ${last}`,
      street: `${number} ${name}`,
    };
    setPerson(newPerson);
    setValue(newPerson.name);
    setTitle("name");
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleTitle = (e) => {
    if (e.target.classList.contains("icon")) {
      const newTitle = e.target.dataset.label;
      setTitle(newTitle);
      setValue(person[newTitle]);
    }
  };

  const addUser = () => {
    setPersonArr([...personArr, person]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleTitle}
            >
              <img
                src={person?.gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleTitle}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleTitle}>
              <img
                src={person?.gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleTitle}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleTitle}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleTitle}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>
          {personArr.length === 0 ? null : (
            <table className="table">
              <thead>
                <tr className="head-tr">
                  <th className="th">Firstname</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Age</th>
                </tr>
              </thead>
              <tbody>
                {personArr.map((person, index) => (
                  <tr key={index} className="body-tr">
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>{person.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
