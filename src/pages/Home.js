import React from "react";
import "../components/styles/home.css";
import { Link } from "react-router-dom";
import categories from "../utils/categories";

function Home() {
  const options = categories();
  return (
    <section className="home">
      <div className="content-options">
        {options.map((item, idx) => {
          const { icon, name, route } = item;
          return (
            <Link key={idx} to={route}>
              <div>
                <p>{icon}</p>
                <p>{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
